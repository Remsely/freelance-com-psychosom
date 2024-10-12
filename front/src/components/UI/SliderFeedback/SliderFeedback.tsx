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
    const settings = {
        slidesToShow: 3,
        variableWidth: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <Slider className="container" {...settings}>
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
