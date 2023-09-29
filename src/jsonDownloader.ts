import type { AuthModel } from 'pocketbase'
import type { ItemsRecordWithID } from './types'

export function jsonDownloader(items: ItemsRecordWithID[] | AuthModel, fileNameExtension: string) {
  const link = document.createElement('a') as HTMLAnchorElement

  const createDownloadLink = () => {
    const file = new Blob([JSON.stringify(items)], { type: 'application/json' })

    link.href = URL.createObjectURL(file)
    link.download = `${new Date().toLocaleDateString() + fileNameExtension}`
    link.click()
  }

  createDownloadLink()

  return { link }
}
