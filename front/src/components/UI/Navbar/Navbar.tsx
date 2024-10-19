import {navigations} from "../../../utils/!!!data-for-dev.ts";
import NavbarItem from "./NavbarItem/NavbarItem.tsx";

export default function Navbar() {

    return (
        <ul>
            {navigations.map((navigation) => (
                <NavbarItem name={navigation.name} link={navigation.link} />
            ))}
        </ul>
    )
}
