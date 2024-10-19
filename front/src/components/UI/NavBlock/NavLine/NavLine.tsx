import { Link } from "react-scroll";

interface NavLineProps {
    name: string;
    link: string;
}

export default function NavLine(props : NavLineProps) {
    return (
        <li><Link to={props.link} smooth={true} duration={500}>{props.name}</Link></li>
    )
}
