
export type DataInput = {
    name: string;
    value: string;
}

export default function validation (objName: DataInput, objNumber: DataInput): Record<string, string> | boolean {
    let errors: Record<string, string> = {}

    if(Object.keys(objName).length){
        if(objName.value === '') {
            errors.name = 'This field in required';
        }
        else if(new RegExp(/[0-9]/).test(objName.value)) {
            errors.name = 'Only letters allowed';
        }
        else if(new RegExp(/[a-zA-Z]+/).test(objName.value)) {
            delete  errors.name;
        }
    }

    if(Object.keys(objNumber).length) {
        if(objNumber.value === '') {
            errors.number = 'This field in required';
        }
        else if(new RegExp(/[\D]+/).test(objNumber.value)) {
            errors.number = 'Only numbers allowed';
        }
        else if(objNumber.value.length === 12) {
            delete errors.number;
        }
        else {
            errors.number = 'Should contain 12 characters';
        }
    }

    if(!Object.keys(errors).length) {
        return true
    }

    return errors
}
