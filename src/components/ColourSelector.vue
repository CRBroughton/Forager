<script setup lang="ts">
interface Props {
  selectedColour: string
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()
interface Emits {
  (e: 'change', value: string): void
}

const colours = ['red', 'blue', 'purple', 'deeppink', 'cadetblue']
</script>

<template>
  <div
    class="my-2
      "
  >
    Selected Colour: {{
      props.selectedColour.length > 0 ? props.selectedColour : 'None selected'
    }}
  </div>

  <div class="colour-selector">
    <div
      v-for="colour in colours"
      :key="colour"
      class="colour-choice"
      :class="{ highlighted: colour === props.selectedColour }"
      @click="emit('change', colour)"
    >
      <div
        class="colour-dot"
        :style="{ background: colour }"
      />
    </div>
  </div>
</template>

<style scoped>
.colour-selector {
  display: flex;
  gap: .5em;
  margin-bottom: 20px;
  cursor: pointer;
  margin-left: 5px;
}

.colour-choice {
  width: 50px;
  background: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 5px;

}

.colour-dot {
  width: 15px;
  height: 15px;
  min-width: 15px;
  min-height: 15px;
  border-radius: 15px;
}

.highlighted {
  outline: 4px solid greenyellow;
}
</style>
