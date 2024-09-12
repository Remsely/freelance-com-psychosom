import Header from "./components/Header";
import Footer from "./components/Footer.tsx";
import {useForm} from "react-hook-form";
import "./utils/formatinput.ts";
import InputForm from "./components/UI/InputForm/InputForm.tsx";

export default function App() {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data : object) => {
        console.log(data);
    }

    return (
        <>
            <Header/>

            <main className="main container">
                <div className="description">
                    <p>Инфа о специалисте, интересная и мотивирующая история из жизни <br/>
                        Инфа о специалисте, интересная и мотивирующая история из жизни <br/>
                        Инфа о специалисте, интересная и мотивирующая история из жизни
                    </p>
                    <div className="important">
                        <p>Блок важное (сноска/заметка) <br/>
                            со ссылкой на инфу о психосоматике</p>
                    </div>
                    <p>Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                        текста Продолжается много текста Продолжается много текста Продолжается много текста
                        Продолжается много текста Продолжается много текста Продолжается много текста </p>
                    <div className="important">
                        <p>Инфа о дипломе <br/>
                            кнопка, открывающая модальное окно с файлом диплома</p>
                    </div>
                </div>
                <div className="photo">

                </div>
            </main>

            <h1 className="title_block container">Запишитесь на консультацию</h1>

            <form onSubmit={handleSubmit(onSubmit)} method="POST" className="form container">
                <div className="inputs block">
                    <div className="row">
                        <p>Имя</p>
                        <input type="name"
                               placeholder="Имя" {...register("firstname", {required: true})}/>
                    </div>
                    <div className="row">
                        <p>Фамилия</p>
                        <input type="name"
                               placeholder="Фамилия" {...register("lastname", {required: true})}/>
                    </div>
                    <div className="row">
                        <p>Телефон/ Telegram</p>
                        <InputForm name="Телефон" type="tel" nameDB="phone"/>

                    </div>
                </div>
                <div className="textarea block">
                    <p>Опишите свою проблему</p>
                    <textarea {...register("message", {required: true})}/>
                    <button type="submit">Записаться</button>
                </div>
            </form>

            <h1 className="title_block container">Отзывы</h1>

            <Footer/>
        </>
    )
}