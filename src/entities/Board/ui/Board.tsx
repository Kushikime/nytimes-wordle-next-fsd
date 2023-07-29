import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import styles from './Board.module.scss';
import { Row } from '../../../features/ui';

export const Board: FC<PropsWithChildren> = (props) => {
    const [lifes, setLifes] = useState(6);
    const [guessedWord, setGuessedWord] = useState('');

    useEffect(() => {
        // Fetch word;
        // setGuessedWord(fetchedWord);
    });

    // ON Guess check if the word is our guess and if we have that word inside words
    const rows = useMemo(() => Array(lifes).fill(''), []);

    return (
        <div className={styles.Board}>
            <div className={styles.wrapper}>
                {rows.map((_, index) => (
                    <Row
                        key={`row_${index}`}
                        guess={guessedWord}
                        onGuessAction={() => {
                            console.log('ENTER!');
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
