import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import styles from './Board.module.scss';
import { Row } from '../../../features/ui';
import { GameState } from '../model/Board';
import { createPortal } from 'react-dom';
import { Modal } from '../../../shared/components/Modal/Modal';

export const Board: FC<PropsWithChildren> = (props) => {
    const [lifes, setLifes] = useState(6);
    const [guessCount, setGuessCount] = useState(0);
    const [guessedWord, setGuessedWord] = useState('');
    const [gameState, setGameState] = useState<GameState>(GameState.INIT);
    const [words, setWords] = useState<string[]>([]);
    const [domReady, setDomReady] = useState(false);

    useEffect(() => {
        setDomReady(true);
    }, []);

    useEffect(() => {
        if (GameState.START && !guessedWord) {
            let wordsCopy = [...words];
            let guessed = wordsCopy.splice(
                Math.floor(Math.random() * wordsCopy.length),
                1
            );
            console.log('guessedWord: ', guessed[0]);
            setGuessedWord(guessed[0]);
            setWords(wordsCopy);
        }

        // setGuessedWord(fetchedWord);
    }, [gameState]);

    useEffect(() => {
        if (!words.length) {
            console.log('adsldkasn');
            (async () => {
                let words = await fetch('/public/words.json').then((res) =>
                    res.json()
                );

                setWords(words);
            })();
        }
    }, []);

    useEffect(() => {
        console.log('guessedWord: ', guessedWord);
        console.log('guessed in words? : ', words.includes(guessedWord));
    }, [guessedWord, words]);

    const onGuessAction = (won?: boolean) => {
        if (gameState === GameState.WON || gameState === GameState.LOSE) {
            return;
        }

        if (won) {
            setGameState(GameState.WON);
            // show WIN modal
        }

        if (guessCount === 6 && !won) {
            setGameState(GameState.WON);
            // show LOST modal + restat button
        }
        setGuessCount((prev) => prev + 1);
    };

    // ON Guess check if the word is our guess and if we have that word inside words
    const rows = useMemo(() => Array(lifes).fill(''), []);

    return (
        <div className={styles.Board}>
            <div className={styles.wrapper}>
                {rows.map((_, index) => (
                    <Row
                        active={guessCount === index}
                        guess={guessedWord}
                        onGuessAction={onGuessAction}
                        key={`row_${index}`}
                    />
                ))}
            </div>
            {domReady
                ? createPortal(
                      <Modal onClose={() => console.log('CLOSED!!')}>
                          <h1>PORTAL</h1>
                      </Modal>,
                      document.querySelector('.app')!
                  )
                : null}
        </div>
    );
};
