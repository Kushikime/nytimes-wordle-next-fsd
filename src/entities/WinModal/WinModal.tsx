/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import { Modal } from '../../shared/components/Modal/Modal';
import styles from './WinModal.module.scss';

interface WinModalProps {
    isVisible: boolean;
    onClose: () => void;
    count: number;
}

export const WinModal: FC<WinModalProps> = (props) => {
    const { isVisible, onClose, count } = props;
    return (
        <Modal isVisible={isVisible} onClose={onClose} testId="LoseModal">
            <h1>You've won!</h1>
            <h2>
                You guessed the Wordle in {count}{' '}
                {count === 1 ? 'try' : 'tries'}.
            </h2>
            <p>Want to try another one?</p>
            <div className={styles.actions}>
                <button onClick={onClose} type="button">
                    RESTART GAME
                </button>
            </div>
        </Modal>
    );
};
