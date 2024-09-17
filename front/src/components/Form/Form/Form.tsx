import {useForm} from "react-hook-form";
import RowForm from "../RowForm/RowForm.tsx";
import TextareaForm from "../TextareaForm/TextareaForm.tsx";
import styles from "./Form.module.scss"

export default function Form() {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data: object) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className={`${styles.form} container`}>
                <div className={`${styles.inputs} block`}>
                    <RowForm label="Имя" name="firstname" type="name" register={register} required={true}/>
                    <RowForm label="Фамилия" name="lastname" type="name" register={register} required={true}/>
                    <RowForm label="Телефон / Telegram" name="phone" type="tel" register={register} required={true}/>
                </div>
                <TextareaForm register={register} />
            </form>
        </>
    )
}