<script setup lang="ts">
import {
  useTextareaAutosize, syncRefs,
} from '@vueuse/core';

const {
  textarea, input,
} = useTextareaAutosize();

const props = defineProps<{
  label: string;
  bottomLabel?: string;
}>();

const modelValue = defineModel<string>({ required: true });

syncRefs(modelValue, input);
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">{{ props.label }}</span>
    </div>
    <textarea
      ref="textarea"
      v-model="modelValue"
      v-bind="$attrs"
      class="textarea textarea-bordered textarea-primary resize-none"
    />
    <div
      v-if="props.bottomLabel"
      class="label"
    >
      <span class="label-text-alt">{{ props.bottomLabel }}</span>
    </div>
  </label>
</template>

<style>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
