import Header from "./components/Header";
import Footer from "./components/Footer.tsx";
import {Form, useForm} from "react-hook-form";

export default function App() {
    const {register} = useForm()

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

            <h1 className="title_block">Записаться на консультацию</h1>

            <Form>
                <div className="inputs">
                    <h2>Имя</h2>
                    <input type="text" {...register("name", {required: true})}/>
                </div>
            </Form>

            <Footer/>
        </>
    )
}