interface TextMainProps {
    text : string
}

export default function TextMentorInfo(props : TextMainProps) {
    return (
        <p>{props.text}</p>
    )
}
