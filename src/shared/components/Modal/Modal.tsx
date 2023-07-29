import { FC, PropsWithChildren } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Modal.module.scss';

interface ModalProps extends PropsWithChildren {
    onClose?: () => void;
    isVisible?: boolean;
}

// In most cases this should be not under shared.
// Under shared we would store just REALLY shared components like Button.
// those components are almost the same as the basic React components, except they are
// implemented following our design scheme.

export const Modal: FC<ModalProps> = (props) => {
    const { children, onClose, isVisible } = props;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className={styles.Modal}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={styles.bg}
                    >
                        <motion.div
                            className={styles.container}
                            initial={{ opacity: 0, y: 80 }}
                            exit={{ opacity: 0, y: 80 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                        >
                            <div className={styles.modalHeader}>
                                <div
                                    className={styles.closeModal}
                                    onClick={onClose}
                                >
                                    <span></span>
                                </div>
                            </div>
                            <div className={styles.modalContent}>
                                {children}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
