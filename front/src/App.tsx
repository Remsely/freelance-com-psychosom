import Header from "./components/UI/Header/Header.tsx";
import Footer from "./components/UI/Footer/Footer.tsx";
import TitleBlock from "./components/UI/TitleBlock/TitleBlock";
import SliderReview from "./components/UI/SliderReview/SliderReview.tsx";
import PopupModal from "./components/UI/PopupModal/PopupModal";
import ConsultationForm from "./components/UI/ConsultationForm/ConsultationForm.tsx";
import {useState} from "react";
import Main from "./components/UI/Main/Main.tsx";

export default function App() {
    const [isOpenForm, setIsOpenForm] = useState(false)

    return (
        <>
            <Header/>

            <Main/>

            <TitleBlock title="Запишитесь на консультацию" id="consultation"/>

            <ConsultationForm setIsOpen={setIsOpenForm}/>
            <PopupModal isOpen={isOpenForm} setIsOpen={setIsOpenForm} title="Поздравляем, вы записаны!"
            description="Вы записались на консультацию к специалисту. Скоро с вами свяжется специалист по методу связи, который вы указали."/>

            <TitleBlock title="Отзывы" id="reviews"/>

            <SliderReview/>

            <Footer/>
        </>
    )
}