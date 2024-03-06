<script setup lang="ts" generic="O, M">
const props = defineProps<{
  label: string;
  bottomLabel?: string;
  options: Array<O> | Record<string, Array<O>>;
}>();

const modelValue = defineModel<M>({ required: true });

defineSlots<{
  options(props: { opts: Array<O> }): any;
}>();
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">{{ props.label }}</span>
    </div>
    <select
      v-model="modelValue"
      class="select select-bordered select-primary"
      v-bind="$attrs"
    >
      <!-- optgroups with options -->
      <template v-if="!Array.isArray(props.options)">
        <optgroup
          v-for="[groupLabel, opts] of Object.entries(props.options || {})"
          :key="groupLabel"
          :label="groupLabel"
        >
          <slot
            name="options"
            :opts="opts"
          >
            <option
              v-for="(opt, idx) in opts"
              :key="idx"
              :value="opt"
            >
              {{ opt }}
            </option>
          </slot>
        </optgroup>
      </template>
      <!-- plain options -->
      <template v-else>
        <slot
          name="options"
          :opts="props.options"
        >
          <option
            v-for="(option, idx) in props.options"
            :key="idx"
            :value="option"
          >
            {{ option }}
          </option>
        </slot>
      </template>
    </select>
    <div
      v-if="props.bottomLabel"
      class="label"
    >
      <span class="label-text-alt">{{ props.bottomLabel }}</span>
    </div>
  </label>
</template>
