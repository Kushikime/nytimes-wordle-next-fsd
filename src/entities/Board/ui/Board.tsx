import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import styles from './Board.module.scss';
import { Row } from '../../../features/ui';
import { GameState } from '../model/Board';
import { createPortal } from 'react-dom';
import { useCycle } from 'framer-motion';
import { StartModal } from '../../StartModal/StartModal';
import { LoseModal } from '../../LoseModal/LoseModal';
import { WinModal } from '../../WinModal/WinModal';

export const Board: FC<PropsWithChildren> = (props) => {
    const [lifes, setLifes] = useState(6);
    const [guessCount, setGuessCount] = useState(0);
    const [guessedWord, setGuessedWord] = useState('');

    const [gameState, setGameState] = useState<GameState>(GameState.INIT);

    const [words, setWords] = useState<string[]>([]);

    const [domReady, setDomReady] = useState(false);

    const [openStartModal, setOpenStartModal] = useCycle(true, false);
    const [openWinModal, setOpenWinModal] = useCycle(false, true);
    const [openLoseModal, setOpenLoseModal] = useCycle(false, true);

    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        setDomReady(true);
    }, []);

    console.log('Guessed: ', guessedWord);

    useEffect(() => {
        if (gameState === GameState.START && !guessedWord) {
            let wordsCopy = [...words];
            let guessed = wordsCopy.splice(
                Math.floor(Math.random() * wordsCopy.length),
                1
            );
            setGuessedWord(guessed[0]);
            setWords(wordsCopy);
            setOpenStartModal(1);
            setRows(Array(lifes).fill(Math.random()));
        }
    }, [gameState, setOpenStartModal, rows]);

    useEffect(() => {
        if (!words.length) {
            (async () => {
                let words = await fetch('/words.json').then((res) =>
                    res.json()
                );

                setWords(words);
            })();
        }
        setOpenStartModal(0);
        setRows(Array(lifes).fill(Math.random()));
    }, []);

    const onGuessAction = (won?: boolean) => {
        if (gameState === GameState.WON || gameState === GameState.LOSE) {
            return;
        }

        setGuessCount((prev) => prev + 1);

        if (won) {
            setGameState(GameState.WON);
            setOpenWinModal(1);
            return;
        }

        if (guessCount === 5 && !won) {
            setGameState(GameState.LOSE);
            setOpenLoseModal(1);
            return;
        }
    };

    const onStartModalClick = () => {
        setOpenStartModal(1);
        setGameState(GameState.START);
    };

    const restartGame = () => {
        setRows([]);
        setGuessCount(0);
    };

    const onLoseModalClick = () => {
        setOpenLoseModal(0);
        setGuessedWord('');
        restartGame();
        setGameState(GameState.START);
    };

    const onWinModalClick = () => {
        setOpenWinModal(0);
        setGuessedWord('');
        restartGame();
        setGameState(GameState.START);
    };

    return (
        <div className={styles.Board}>
            <div className={styles.wrapper}>
                {rows.map((row, index) => (
                    <Row
                        active={guessCount === index}
                        guess={guessedWord}
                        onGuessAction={onGuessAction}
                        key={`row_${row}_${index}`}
                    />
                ))}
            </div>
            {domReady
                ? createPortal(
                      <StartModal
                          isVisible={openStartModal}
                          onClose={onStartModalClick}
                      />,
                      document.querySelector('.app')!
                  )
                : null}
            {domReady
                ? createPortal(
                      <LoseModal
                          guess={guessedWord}
                          isVisible={openLoseModal}
                          onClose={onLoseModalClick}
                      />,
                      document.querySelector('.app')!
                  )
                : null}
            {domReady
                ? createPortal(
                      <WinModal
                          count={guessCount}
                          isVisible={openWinModal}
                          onClose={onWinModalClick}
                      />,
                      document.querySelector('.app')!
                  )
                : null}
        </div>
    );
};
