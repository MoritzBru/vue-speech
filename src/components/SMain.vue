<script setup lang="ts">
import {
  computed, onMounted, ref,
} from 'vue';
import {
  useSpeechRecognition, useSpeechSynthesis, watchDebounced, until,
} from '@vueuse/core';

import PhMicrophoneDuotone from '~icons/ph/microphone-duotone';
import PhMicrophoneSlashDuotone from '~icons/ph/microphone-slash-duotone';
import PhArrowCounterClockwiseDuotone from '~icons/ph/arrow-counter-clockwise-duotone';

import bcp47 from '@/assets/bcp-47.json';

import SIntro from '@/components/SIntro.vue';
import SSupportWarning from '@/components/SSupportWarning.vue';
import SInput from '@/components/SInput.vue';
import STextarea from '@/components/STextarea.vue';
import SSelect from '@/components/SSelect.vue';
import SAccordion from '@/components/SAccordion.vue';

const DELAY_IN_MS = 300;

const lang = ref('en-GB');
const langs = bcp47;
// @ts-expect-error: missing property groupBy
const groupedLangs: Record<string, typeof langs> = Object.groupBy(langs, ({ language }) => language);

const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice);
const voices = ref<SpeechSynthesisVoice[]>([]);
// @ts-expect-error: missing property groupBy
const groupedVoices = computed<Record<string, SpeechSynthesisVoice[]>>(() => Object.groupBy(voices.value, ({ lang }) => lang));

function getVoices() {
  if (isSupported.value) {
  // load at last ¯\_(ツ)_/¯
    setTimeout(() => {
      const synth = window.speechSynthesis;
      voices.value = synth.getVoices();
      voice.value = voices.value[0];
    }, 100);
  }
}

const catchPhrase = ref('What is your question');

const sentences = ref(`What is your name?
How old are you?
Where do you live?
`);

const delimiterChar = '\n';
const splitSenteces = computed(() => sentences.value.trim().split(delimiterChar));
const currentSentenceIdx = ref(0);
const currentSentence = computed(() => splitSenteces.value[currentSentenceIdx.value]);

const answers = ref<string[]>([]);

const speechRecognition = useSpeechRecognition({ lang });

const speechSynthesis = useSpeechSynthesis(currentSentence, { voice });

const isSupported = computed(() => speechRecognition.isSupported.value && speechSynthesis.isSupported.value);

const isActive = computed(() => speechRecognition.isListening.value || speechSynthesis.isPlaying.value);

if (isSupported.value) {
  watchDebounced(
    catchPhrase,
    () => {
      const grammar = `#JSGF V1.0; grammar colors; public <phrase> = ${catchPhrase.value};`;
      // @ts-expect-error missing types
      const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      speechRecognition.recognition!.grammars = speechRecognitionList;
    },
    { debounce: DELAY_IN_MS },
  );

  watchDebounced(
    speechRecognition.result,
    async () => {
      if (!speechRecognition.result.value.toLowerCase().includes(catchPhrase.value.toLowerCase()) || answers.value.includes(speechRecognition.result.value)) return;
      stop();

      if (!currentSentence.value) return;
      speechSynthesis.speak();

      await until(speechSynthesis.isPlaying && speechRecognition.isListening).toBe(false);
      currentSentenceIdx.value += 1;
      if (currentSentenceIdx.value <= splitSenteces.value.length) {
        setTimeout(start, DELAY_IN_MS);
      }
    },
    { debounce: DELAY_IN_MS },
  );
}

function start() {
  speechRecognition.result.value = '';
  speechRecognition.start();
}

function stop() {
  speechRecognition.stop();
  // @ts-expect-error: missing property replaceAll
  answers.value[currentSentenceIdx.value - 1] = speechRecognition.result.value.trim().replaceAll(catchPhrase.value, '');
}

function reset() {
  speechRecognition.result.value = '';
  currentSentenceIdx.value = 0;
  answers.value = [];
}

onMounted(() => {
  getVoices();
});
</script>

<template>
  <SIntro />
  <SSupportWarning
    v-if="!isSupported"
    class="mt-4"
  />
  <div
    v-else
    class="mt-4"
  >
    <div class="flex flex-col gap-4">
      <div class="flex w-full flex-col flex-wrap gap-4 md:flex-row">
        <SSelect
          v-model="lang"
          label="Language"
          bottom-label="Language for detection."
          :options="groupedLangs"
          class="grow"
        >
          <template #options="{ opts }">
            <option
              v-for="opt in opts"
              :key="opt.tag"
              :value="opt.tag"
            >
              {{ opt.label }}
            </option>
          </template>
        </SSelect>

        <SSelect
          v-model="voice"
          label="Voice"
          bottom-label="Voice to read the senences."
          :options="groupedVoices"
          class="grow"
        >
          <template #options="{ opts }">
            <option
              v-for="opt in opts"
              :key="opt.voiceURI"
              :value="opt"
            >
              {{ `${opt.name} (${opt.lang})` }}
            </option>
          </template>
        </SSelect>
      </div>

      <SInput
        v-model="catchPhrase"
        label="Catch phrase"
        bottom-label="Trigger to speak the next sentences."
        pattern="[\w ]*"
        required
        :disabled="isActive"
      />

      <STextarea
        v-model="sentences"
        label="Sentences"
        bottom-label="Delimited by a new line."
        class="min-h-48"
        required
      />
    </div>

    <div class="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
      <button
        class="btn btn-success"
        :disabled="speechRecognition.isListening.value"
        @click="start"
      >
        <PhMicrophoneDuotone class="size-6" />
        Start Listening
      </button>
      <button
        class="btn btn-error"
        :disabled="!speechRecognition.isListening.value"
        @click="stop"
      >
        <PhMicrophoneSlashDuotone class="size-6" />
        Stop Listening
      </button>
      <button
        class="btn btn-warning"
        :disabled="speechRecognition.isListening.value || speechSynthesis.isPlaying.value"
        @click="reset"
      >
        <PhArrowCounterClockwiseDuotone class="size-6" />
        Reset
      </button>
    </div>

    <Transition
      appear
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="ease-out duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
    >
      <div
        v-show="speechRecognition.isListening.value"
        transition
        class="chat chat-start mt-4"
      >
        <div class="avatar placeholder chat-image">
          <div class="size-8 animate-pulse rounded-full bg-red-600 dark:bg-red-400">
            <PhMicrophoneDuotone class="size-5 text-neutral" />
          </div>
        </div>
        <div class="chat-bubble">
          {{ speechRecognition.result }}
        </div>
      </div>
    </Transition>

    <SAccordion
      :questions="splitSenteces"
      :answers="answers"
      :is-open="true"
    />
  </div>
</template>
