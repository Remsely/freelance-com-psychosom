interface TextMainProps {
    text : string
}

export default function TextMain(props : TextMainProps) {
    return (
        <p>{props.text}</p>
    )
}
