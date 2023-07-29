import { FC } from 'react';
import { Board } from '../../../entities/Board';
import { VirtualKeyboard } from '../../../entities/VirtualKeyboard';
import styles from './Game.module.scss';

export const Game: FC = () => {
    return (
        <div className={styles.Game}>
            <Board />
            <VirtualKeyboard />
        </div>
    );
};
