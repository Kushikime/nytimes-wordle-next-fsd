import { act, render, screen } from '@testing-library/react';
import { Board } from '..';

describe('Board', () => {
    it('should render Board', () => {
        render(
            // Just to let the portals render
            <div id="app">
                <Board />
            </div>
        );

        expect(screen.getByTestId('Board')).toBeInTheDocument();
    });
    it('should render StartModal', async () => {
        render(
            // Just to let the portals render
            <div id="app">
                <Board />
            </div>
        );

        const StartModal = screen.getByTestId('StartModal');
        expect(StartModal).toBeInTheDocument();
    });
    it('should fetch the words', async () => {
        act(() =>
            render(
                // Just to let the portals render
                <div id="app">
                    <Board />
                </div>
            )
        );

        expect(screen.getByTestId('Board')).toBeInTheDocument();
    });
});
