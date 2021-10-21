import UiInputDate from '~/components/ui-input-date'
export default {
  title: 'ui-inputs',
  component: UiInputDate
}

export const datePickerBasic = () => ({
  components: { UiInputDate },
  template: `
    <div class="story-ui-datepicker-container">
      <ui-input-date
        placeholder="Introduce una fecha"
        min="2021-01-01"
        max="2021-12-31"
      />
    </div>
  `
})
