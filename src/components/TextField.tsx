import React, {ChangeEvent} from 'react';
import classes from '../styles/TextField.module.css'

interface InputProps {
    placeholder: string;
    name: string;
    validValue?: boolean | any;
    messageError?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    valueInput: string;
    onBlur: (event: ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<InputProps> = ({
        placeholder,
        name,
        messageError,
        validValue,
        onChange,
        valueInput,
        onBlur,
    }): React.ReactElement => {
    return (
        <div className={classes.container}>
            <input onBlur={onBlur}
                   name={name}
                   placeholder={placeholder}
                   className={`${validValue && !messageError ? '' : classes.inputError}`}
                   type="text"
                   onChange={onChange}
                   value={valueInput}
            />
            {validValue && <p className={classes.inputErrorMessage}>{messageError}</p>}
        </div>
    )
}


export default TextField;