<template src="./index.html"></template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue3'
export default defineComponent({
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
      type: String,
      default: ''
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    let selectedDate =  ref('')

    watch(
      () => props.value, (val:string) => {
      if (val) {
        selectedDate.value = new Date(val).toISOString().replace(/T.*/,'')
      }
    })

    const formattedDate = computed(() => selectedDate.value !== ''
        ? formatDate(selectedDate.value)
        : props.placeholder)

    const formatDate = (date: string): string => {
      const d = new Date(date)
      return d.toLocaleString(navigator.language || 'es', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      })
    }

    const handleChangeDate = () => {
      emit('change', new Date(selectedDate.value).getTime())
    }

    return {
      selectedDate,
      formattedDate,
      formatDate,
      handleChangeDate
    }
  }
})
</script>
