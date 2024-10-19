import {navigations} from "../../../utils/!!!data-for-dev.ts";
import NavbarItem from "./NavbarItem/NavbarItem.tsx";

export default function Navbar() {

    return (
        <ul>
            {navigations.map((navigation) => (
                <NavbarItem key={navigation.id} link={navigation.link} >{navigation.name}</NavbarItem>
            ))}
        </ul>
    )
}
