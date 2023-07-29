import { FC } from 'react';
import { Modal } from '../../shared/components/Modal/Modal';
import styles from './StartModal.module.scss';
import TileStyles from '../../features/ui/Tile/Tile.module.scss';
import { Tile } from '../../features/ui';

interface StartModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export const StartModal: FC<StartModalProps> = (props) => {
    const { isVisible, onClose } = props;
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <h1>How To Play</h1>
            <h2>Guess the Wordle in 6 tries.</h2>
            <ul>
                <li>Each guess must be a valid 5-letter word.</li>
                <li>
                    The color of the tiles will change to show how close your
                    guess was to the word.
                </li>
            </ul>
            <div className={styles.examples}>
                <p>Examples</p>
                <div className={styles.tiles}>
                    <Tile
                        value="w"
                        classNames={[TileStyles.correct, TileStyles.small]}
                    />
                    <Tile value="e" classNames={[TileStyles.small]} />
                    <Tile value="a" classNames={[TileStyles.small]} />
                    <Tile value="r" classNames={[TileStyles.small]} />
                    <Tile value="y" classNames={[TileStyles.small]} />
                </div>
                <p>
                    <b>W</b> is in the word and in the correct spot.
                </p>
                <div className={styles.tiles}>
                    <Tile value="p" classNames={[TileStyles.small]} />
                    <Tile
                        value="i"
                        classNames={[TileStyles.contain, TileStyles.small]}
                    />
                    <Tile value="l" classNames={[TileStyles.small]} />
                    <Tile value="l" classNames={[TileStyles.small]} />
                    <Tile value="s" classNames={[TileStyles.small]} />
                </div>
                <p>
                    <b>I</b> is in the word but in the wrong spot.
                </p>
                <div className={styles.tiles}>
                    <Tile value="v" classNames={[TileStyles.small]} />
                    <Tile value="a" classNames={[TileStyles.small]} />
                    <Tile value="g" classNames={[TileStyles.small]} />
                    <Tile value="u" classNames={[TileStyles.small]} />
                    <Tile
                        value="e"
                        classNames={[TileStyles.wrong, TileStyles.small]}
                    />
                </div>
                <p>
                    <b>U</b> is not in the word in any spot.
                </p>
            </div>
            <div className={styles.actions}>
                <button onClick={onClose}>START GAME</button>
            </div>
        </Modal>
    );
};
