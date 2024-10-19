interface TextMainProps {
    text : string
}

export default function TextMentorInfo({text} : TextMainProps) {
    return (
        <p>{text}</p>
    )
}
