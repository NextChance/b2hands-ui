<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

interface StepConfig {
  values: Array<number>
  percentages: Array<number>
  total: number
}

@Component({
  props: {
    floorLabel: {
      type: String,
      default: ' '
    },
    ceilLabel: {
      type: String,
      default: ' '
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
})

export default class UiSliderInput extends Vue {
  isDragging: boolean = false
  isFloorTrigger: boolean = false
  floorRelativePosition: number = 0
  ceilRelativePosition: number = 1
  trackSize: number = 0
  trackLeftPosition: number = 0
  dragX: number = 0

  @Prop({ default: false }) isDouble!: boolean
  @Prop({ default: 0 }) floorValue!: number
  @Prop({ default: 0 }) ceilValue!: number
  @Prop({ default: () => [] }) availableSteps!: Array<number>

  get _floorValue () {
    const idx = this.stepConfig.percentages.findIndex(percentage => percentage === this.floorRelativePosition)
    return this.stepConfig.values[this.isDouble ? idx : 0]
  }

  get _ceilValue () {
    const idx = this.stepConfig.percentages.findIndex(percentage => percentage === this.ceilRelativePosition)
    return this.stepConfig.values[idx]
  }

  get stepConfig (): StepConfig {
    const total: number = this.availableSteps.length
    const config: StepConfig = this.availableSteps.reduce((acc: StepConfig, step: number, idx: number) => {
      acc.values.push(step)
      acc.percentages.push(idx / (total - 1))
      return acc
    }, {
      values: [],
      percentages: [],
      total
    })
    return config
  }

  get _sliderMinGap () {
    return 1 / this.stepConfig.total
  }

  @Watch('ceilValue')
  onCeilValueChanged () {
    if (!this.isDragging) {
      this.calculateInitialCeilRelativePosition()
    }
  }

  @Watch('floorValue')
  onFloorValueChanged () {
    if (!this.isDragging) {
      this.calculateInitialFloorRelativePosition()
    }
  }

  mounted () {
    if (window || process.client) {
      window.addEventListener('resize', this.resizeHandler)
      document.addEventListener('dragover', this.dragOverHandler)
      this.resizeHandler()
      this.calculateInitialCeilRelativePosition()
      this.calculateInitialFloorRelativePosition()
    }
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('dragover', this.dragOverHandler)
  }

  calculateInitialCeilRelativePosition () {
    const nearValue = this.getValidPosition(this.stepConfig.values, this.ceilValue)
    this.ceilRelativePosition = this.stepConfig.percentages[nearValue.index]
  }

  calculateInitialFloorRelativePosition () {
    const nearValue = this.getValidPosition(this.stepConfig.values, this.floorValue)
    this.floorRelativePosition = this.stepConfig.percentages[nearValue.index]
  }

  getValidPosition (group: Array<number>, value: number) {
    let diff
    let validStep = 0
    for (let i = 0; i < group.length; i++) {
      const _diff = Math.abs(group[i] - value)
      if (typeof diff !== 'undefined' && _diff > diff) {
        i = group.length
      } else {
        diff = _diff
        validStep = i
      }
    }
    return {
      value: group[validStep],
      index: validStep
    }
  }

  setFloorTriggerPosition (dragOffset: number, dragPosition: number) {
    const ceil = this.getValidPosition(this.stepConfig.percentages, this.ceilRelativePosition - this._sliderMinGap).value
    this.floorRelativePosition =
      dragPosition > 0 ? (dragPosition < ceil ? this.getValidPosition(this.stepConfig.percentages, dragPosition).value : ceil) : 0
    this.$emit('drag', [this._floorValue, this._ceilValue])
  }

  setCeilTriggerPosition (dragOffset: number, dragPosition: number) {
    const nearLimitValue = this.floorRelativePosition + (this.isDouble ? this._sliderMinGap : 0)
    const floor = this.getValidPosition(this.stepConfig.percentages, nearLimitValue).value
    this.ceilRelativePosition =
      dragPosition > floor
        ? (dragPosition < 1
          ? this.getValidPosition(this.stepConfig.percentages, dragPosition).value
          : 1)
        : floor
    this.$emit('drag', [this._floorValue, this._ceilValue])
  }

  resizeHandler () {
    const sliderContainer = (this.$refs['nc-slider__container'] as HTMLElement)
    this.trackSize = sliderContainer.offsetWidth
    this.trackLeftPosition = sliderContainer.getBoundingClientRect().left
  }

  dragStartHandler (e: DragEvent) {
    this.isDragging = true
    if (e.dataTransfer) {
      e.dataTransfer.setData('application/node type', 'this')
      const dragImg = document.getElementById('drag-dot-placeholder')
      if (dragImg) {
        e.dataTransfer.setDragImage(dragImg, 0, 0)
      }
    }
  }

  dragOverHandler (e: DragEvent | Touch) {
    if (e.clientX && this.dragX !== e.clientX && this.isDragging) {
      this.dragX = e.clientX
      const dragOffset = e.clientX - this.trackLeftPosition
      const dragPosition = dragOffset / this.trackSize
      if (this.isFloorTrigger) {
        this.setFloorTriggerPosition(dragOffset, dragPosition)
      } else {
        this.setCeilTriggerPosition(dragOffset, dragPosition)
      }
    }
  }

  touchStartHandler () {
    this.isDragging = true
  }

  touchMoveHandler (e: TouchEvent) {
    this.isFloorTrigger = (e.target as HTMLElement).classList.contains(
      'nc-slider__trigger--min'
    )
    this.dragOverHandler(e.targetTouches[0])
  }

  dragHandler (e: MouseEvent) {
    this.isFloorTrigger = (e.target as HTMLElement).classList.contains(
      'nc-slider__trigger--min'
    )
  }

  dragEndHandler () {
    this.isDragging = false
    this.$emit('change', [this._floorValue, this._ceilValue])
  }

  clickTrack (e: MouseEvent) {
    const clickOffset = e.clientX - this.trackLeftPosition
    const clickPosition = clickOffset / this.trackSize
    let methodName: 'setFloorTriggerPosition' | 'setCeilTriggerPosition'
    if (this.isDouble) {
      const distanceToCeil = Math.abs(this.ceilRelativePosition - clickPosition)
      const distanceToFloor = Math.abs(this.floorRelativePosition - clickPosition)
      this.isFloorTrigger = distanceToFloor < distanceToCeil
      methodName = this.isFloorTrigger ? 'setFloorTriggerPosition' : 'setCeilTriggerPosition'
    } else {
      this.isFloorTrigger = false
      methodName = 'setCeilTriggerPosition'
    }
    this[methodName](clickOffset, clickPosition)
    this.$emit('change', [this._floorValue, this._ceilValue])
  }
}
</script>
