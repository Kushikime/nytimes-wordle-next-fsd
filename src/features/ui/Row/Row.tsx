import { FC, useEffect, useMemo, useState } from 'react';
import { Tile } from '../Tile/Tile';
import styles from './Row.module.scss';

interface Row {
    guess: string;
    onGuessAction: (guess: string) => void;
}

export const Row: FC<Row> = (props) => {
    const {} = props;
    const [currentInput, setCurrentInput] = useState('');

    const tiles = useMemo(() => Array(5).fill(''), []);

    useEffect(() => {}, []);

    return (
        <div className={styles.Row}>
            {tiles.map((_, index) => (
                <Tile key={`${currentInput[index]}_${index}`} />
            ))}
        </div>
    );
};
