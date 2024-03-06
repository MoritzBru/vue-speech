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
    <input
      v-model="modelValue"
      type="text"
      v-bind="$attrs"
      class="input input-bordered input-primary w-full"
    >
    <div
      v-if="props.bottomLabel"
      class="label"
    >
      <span class="label-text-alt">{{ props.bottomLabel }}</span>
    </div>
  </label>
</template>
