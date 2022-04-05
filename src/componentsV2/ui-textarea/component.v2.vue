<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiTextarea',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'uitextarea'
    },
    maxLength: {
      type: Number,
      default: 1000
    },
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 35
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: '',
      textAreaHeight: ''
    }
  },

  watch: {
    value(): void {
      this.inputValue = this.value
    }
  },

  created() {
    if (this.value) this.inputValue = this.value
  },

  mounted() {
    const uiTextarea = this.$refs.textarea as HTMLInputElement
    this.handleAutoResize()
    uiTextarea.blur()
    if (uiTextarea.value !== '') {
      this.focusInput()
    }
  },

  methods: {
    focusInput(): void {
      const uiTextarea = this.$refs.textarea as HTMLInputElement
      uiTextarea.focus()
    },

    handleFocus(): void {
      this.$emit('input-focus-event')
    },

    handleBlur(ev: Event): void {
      this.$emit('input-blur-event', ev)
    },

    handleInput(): void {
      const uiTextarea = this.$refs.textarea as HTMLInputElement
      this.handleAutoResize()
      this.$emit('input', uiTextarea.value)
    },

    handleKeyUp(ev: Event): void {
      this.$emit('input-key-up-event', ev)
    },

    handleAutoResize(): void {
      const uiTextarea = this.$refs.textarea as HTMLInputElement
      this.textAreaHeight = '0px'
      uiTextarea.blur()
      this.$nextTick(function () {
        const container = this.$refs.container as HTMLInputElement
        this.textAreaHeight = (uiTextarea.scrollHeight > container.offsetHeight ? uiTextarea.scrollHeight : container.offsetHeight) + 'px'
        uiTextarea.focus()
      })
    }
  }
})
</script>
