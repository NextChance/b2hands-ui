<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class UiTextarea extends Vue {
  inputValue: String = ''
  textAreaHeight: String = '0px'

  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: 'uitextarea' }) id!: String
  @Prop({ default: 1000 }) maxLength!: Number
  @Prop({ default: '' }) name!: String
  @Prop({ default: 35 }) size!: Number
  @Prop({ default: '' }) value!: String
  @Prop({ default: '' }) placeholder!: String
  @Prop({ default: true }) hasAutofocus!: boolean
  @Prop({ default: false }) disableBreakLines!: boolean

  @Watch('value', { immediate: true })
  onValueChange (newValue: string) {
    this.inputValue = newValue
  }

  mounted() {
    this.handleAutoResize()
    if (this.hasAutofocus) {
      const uiTextarea = this.$refs.textarea as HTMLInputElement
      if (uiTextarea.value !== '') {
        uiTextarea.focus()
      }
    }
  }

  handleFocus(): void {
    this.$emit('input-focus-event')
  }

  handleBlur(ev: Event): void {
    this.$emit('input-blur-event', ev)
  }

  handleInput(): void {
    const uiTextarea = this.$refs.textarea as HTMLInputElement
    this.handleAutoResize()
    this.$emit('input', uiTextarea.value)
  }

  handleKeyUp(ev: Event): void {
    this.$emit('input-key-up-event', ev)
  }

  handleAutoResize(): void {
    const uiTextarea = this.$refs.textarea as HTMLInputElement
    this.textAreaHeight = '0px'
    this.$nextTick(function () {
      const container = this.$refs.container as HTMLInputElement
      this.textAreaHeight = (uiTextarea.scrollHeight > container.offsetHeight
        ? uiTextarea.scrollHeight
        : container.offsetHeight) + 'px'
    })
  }

  handleEnterPress(event: Event): void {
    if (this.disableBreakLines) {
      event.preventDefault()
    }
  }
}
</script>
