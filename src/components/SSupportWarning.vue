<script setup lang="ts">
import PhWarningDuotone from '~icons/ph/warning-duotone';
</script>

<template>
  <div
    role="alert"
    class="alert alert-error"
  >
    <PhWarningDuotone class="size-8" />
    <div>
      Your browser does not support
      <a
        class="link"
        href="https://caniuse.com/speech-recognition"
        target="_blank"
        rel="nofollow"
      >
        SpeechRecognition API
      </a>
      or
      <a
        class="link"
        href="https://caniuse.com/speech-synthesis"
        target="_blank"
        rel="nofollow"
      >
        SpeechSynthesis API
      </a>
    </div>
  </div>
</template>
