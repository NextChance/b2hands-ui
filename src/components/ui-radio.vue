<template>
  <div
    class="ui-radio"
    :class="{
      'ui-radio--checked': !!isChecked,
      'ui-radio--disabled': !!isDisabled
    }"
  >
    <input
      :id="id"
      type="radio"
      :name="name"
      class="ui-radio__button"
      :value="value"
      :checked="isChecked"
      @change="onChange(value)"
    ><label
      v-if="label"
      class="ui-radio__label"
      :for="id">{{label}}</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiRadio',
  data() {
    return {
      id: `uiRadio-${(Math.random() * 10000).toFixed()}`
    }
  },
  props: {
    /**
     * Sets input name
     */
    name: {
      type: String,
      default: ''
    },
    /**
     * Sets input value
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * Sets input checked status
     */
    isChecked: {
      type: Boolean,
      default: false
    },
    /**
     * Sets input checked status
     */
    isDisabled: {
      type: Boolean,
      default: false
    },
    /**
     * Text to show beside radio
     */
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * Close modal
     */
    onChange(value: string|number): void {
      /**
       * Close event
       *
       * @event on-change
       */
      if (!this.isDisabled) {
        this.$emit('change', value)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.ui-radio {
  $uiRadio: &;
  $radioBorderThickness: $spacing-size-0;
  $radioSize: $spacing-size-4 - (2 *  $spacing-size-0);

  color: $black-100;
  line-height: $radioSize;
  position: relative;
  user-select: none;

  &:before {
    border: 1px solid $black-50;
    border-radius: 50%;
    content: '';
    display: block;
    height: $radioSize;
    left: 0;
    position: absolute;
    top: 0;
    transition: color .1s linear;
    width: $radioSize;
  }

  &:after {
    $tickSpacing: $spacing-size-1;
    background-color: $black-50;
    border-radius: 50%;
    content: '';
    display: block;
    height: $radioSize - $tickSpacing;
    left: ($tickSpacing / 2) + $radioBorderThickness;
    position: absolute;
    top: ($tickSpacing / 2) + $radioBorderThickness;
    transform: scale(0);
    transform-origin: center;
    transition: background-color .1s linear, transform .1s linear;
    width: $radioSize - $tickSpacing;
  }

  &--checked {
    &:before {
      border-color: $black-100;
    }

    &:after {
      background-color: $black-100;
      transform: scale(1);
    }
  }

  &--disabled {
    &:before {
      border-color: $black-20;
    }

    &:after {
      background-color: $black-20;
    }

    #{$uiRadio}__label {
      color: $black-50;
    }
  }

  &__button {
    cursor: pointer;
    height: $radioSize + (2 * $radioBorderThickness);
    line-height: 1rem;
    opacity: 0;
    vertical-align: top;
    width: $radioSize + (2 * $radioBorderThickness);
  }

  &__label {
    @include body('s');

    cursor: pointer;
    padding-left: $spacing-size-3 - (2 * $radioBorderThickness);
    vertical-align: top;
  }
}
</style>
