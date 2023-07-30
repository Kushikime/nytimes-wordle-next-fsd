import { render } from '@testing-library/react';
import styles from './KeyBoardButton.module.scss';
import { KeyBoardButton } from './KeyBoardButton';

describe('KeyBoardButton', () => {
    it('should render a KeyBoardButton with key A', () => {
        const { container } = render(
            <KeyBoardButton name="A" onClick={() => {}} key="A" />
        );

        expect(
            container.getElementsByClassName(styles.KeyBoardButton).length
        ).toBe(1);

        expect(
            container.getElementsByClassName(styles.KeyBoardButton)[0]
                .textContent
        ).toBe('A');
    });
});
