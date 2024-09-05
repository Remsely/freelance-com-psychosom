import Header from "./components/Header";
import Footer from "./components/Footer.tsx";
import {useForm} from "react-hook-form";

export default function App() {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data : object) => {
        console.log(data);
    }

    return (
        <>
            <Header/>

            <main className="container">
                <div className="description block">
                    <p>Инфа о специалисте, интересная и мотивирующая история из жизни <br/>
                        Инфа о специалисте, интересная и мотивирующая история из жизни</p>
                    <div className="important">
                        <p>Блок важное (сноска/заметка) <br/>
                            со ссылкой на инфу о психосоматике</p>
                    </div>
                    <p>Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                        текста Продолжается много текста Продолжается много текста Продолжается много текста
                        Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                        текста Продолжается много текста Продолжается </p>
                    <div className="important">
                        <p>Инфа о дипломе <br/>
                            кнопка, открывающая модальное окно с файлом диплома</p>
                    </div>
                </div>
                <div className="photo block">

                </div>
            </main>

            <h1 className="title_block container">Записаться на консультацию</h1>

            <form onSubmit={handleSubmit(onSubmit)} method="POST" className="form container">
                <div className="inputs block">
                    <h2>Имя</h2>
                    <input type="text" {...register("firstname", {required: true})}/>
                    <h2>Фамилия</h2>
                    <input type="text" {...register("lastname", {required: true})}/>
                    <h2>Телефон / Telegram</h2>
                    <input type="text" {...register("phone", {required: true})}/>
                </div>
                <div className="textarea block">
                    <input type="message" {...register("message", {required: true})}/>
                    <input type="submit"/>
                </div>
            </form>

            <Footer/>
        </>
    )
}