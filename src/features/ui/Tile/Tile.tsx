import { FC, PropsWithChildren } from 'react';
import styles from './Tile.module.scss';

export const Tile: FC<PropsWithChildren> = (props) => {
    return (
        <div
            className={[
                styles.Tile,
                Math.floor(Math.random() * 2) ? styles.active : undefined,
            ].join(' ')}
        >
            <h3>T</h3>
        </div>
    );
};
