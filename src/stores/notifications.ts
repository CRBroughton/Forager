import type { ItemsRecordWithID } from '../types'
import { pb, setErrorMessage } from './pocketbase'
import { isError } from '@/utils/isError'
import type { NotificationsRecord } from '@/pocketbase-types'

export const notifications = defineStore('notifications-store', () => {
  const enableNotifications = () => {
    Notification.requestPermission()
  }

  const notificationStatus = computed(() => {
    return Notification.permission
  })

  interface Notification {
    title: string
    content?: {
      body: string
      icon?: string
    }
  }
  const createNotification = (notification: Notification) => {
    return new Notification(notification.title,
      { body: notification.content?.body },
    )
  }

  const months = [
    'January',
    'February',
    'March',
    'April', 
    'May', 
    'June',
    'July', 
    'August',
    'September',
    'October', 
    'November',
    'December',
  ]

  const d = new Date()
  const currentMonth = months[d.getMonth()]

  const getStoredNotifications = async (type: 'monthly-update' | 'weather-update') => {
    try {
      const response = await pb.collection('notifications').getFullList<NotificationsRecord>()

      let hasNotification = false
      response.forEach((notification) => {
        if (notification.type === type) {
          hasNotification = true
          return hasNotification
        }
      })
      return hasNotification
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
      return false
    }
  }

  const filterMonthlyForagables = (items: ItemsRecordWithID[]) => {
    return items.filter(item => item.startMonth === currentMonth)
  }

  const triggerForagableNotification = async (items: ItemsRecordWithID[]) => {
    let customItems: string[] = []
    if (items === undefined) 
      return

    if (filterMonthlyForagables(items).length === 0) 
      return
  
    const hasStoredMonthlyUpdate = await getStoredNotifications('monthly-update')
    if (hasStoredMonthlyUpdate === true) 
      return
    

    filterMonthlyForagables(items).forEach((item) => {
      customItems = [...customItems, ` ${item.name}`]
    })
    createNotification({
      title: 'Monthly foragables!',
      content: {
        body: `You can find${ customItems } this month`,
      },
    })
   
  }

  return {
    enableNotifications,
    notificationStatus,
    createNotification,
    triggerForagableNotification,
  }
})
