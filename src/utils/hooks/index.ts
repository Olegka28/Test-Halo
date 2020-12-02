import React, { useState } from 'react';

type HookInput = {
    valueInput: Record<string, string>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    clear: (object: Record<string, string>) => void;
};

export default function useInputValue(
    defaultValue: Record<string, string>
): HookInput {
    const [valueInput, setValue] = useState<Record<string, string>>(defaultValue);

    return {
        valueInput,
        onChange: (event) => {
            setValue({
                ...valueInput,
                [event.target.name]: event.target.value,
            });
        },

        clear: (object) =>
            setValue({
                ...valueInput,
                ...object,
            }),
    }
}
