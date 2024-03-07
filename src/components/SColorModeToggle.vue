<script setup lang="ts">
import {
  useColorMode, useCycleList,
} from '@vueuse/core';
import { watchEffect } from 'vue';
import PhMonitorDuotone from '~icons/ph/monitor-duotone';
import PhMoonStarsDuotone from '~icons/ph/moon-stars-duotone';
import PhSunDuotone from '~icons/ph/sun-duotone';

const mode = useColorMode({ attribute: 'data-theme' });

const {
  state, next,
} = useCycleList(
  [
    'dark',
    'light',
    'auto',
  ],
  { initialValue: mode },
);

watchEffect(() => mode.value = state.value as typeof mode.value);
</script>

<template>
  <button
    class="btn btn-circle btn-ghost"
    @click="next()"
  >
    <span class="sr-only">Colormode: {{ state }}</span>
    <Transition
      appear
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 rotate-45"
      enter-to-class="opacity-100 rotate-0"
      leave-active-class="absolute ease-out duration-300"
      leave-from-class="opacity-100 rotate-0"
      leave-to-class="opacity-0 -rotate-45"
    >
      <PhMonitorDuotone
        v-if="state === 'auto'"
        class="size-7"
      />
      <PhMoonStarsDuotone
        v-else-if="state === 'dark'"
        class="size-7"
      />
      <PhSunDuotone
        v-else-if="state === 'light'"
        class="size-7"
      />
    </Transition>
  </button>
</template>
