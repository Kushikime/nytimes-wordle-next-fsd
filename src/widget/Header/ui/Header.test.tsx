import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
    it('should render Wordle logo', () => {
        render(<Header />);
        expect(screen.getByText(/Wordle/i));
    });
});
