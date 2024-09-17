import Header from "./components/UI/Header/Header.tsx";
import Footer from "./components/UI/Footer/Footer.tsx";
import TitleBlock from "./components/UI/TitleBlock/TitleBlock";
import ImportantBlock from "./components/UI/ImportantBlock/ImportantBlock";
import Form from "./components/Form/Form/Form";
import SliderFeedback from "./components/UI/SliderFeedback/SliderFeedback";

export default function App() {

    return (
        <>
            <Header/>

            <main className="main container">
                <div className="description">
                    <p>Инфа о специалисте, интересная и мотивирующая история из жизни <br/>
                        Инфа о специалисте, интересная и мотивирующая история из жизни <br/>
                        Инфа о специалисте, интересная и мотивирующая история из жизни
                    </p>
                    <ImportantBlock text="Блок важное (сноска/заметка) <br/>
                    со ссылкой на инфу о психосоматике"/>
                    <p>Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                        текста Продолжается много текста Продолжается много текста Продолжается много текста
                        Продолжается много текста Продолжается много текста Продолжается много текста </p>
                    <ImportantBlock text="Инфа о дипломе <br/>
                    кнопка, открывающая модальное окно с файлом диплома"/>
                </div>
                <div className="photo">

                </div>
            </main>

            <TitleBlock title="Запишитесь на консультацию"/>

            <Form/>

            <TitleBlock title="Отзывы"/>

            <SliderFeedback/>

            <Footer/>
        </>
    )
}