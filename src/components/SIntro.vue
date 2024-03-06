<script setup lang="ts">
import PhInfoDuotone from '~icons/ph/info-duotone';
</script>

<template>
  <div
    role="alert"
    class="alert"
  >
    <PhInfoDuotone class="size-8 text-info" />
    <p>
      This is a simple tool with speech synthesis and speech recognition.
      It can listen to you and if it recognises the <em>catch phrase</em>, it will read you a sentence from the list of <em>sentences</em> and then listen again for your answers.
    </p>
  </div>
</template>
