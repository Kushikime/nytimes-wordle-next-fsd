import { FC, useMemo } from 'react';
import styles from './VirtualKeyboard.module.scss';
import { KeyBoardButton } from '../../../shared/components/KeyBoardButton/KeyBoardButton';

const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete'],
];

export const VirtualKeyboard: FC = () => {
    const onKeyClick = (key: string) => {
        console.log('key: ', key);
    };

    const mappedKeys = useMemo(
        () =>
            keys.map((row, index) => (
                <div className={styles.row} key={`VirtualKeyboard_row_${index}`}>
                    {row.map((key) => (
                        <KeyBoardButton
                            key={`${index}_${key}`}
                            name={key}
                            onClick={onKeyClick}
                        />
                    ))}
                </div>
            )),
        []
    );
    return (
        <div className={styles.VirtualKeyboard}>
            <div className={styles.wrapper}>{mappedKeys}</div>
        </div>
    );
};
