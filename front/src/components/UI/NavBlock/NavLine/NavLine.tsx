interface NavLineProps {
    name: string;
    link: string;
}

export default function NavLine(props : NavLineProps) {
    return (
        <li><a href={`#${props.link}`}>{props.name}</a></li>
    )
}
