<template>
  <div class="ui-input-date">
    <input
      v-model="formattedDate"
      type="text"
      class="ui-input-date__placeholder"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :isReadonly="isReadonly"
    />
    <input
      v-model="selectedDate"
      type="date"
      class="ui-input-date__datepicker"
      :max="max"
      :min="min"
      @change="handleChangeDate"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiInputDate',
  props: {
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isReadonly: {
      type: Boolean,
      default: false
    },
    max: {
      type: String,
      default: ''
    },
    min: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {
      selectedDate: ''
    }
  },
  computed: {
    formattedDate (): string {
      return this.selectedDate !== ''
        ? this.formatDate(this.selectedDate)
        : this.placeholder
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value): void {
        if (value) {
          this.selectedDate = new Date(value).toISOString().replace(/T.*/,'')
        }
      }
    }
  },
  methods: {
    formatDate (date: string): string {
      const d = new Date(date)
      return d.toLocaleString(navigator.language || 'es', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      })
    },

    handleChangeDate (): void {
      this.$emit('change', new Date(this.selectedDate).getTime())
    }
  }
})
</script>

<style scoped lang="scss">
.ui-input-date {
  display: inline-block;
  position: relative;
  width: 100%;
  height: $spacing-size-8;
  &__placeholder {
    @include body('m');
    border: none;
    border-bottom: $border-3;
    color: $content-2;
    height: $spacing-size-7;
    left: 0;
    padding-bottom: $spacing-size-2;
    position: absolute;
    top: 0;
    width: 100%;
  }
  &__datepicker {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    box-sizing: border-box;
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      cursor: pointer;
    }
  }
}
</style>
