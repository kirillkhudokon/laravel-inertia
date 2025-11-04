import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import initHttp from './http';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true });
    return pages[`./Pages/${name}.vue`];
  },
  setup({ el, App, props, plugin }) {
    const http = initHttp();

    createApp({ render: () => h(App, props) })
      .use(plugin)
      .provide('http', http)
      .mount(el)
  },
});