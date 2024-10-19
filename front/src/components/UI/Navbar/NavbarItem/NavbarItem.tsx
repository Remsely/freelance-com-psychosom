import { Link } from "react-scroll";

interface NavbarItemProps {
    name: string;
    link: string;
}

export default function NavbarItem(props : NavbarItemProps) {
    return (
        <li><Link to={props.link} smooth={true} duration={500}>{props.name}</Link></li>
    )
}
