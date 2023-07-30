import { render, screen } from '@testing-library/react';
import { Tile } from '..';
import styles from './Tile.module.scss';

describe('Tile', () => {
    it('should render a Tile with a letter A', () => {
        render(<Tile classNames={[]} value="A" key="A" />);

        expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('should render a Tile with wrong className', () => {
        const wrongClass = styles.wrong;
        const { container } = render(
            <Tile classNames={[wrongClass]} value="A" key="A" />
        );

        expect(container.getElementsByClassName(wrongClass).length).toBe(1);
    });

    it('should render a Tile with correct className', () => {
        const correctClass = styles.correct;
        const { container } = render(
            <Tile classNames={[correctClass]} value="A" key="A" />
        );

        expect(container.getElementsByClassName(correctClass).length).toBe(1);
    });

    it('should render a Tile with a contain className', () => {
        const containClass = styles.contain;
        const { container } = render(
            <Tile classNames={[containClass]} value="A" key="A" />
        );

        expect(container.getElementsByClassName(containClass).length).toBe(1);
    });
});
