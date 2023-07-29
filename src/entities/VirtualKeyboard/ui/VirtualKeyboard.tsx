import { FC, useEffect, useMemo, useState } from 'react';
import styles from './VirtualKeyboard.module.scss';
import { KeyBoardButton } from '../../../shared/components/KeyBoardButton/KeyBoardButton';

const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete'],
];

export const VirtualKeyboard: FC = () => {
    const [allowInput, setAllowInput] = useState(true);

    const onKeyClick = (key: string) => {
        if (!allowInput) return;
        dispatchEvent(new CustomEvent('VKEvent', { detail: { key } }));
    };

    useEffect(() => {
        window.addEventListener('allowInput', (e: any) => {
            setAllowInput(e.detail?.allowInput);
        });

        return () => {
            window.addEventListener('allowInput', () => {});
        };
    }, []);

    const mappedKeys = useMemo(
        () =>
            keys.map((row, index) => (
                <div
                    className={styles.row}
                    key={`VirtualKeyboard_row_${index}`}
                >
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
