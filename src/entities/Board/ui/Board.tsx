import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCycle } from 'framer-motion';
import styles from './Board.module.scss';
import { Row } from '../../../features/ui';
import { GameState } from '../model/Board';
import { StartModal } from '../../StartModal/StartModal';
import { LoseModal } from '../../LoseModal/LoseModal';
import { WinModal } from '../../WinModal/WinModal';

export const Board: FC = () => {
    const [lifes] = useState(6);
    const [guessCount, setGuessCount] = useState(0);
    const [guessedWord, setGuessedWord] = useState('');

    const [gameState, setGameState] = useState<GameState>(GameState.INIT);

    const [words, setWords] = useState<string[]>([]);

    const [domReady, setDomReady] = useState(false);
    const [appContainer, setAppContainer] = useState<HTMLElement | null>(null);

    const [openStartModal, setOpenStartModal] = useCycle(true, false);
    const [openWinModal, setOpenWinModal] = useCycle(false, true);
    const [openLoseModal, setOpenLoseModal] = useCycle(false, true);

    const [rows, setRows] = useState<number[]>([]);

    useEffect(() => {
        setDomReady(true);
        const app = document.getElementById('app');
        setAppContainer(app);
    }, []);

    useEffect(() => {
        if (gameState === GameState.START && !guessedWord) {
            const wordsCopy = [...words];
            const guessed = wordsCopy.splice(
                Math.floor(Math.random() * wordsCopy.length),
                1
            );
            setGuessedWord(guessed[0]);
            setWords(wordsCopy);
            setOpenStartModal(1);
            setRows([...Array(lifes).keys()]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState, setOpenStartModal, rows]);

    useEffect(() => {
        if (!words.length) {
            (async () => {
                const fetched = await fetch(
                    'http://localhost:5173/words.json'
                ).then((res) => res.json());

                setWords(fetched);
            })();
        }
        setOpenStartModal(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className={styles.Board} data-testid="Board">
            <div className={styles.wrapper}>
                {rows.map((row, index) => (
                    <Row
                        active={guessCount === index}
                        guess={guessedWord}
                        onGuessAction={onGuessAction}
                        key={`row_${row}`}
                    />
                ))}
            </div>
            {domReady
                ? createPortal(
                      <StartModal
                          testId="StartModal"
                          isVisible={openStartModal}
                          onClose={onStartModalClick}
                      />,
                      appContainer!
                  )
                : null}
            {domReady
                ? createPortal(
                      <LoseModal
                          guess={guessedWord}
                          isVisible={openLoseModal}
                          onClose={onLoseModalClick}
                      />,
                      appContainer!
                  )
                : null}
            {domReady
                ? createPortal(
                      <WinModal
                          count={guessCount}
                          isVisible={openWinModal}
                          onClose={onWinModalClick}
                      />,
                      appContainer!
                  )
                : null}
        </div>
    );
};
