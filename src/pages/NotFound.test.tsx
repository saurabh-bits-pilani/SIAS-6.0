import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('renders the 404 heading, explanatory copy, and a link back home', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /Return Home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
