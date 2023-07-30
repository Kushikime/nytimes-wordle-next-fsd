import { render, screen } from '@testing-library/react';
import { Game } from './Game';

describe('Game', () => {
    it('should render Board and VirtualKeyboard', () => {
        render(
            // Just to let the portals render
            <div id="app">
                <Game />
            </div>
        );

        expect(screen.getByTestId('Board')).toBeInTheDocument();
        expect(screen.getByTestId('VirtualKeyboard')).toBeInTheDocument();
    });
});
