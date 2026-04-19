import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Writable } from 'node:stream';
import App from './App';
import './index.css';

interface HelmetData {
  toString(): string;
}

interface FilledHelmetContext {
  helmet?: {
    title?: HelmetData;
    meta?: HelmetData;
    link?: HelmetData;
    script?: HelmetData;
    htmlAttributes?: HelmetData;
    bodyAttributes?: HelmetData;
  };
}

export interface RenderResult {
  html: string;
  helmetContext: FilledHelmetContext;
}

/**
 * Render a route to static HTML. Uses renderToPipeableStream with onAllReady so
 * React.lazy()/Suspense boundaries fully resolve before the final HTML is
 * flushed — prerendered pages contain the real content, not loading fallbacks.
 */
export function render(url: string): Promise<RenderResult> {
  const helmetContext: FilledHelmetContext = {};

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let didError = false;

    const writable = new Writable({
      write(chunk: Buffer | string, _enc: BufferEncoding, cb: (err?: Error | null) => void) {
        chunks.push(Buffer.from(chunk));
        cb();
      },
    });

    writable.on('finish', () => {
      if (didError) return;
      resolve({
        html: Buffer.concat(chunks).toString('utf-8'),
        helmetContext,
      });
    });
    writable.on('error', reject);

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <HelmetProvider context={helmetContext as Record<string, unknown>}>
            <App />
          </HelmetProvider>
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          pipe(writable);
        },
        onError(err) {
          didError = true;
          reject(err);
        },
      },
    );

    // Hard cap so a stuck render can't block the whole prerender run.
    setTimeout(() => {
      didError = true;
      abort();
      reject(new Error(`Render timeout for ${url}`));
    }, 15_000);
  });
}
