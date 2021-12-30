<template>
  <div
    class="ui-checkbox"
    :class="{
      'ui-checkbox--checked': !!isChecked,
      'ui-checkbox--disabled': !!isDisabled,
      'ui-checkbox--schrodinger': !!isSchrodinger
    }"
  >
    <input
      :id="name || id"
      type="checkbox"
      :name="name || id"
      class="ui-checkbox__button"
      :value="value"
      :checked="isChecked"
      @change="onChange($event.currentTarget.value)"
    /><label
      v-if="label"
      class="ui-checkbox__label"
      :for="name || id"
    >{{label}}</label
    ><i
      v-if="!isSchrodinger"
      @click="onChange(value)"
      class="ui-checkbox__sign b2i-check"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiCheckbox',
  data() {
    return {
      id: `uiCheckbox-${(Math.random() * 10000).toFixed()}`
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
      type: String,
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
     * Sets input indeterminated status when is used as a grouping check and children are in different states
     */
    isSchrodinger: {
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
    onChange(newValue: String): void {
      /**
       * Close event
       *
       * @event on-change
       */
      console.log('onChange newValue', newValue)
      if (!this.isDisabled) {
        this.$emit('change', newValue)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.ui-checkbox {
  $uiCheckbox: &;
  $checkboxBorderThickness: $spacing-size-0;
  $checkboxSize: $spacing-size-4 - (2 * $spacing-size-0);
  $tickSpacing: $spacing-size-1;

  line-height: $checkboxSize;
  color: $black-100;
  position: relative;
  user-select: none;

  &:before {
    border: 1px solid $black-50;
    border-radius: 3px;
    content: '';
    display: block;
    height: $checkboxSize;
    left: 0;
    position: absolute;
    top: 0;
    transition: color .1s linear;
    width: $checkboxSize;
  }

  &:after {
    background-color: $black-50;
    border-radius: 1px;
    content: '';
    display: block;
    height: $checkboxSize;
    left: $checkboxBorderThickness;
    position: absolute;
    top: $checkboxBorderThickness;
    transform: scale(0);
    transform-origin: center;
    transition: background-color .1s linear, transform .1s linear;
    width: $checkboxSize;
  }

  &--checked {
    &:before {
      border-color: $black-100;
    }

    &:after {
      background-color: $black-100;
      transform: scale(1);
    }

    #{$uiCheckbox}__sign {
      transform: scale(1);
    }
  }

  &--disabled {
    &:before {
      border-color: $black-50;
    }

    &:after {
      background-color: $black-50;
    }

    #{$uiCheckbox}__label {
      color: $black-50;
    }
  }

  &--schrodinger {
    &:after {
      height: 2 * $checkboxBorderThickness;
      left: ($tickSpacing / 2) + $checkboxBorderThickness;
      top: ($checkboxSize / 2);
      width: $checkboxSize - $tickSpacing;
    }
  }

  &__button {
    cursor: pointer;
    height: $checkboxSize + (2 * $checkboxBorderThickness);
    line-height: 1rem;
    opacity: 0;
    vertical-align: top;
    width: $checkboxSize + (2 * $checkboxBorderThickness);
  }

  &__label {
    @include body('s');

    cursor: pointer;
    padding-left: $spacing-size-3 - (2 * $checkboxBorderThickness);
    vertical-align: top;
  }

  &__sign {
    color: $white;
    font-size: $font-size-2;
    left: (($checkboxSize - $font-size-2) / 2) + $checkboxBorderThickness;
    position: absolute;
    top: (($checkboxSize - $font-size-2) / 2) + $checkboxBorderThickness;
    transform: scale(0);
    transform-origin: center;
    transition: transform .1s linear;
    z-index: 1;
  }
}
</style>
