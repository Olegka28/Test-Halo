import React, {useState, forwardRef, ReactNode, useImperativeHandle} from 'react';
import ReactDOM from 'react-dom';
import classes from '../styles/Modal.module.css';

interface ModalProps {
    children: ReactNode;
    clearState: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({children, clearState}, ref): React.ReactElement | null => {
    const [display, setDisplay] = useState<boolean>(false)

    useImperativeHandle(ref, (): any  => {
        return {
            openModal: () => open(),
            closeModal: () => close(),
        }
    });

    const open = () => {
        setDisplay(true);
    }

    const close = () => {
        setDisplay(false);
        clearState();
    }

    if(display) {
        return ReactDOM.createPortal(
            <div className={classes.modalContainer}>
                <div onClick={close} className={classes.modalBackground} />
                <div className={classes.modalBox} >
                    <div className={classes.modalBtnClose} onClick={close}>
                        <span>
                            X
                        </span>
                    </div>
                    {children}
                </div>
            </div>
            , document.getElementById('modal-root') as HTMLElement)
    }

    return null
})

export default Modal;