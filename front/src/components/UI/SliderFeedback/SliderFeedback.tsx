import Slider from "react-slick";
import FeedbackCard from "../FeedbackCard/FeedbackCard.tsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {feedbacks} from "../../../utils/data.ts";
import {CSSProperties} from "react";

interface ArrowProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
}

function SampleNextArrow(props : ArrowProps) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props : ArrowProps) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style}}
            onClick={onClick}
        />
    );
}

export default function SliderFeedback() {
    const sliderSettings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        useTransform: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider className="container" {...sliderSettings}>
            {feedbacks.map(feedback => (
                <FeedbackCard
                    key={feedback.id}
                    id={feedback.id}
                    name={feedback.name}
                    star={feedback.star}
                    message={feedback.message}
                    date={feedback.date}
                />
            ))}
        </Slider>
    )
}
