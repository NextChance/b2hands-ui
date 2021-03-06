<template>
  <transition name='modal-fade'>
    <div
      v-if="isOpen"
      class="modal"
    >
      <div class='modal__header wrapper--s'>
        <i class="modal__icon b2i-modal" @click="handleClose"></i>
      </div>
      <div class="modal__content">
        <!-- @slot Default slot for modal content -->
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'UiModal',
  props: {
    /**
     * Value that shows or hides the modal
     */
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Close modal
     */
    handleClose(): void {
      /**
       * Close event
       *
       * @event on-modal-close
       */
      this.$emit('on-modal-close')
    }
  }
})
</script>

<style lang='scss' scoped>
.modal {
  background-color: $white;
  bottom: 0;
  color: $black-100;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: map-get($zindex, modal);

  &__icon {
    font-size: $spacing-size-3;
    cursor: pointer;
    left: $spacing-size-6;
    position: absolute;
    top: $spacing-size-6;

    &::before {
      content: '\e90d';
    }
  }

  &__content {
    box-sizing: border-box;
    padding-left: $spacing-size-8;
    padding-top: $spacing-size-3;
  }

  @media (min-width: $breakpoint-s) {
    &__header {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      margin-bottom: $spacing-size-13;
      margin-top: $spacing-size-6;
    }

    &__content {
      padding-left: unset;
      padding-top: unset;
    }

    &__icon {
      left: unset;
      margin-right: $spacing-size-1;
      position: static;
      top: unset;

      &::before {
        content: '\e909';
      }
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .2s ease;
}
</style>
