import { FC, PropsWithChildren } from 'react';
import styles from './Modal.module.scss';

interface ModalProps extends PropsWithChildren {
    onClose?: () => void;
}

// In most cases this should be not under shared.
// Under shared we would store just REALLY shared components like Button.
// those components are almost the same as the basic React components, except they are
// implemented following our design scheme.

export const Modal: FC<ModalProps> = (props) => {
    const { children, onClose } = props;

    return (
        <div className={styles.Modal}>
            <div className={styles.bg}>
                <div className={styles.container}>
                    <div className={styles.modalHeader}>
                        <div className={styles.closeModal} onClick={onClose}>
                            <span></span>
                        </div>
                    </div>
                    <div className={styles.modalContent}>{children}</div>
                </div>
            </div>
        </div>
    );
};
