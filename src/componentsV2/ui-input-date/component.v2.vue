<template src="./index.html"></template>
<style scoped lang="scss" src="./styles.scss"></style>

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
