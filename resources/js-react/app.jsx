import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client';
import initHttp from './http';
import { HttpContext } from './contexts/HttpContext';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    const http = initHttp();
    
    createRoot(el).render(<HttpContext.Provider value={http}>
      <App {...props} />
    </HttpContext.Provider>)
  },
});