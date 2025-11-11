import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import initHttp from './http';
import { HttpContext } from './contexts/HttpContext';

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
    const page = pages[`./Pages/${name}.tsx`];
    if (!page) {
      throw new Error(`Page ${name} not found`);
    }
    return page;
  },
  setup({ el, App, props }) {
    const http = initHttp();
    
    if (!el) {
      throw new Error('Root element not found');
    }
    
    createRoot(el).render(
      <HttpContext.Provider value={http}>
        <App {...props} />
      </HttpContext.Provider>
    );
  },
});