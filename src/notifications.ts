import type { ItemsRecordWithID } from './types'

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

  const getMonthlyForagables = (items: ItemsRecordWithID[]) => {
    return items.filter(item => item.startMonth === currentMonth)
  }

  const triggerForagableNotification = (items: ItemsRecordWithID[]) => {
    let customItems: string[] = []
    if (items === undefined) 
      return

    if (getMonthlyForagables(items).length === 0) 
      return

    getMonthlyForagables(items).forEach((item) => {
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
