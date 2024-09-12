import {FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps {
    label: string;
    name: string;
    type: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
}

export default function RowForm({label, name, type, register, required}: InputProps) {
    return (
        <div className="row">
            <p>{label}</p>
            <input
                type={type}
                placeholder={label}
                {...register(name, {required})}
            />
        </div>
    );
};
