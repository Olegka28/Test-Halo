import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import classes from "../styles/Home.module.css";
import Card from "../components/Card";
import BaseApi, { ResponseApi } from "../utils/DataService";
import Modal from "../components/Modal";
import TextField from "../components/TextField";
import useInputValue from "../utils/hooks";
import validation from "../utils/validation"
import { getMinValue } from "../utils/findMinValue";

const Home: React.FC = (): React.ReactElement => {
    const [fruits, setFruits] = useState<ResponseApi[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fruit, setFruit] = useState<ResponseApi | null>(null);
    const [errors, setErrors] = useState<any>({});
    const { onChange, valueInput, clear } = useInputValue({
        name: '',
        number: '',
    })
    const modalRef = useRef<HTMLDivElement | any>()

    const checkedValidation = () => {
        setErrors(validation(
              {name: 'name', value: valueInput.name},
              {name: 'number', value: valueInput.number}
              ));
    }

    const handlerCheapestFruit = () => {
        setFruit(getMinValue(fruits));
        modalRef.current.openModal();
        setErrors({
            name: '',
            number: '',
        })
    }

    const handlerBuyFruit = (fruit: ResponseApi) => {
        setFruit(fruit);
        modalRef.current.openModal();
        setErrors({
            name: '',
            number: '',
        })
    }

    const clearState = () => {
        setErrors({
            name: '',
            number: '',
        })
        clear({
            name: '',
            number: '',
        });
    }

    const fetchData = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        checkedValidation();
        if(!Object.keys(errors).length) {
            const data = {
                nameUser: valueInput.name,
                number: valueInput.number,
            };
            console.log(data);
            clearState();
            BaseApi.put({...data, ...fruit}).then(res => setFruits(res));
            modalRef.current.closeModal();
        }
    }

    useEffect(() => {
        BaseApi.get().then(res => {
            setFruits(res);
            setLoading(false);
        });
    }, []);

    if(loading) {
        return (
            <div className={classes.containerEmpty}>
                <h1>Loading...</h1>
            </div>
        )
    }

    // Checked onChange input
    // useEffect(() => {
    //     checkedValidation();
    // }, [valueInput.name, valueInput.number]);

    return (
        <>
            <div className={classes.container}>
                <div className={classes.containerCards}>
                    {fruits.map((fruit) => {
                        return <Card
                            onClick={() => handlerBuyFruit(fruit)}
                            key={fruit.id}
                            title={fruit.name}
                            price={fruit.price}
                            category={fruit.category}
                        />
                    })}
                </div>

                <button onClick={handlerCheapestFruit} className={classes.containerBtn}>Buy cheapest</button>
                <Modal clearState={clearState} ref={modalRef}>
                    <div className={classes.containerModal}>
                        <p className={classes.modalSubtitle}>{fruit?.category}</p>
                        <h2 className={classes.modalTitle}>{fruit?.name}</h2>
                        <div className={classes.modalSectionPrice}>
                        <span className={classes.modalPriceIcon}>
                            $
                        </span>
                            <p className={classes.modalPriceTypography}>
                                {fruit?.price}
                            </p>
                        </div>
                        <form className={classes.modalForm} onSubmit={fetchData}>
                            <TextField
                                onBlur={checkedValidation}
                                validValue={errors}
                                messageError={errors.name}
                                onChange={onChange}
                                valueInput={valueInput.name}
                                name='name'
                                placeholder='Name'
                            />
                            <TextField
                                validValue={errors}
                                messageError={errors.number}
                                onBlur={checkedValidation}
                                onChange={onChange}
                                valueInput={valueInput.number}
                                name='number'
                                placeholder='Number'
                            />
                            <button type='submit' className={classes.modalFormSubmitBtn}>
                                Order
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Home