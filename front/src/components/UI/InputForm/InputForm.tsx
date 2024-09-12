import {useForm} from "react-hook-form";

type Props = {
    name: string,
    type: string,
    nameDB: string,
}

export default function InputForm(props : Props) {

    const {register} = useForm();

    return (
        <>
            <input type={props.type} maxLength={props.type === "tel" ? 18 : undefined}
                   placeholder={props.name} {...register(props.nameDB, {required: true})}/>
        </>
    )
}