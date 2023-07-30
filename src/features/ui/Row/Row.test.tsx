import UserEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Row } from '..';
import styles from '../Tile/Tile.module.scss';

describe('Row', () => {
    it('should render a Row', () => {
        render(
            <Row
                active={false}
                guess="test"
                onGuessAction={() => {}}
                key="test"
            />
        );

        expect(screen.getByTestId('Row')).toBeInTheDocument();
    });
    it('should render 5 tiles inside Row', () => {
        const { container } = render(
            <Row
                active={false}
                guess="test"
                onGuessAction={() => {}}
                key="test"
            />
        );

        expect(container.getElementsByClassName(styles.Tile).length).toBe(5);
    });
    it('should render a Row and fill the first Tile with letter A', async () => {
        const { container } = render(
            <Row active guess="test" onGuessAction={() => {}} key="test" />
        );

        await UserEvent.keyboard('a');

        screen.debug();

        expect(
            container.getElementsByClassName(styles.Tile)[0].textContent
        ).toBe('a');
    });
});
