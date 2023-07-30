import { render } from '@testing-library/react';
import { VirtualKeyboard } from '..';
import styles from './VirtualKeyboard.module.scss';
import KeyBoard from '../../../shared/components/KeyBoardButton/KeyBoardButton.module.scss';

describe('VirtualKeyboard', () => {
    it('should render VirtualKeyboard', () => {
        const { container } = render(<VirtualKeyboard />);

        expect(
            container.getElementsByClassName(styles.VirtualKeyboard).length
        ).toBe(1);
    });
    it('should render 28 KeyboardButtons inside', () => {
        const { container } = render(<VirtualKeyboard />);

        expect(
            container.getElementsByClassName(KeyBoard.KeyBoardButton).length
        ).toBe(28);
    });
});
