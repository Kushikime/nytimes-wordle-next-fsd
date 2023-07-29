import { FC } from 'react';
import { Modal } from '../../shared/components/Modal/Modal';
import styles from './LoseModal.module.scss';

interface LoseModalProps {
    isVisible: boolean;
    onClose: () => void;
    guess: string;
}

export const LoseModal: FC<LoseModalProps> = (props) => {
    const { isVisible, onClose, guess } = props;
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <h1>You've lost</h1>
            <h2>You didn't guess the Wordle in 6 tries.</h2>
            <p>The correct word was: {guess}</p>
            <div className={styles.actions}>
                <button onClick={onClose}>RESTART GAME</button>
            </div>
        </Modal>
    );
};
