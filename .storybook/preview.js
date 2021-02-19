import '!style-loader!css-loader!sass-loader!./storybook.scss';
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 2,
  attempt: 1
})
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
