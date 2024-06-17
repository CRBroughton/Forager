import tippy from 'tippy.js'

// optional for styling
import 'tippy.js/dist/tippy.css'

function popup(id: string, content: string) {
  tippy(id, {
    content,
    trigger: 'click',
    maxWidth: 250,
  })
}

export function createPopup(
): [ref: typeof popup, popup: Ref<HTMLDivElement | null>]
export function createPopup() {
  return [popup, ref<HTMLDivElement | null>(null)]
}
