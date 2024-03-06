<script setup lang="ts">
const props = defineProps<{
  questions: string[];
  answers: string[];
  isOpen?: boolean;
}>();
</script>

<template>
  <div class="mt-8 flex flex-col gap-2">
    <div
      v-for="(q, idx) in props.questions"
      :key="idx"
      class="collapse collapse-arrow bg-base-200"
    >
      <input
        type="checkbox"
        :checked="props.isOpen"
      >
      <div class="collapse-title text-xl font-medium">
        {{ q }}
      </div>
      <div class="collapse-content bg-base-300">
        <p class="mt-3">
          {{ props.answers[idx] ?? '' }}
        </p>
      </div>
    </div>
  </div>
</template>
