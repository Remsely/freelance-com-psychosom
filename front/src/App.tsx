import Header from "./components/UI/Header/Header.tsx";
import Footer from "./components/UI/Footer/Footer.tsx";
import TitleBlock from "./components/UI/TitleBlock/TitleBlock";
import ImportantBlock from "./components/UI/ImportantBlock/ImportantBlock";
import Form from "./components/Form/Form/Form";
import SliderFeedback from "./components/UI/SliderFeedback/SliderFeedback";
import PopupModal from "./components/UI/PopupModal/PopupModal";
import {useState} from "react";

export default function App() {

    const [isOpenCertificate, setIsOpenCertificate] = useState(false)
    const [isOpenForm, setIsOpenForm] = useState(false)

    return (
        <>
            <Header/>

            <main className="main container">
                <div className="description">
                    <p>Инфа о специалисте, интересная и мотивирующая история из жизни <br/>
                        Инфа о специалисте, интересная и мотивирующая история из жизни <br/>
                        Инфа о специалисте, интересная и мотивирующая история из жизни
                    </p>
                    <ImportantBlock text="Блок важное (сноска/заметка)
                    со ссылкой на инфу о психосоматике"/>
                    <p>Продолжается много текста Продолжается много текста Продолжается много текста Продолжается много
                        текста Продолжается много текста Продолжается много текста Продолжается много текста
                        Продолжается много текста Продолжается много текста Продолжается много текста </p>
                    <ImportantBlock text="<a id='important-link'>Инфа о дипломе</a>
                    кнопка, открывающая модальное окно с файлом диплома"
                                    onLinkClick={() => setIsOpenCertificate(true)}/>
                    <PopupModal isOpen={isOpenCertificate} setIsOpen={setIsOpenCertificate} image="certificate.jpg"/>
                </div>
                <div className="photo">

                </div>
            </main>

            <TitleBlock title="Запишитесь на консультацию" id="consultation"/>

            <Form setIsOpen={setIsOpenForm}/>
            <PopupModal isOpen={isOpenForm} setIsOpen={setIsOpenForm} title="Поздравляем, вы записаны!"
            description="Вы записались на консультацию к специалисту. Скоро с вами свяжется специалист по методу связи, который вы указали."/>

            <TitleBlock title="Отзывы" id="feedbacks"/>

            <SliderFeedback/>

            <Footer/>
        </>
    )
}