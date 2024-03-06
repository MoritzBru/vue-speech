<script setup lang="ts">
const props = defineProps<{
  label: string;
  bottomLabel?: string;
}>();

const modelValue = defineModel<string>({ required: true });
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">{{ props.label }}</span>
    </div>
    <textarea
      v-model="modelValue"
      v-bind="$attrs"
      class="textarea textarea-bordered textarea-primary"
    />
    <div
      v-if="props.bottomLabel"
      class="label"
    >
      <span class="label-text-alt">{{ props.bottomLabel }}</span>
    </div>
  </label>
</template>
