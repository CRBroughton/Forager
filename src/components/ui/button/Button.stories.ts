import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import Button from './Button.vue'

const meta = {
  title: 'Custom/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
type StoryWithSlots = Story & {
  args: {
    default: string
  }
}

export const Primary: StoryWithSlots = {
  args: {
    default: 'Im a button',
  },
  render(args) {
    return h(Button, args, {
      default: () => args.default,
    })
  },
}
