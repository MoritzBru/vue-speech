<script setup lang="ts">
import IconLogo from '~icons/speech/logo';
import PhGithubLogoDuotone from '~icons/ph/github-logo-duotone';
import SColorModeToggle from '@/components/SColorModeToggle.vue';
</script>

<template>
  <header class="navbar bg-base-200 px-4">
    <div class="flex-1">
      <h1 class="flex items-center gap-3 text-xl">
        <IconLogo class="size-8" />
        <span>
          Speech
        </span>
      </h1>
    </div>
    <div class="flex-none">
      <SColorModeToggle />
      <div class="divider divider-horizontal" />
      <a
        href="https://github.com/MoritzBru/vue-speech"
        target="_blank"
        rel="noopener"
        class="btn btn-circle btn-ghost"
      >
        <span class="sr-only">GitHub</span>
        <PhGithubLogoDuotone class="size-7" />
      </a>
    </div>
  </header>
</template>
