import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Tile } from '../Tile/Tile';
import styles from './Row.module.scss';
import TileStyles from '../Tile/Tile.module.scss';

const lettersRegex = /^[a-z]+$/i;

interface RowProps {
    guess: string;
    onGuessAction: (finished: boolean) => void;
    active: boolean;
}

export const Row: FC<RowProps> = (props) => {
    const { active, guess, onGuessAction } = props;
    const [currentInput, setCurrentInput] = useState('');
    const [allowInput, setAllowInput] = useState(true);

    const handleKeyEvents = (e: KeyboardEvent) => {
        let key = e.key;

        if (!active || !allowInput) return;

        if (key === 'Backspace') {
            setCurrentInput(currentInput.slice(0, currentInput.length - 1));
            return;
        }

        if (key === 'Enter') {
            if (currentInput.length === 5) {
                onGuessAction(currentInput === guess);
                return;
            }
            return;
        }

        setAllowInput(false);

        if (
            currentInput.length < 5 &&
            key.length === 1 &&
            lettersRegex.test(key)
        ) {
            setCurrentInput(currentInput + key);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyEvents);

        return () => {
            window.removeEventListener('keydown', handleKeyEvents);
        };
    }, [active, allowInput, setAllowInput, currentInput, handleKeyEvents]);

    useEffect(() => {
        window.addEventListener('keyup', () => {
            setAllowInput(true);
        });

        return () => {
            window.removeEventListener('keyup', () => {});
        };
    }, [allowInput]);

    const tiles = useMemo(() => Array(5).fill(''), []);

    return (
        <div className={styles.Row}>
            {tiles.map((_, index) => {
                let classNames: (string | undefined)[] = [];

                // show styles only if current row is not active anymore
                if (!active && currentInput[index]) {
                    let isLetterInGuess = guess.includes(currentInput[index]);
                    let isCorrect = currentInput[index] === guess[index];

                    classNames = [
                        isLetterInGuess ? TileStyles.contain : undefined,
                        isCorrect ? TileStyles.correct : undefined,
                    ];
                }

                return (
                    <Tile
                        classNames={classNames}
                        value={currentInput[index]}
                        key={`${currentInput[index]}_${index}`}
                    />
                );
            })}
        </div>
    );
};
