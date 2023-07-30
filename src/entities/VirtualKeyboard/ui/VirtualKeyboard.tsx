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
        dispatchEvent(new CustomEvent('virtualKeyBoard', { detail: { key } }));
    };

    useEffect(() => {
        window.addEventListener('allowInput', (e) => {
            setAllowInput(e.detail.allow);
        });

        return () => {
            window.addEventListener('allowInput', () => {});
        };
    }, []);

    const mappedKeys = useMemo(
        () =>
            keys.map((row) => (
                <div
                    className={styles.row}
                    key={`VirtualKeyboard_row_${Math.random()}`}
                >
                    {row.map((key) => (
                        <KeyBoardButton
                            key={`${Math.random()}_${key}`}
                            name={key}
                            onClick={onKeyClick}
                        />
                    ))}
                </div>
            )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return (
        <div className={styles.VirtualKeyboard} data-testid="VirtualKeyboard">
            <div className={styles.wrapper}>{mappedKeys}</div>
        </div>
    );
};
