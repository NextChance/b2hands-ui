import { action } from '@storybook/addon-actions';

import HelloWorld from '~/components/HelloWorld';

export default {
  title: 'NC-button',
  component: HelloWorld,
};

export const regular = () => ({
  components: { HelloWorld },
  template: '<HelloWorld></HelloWorld>',
  methods: { action: action('clicked') },
});
