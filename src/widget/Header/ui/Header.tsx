import { FC } from 'react';
import styles from './Header.module.scss';

export const Header: FC = () => {
    return (
        <div className={styles.Header}>
            <p>Wordle</p>
        </div>
    );
};
