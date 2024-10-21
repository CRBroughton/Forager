import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import CameraButton from './CameraButton.vue'

const meta = {
  title: 'Components/Buttons/CameraButton',
  component: CameraButton,
} satisfies Meta<typeof CameraButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render(args) {
    return h(CameraButton, args)
  },
}
