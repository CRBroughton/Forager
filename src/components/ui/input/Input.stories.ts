import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import Input from './Input.vue'

const meta = {
  title: 'Custom/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    modelValue: 'Im an input',
  },
  render(args) {
    return h(Input, args)
  },
}
