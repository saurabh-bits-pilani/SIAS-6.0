import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

export function render(url: string) {
  const helmetContext = {};
  
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </StrictMode>
  );

  return { html, helmetContext };
}