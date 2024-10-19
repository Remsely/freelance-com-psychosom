import NavbarItem from "./NavbarItem/NavbarItem.tsx";
import {navigations} from "../../../assets/data.ts";

export default function Navbar() {

    return (
        <ul>
            {navigations.map((navigation) => (
                <NavbarItem key={navigation.id} link={navigation.link} >{navigation.name}</NavbarItem>
            ))}
        </ul>
    )
}
