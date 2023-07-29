import { FC } from 'react';
import styles from './Tile.module.scss';

interface TileProps {
    value: string;
    classNames: (string | undefined)[];
}

export const Tile: FC<TileProps> = (props) => {
    const { value, classNames } = props;

    return (
        <div
            className={[
                styles.Tile,
                value ? styles.active : undefined,
                ...classNames,
            ].join(' ')}
        >
            <h3>{value}</h3>
        </div>
    );
};
