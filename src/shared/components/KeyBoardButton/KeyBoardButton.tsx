import { FC } from 'react';
import styles from './KeyBoardButton.module.scss';

interface KeyBoardButtonProps {
    name: string;
    onClick: (key: string) => void;
}

// In most cases this should be not under shared.
// Under shared we would store just REALLY shared components like Button.
// those components are almost the same as the basic React components, except they are
// implemented following our design scheme.

export const KeyBoardButton: FC<KeyBoardButtonProps> = (props) => {
    const { name, onClick } = props;

    const onClickHandler = () => {
        onClick(name);
    };

    return (
        <button
            className={[
                styles.KeyBoardButton,
                Math.floor(Math.random() * 2) ? styles.active : undefined,
            ].join(' ')}
            onClick={onClickHandler}
            type="button"
        >
            <p>{name}</p>
        </button>
    );
};
