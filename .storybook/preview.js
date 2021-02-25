import '!style-loader!css-loader!sass-loader!./storybook.scss';
import Vue from 'vue'
import { addParameters } from '@storybook/client-api';

import { ObserveVisibility } from 'vue-observe-visibility'

Vue.directive('observe-visibility', ObserveVisibility)

export const parameters = {
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs'
}
