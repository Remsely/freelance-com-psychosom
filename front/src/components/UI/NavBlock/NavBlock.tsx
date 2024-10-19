import {navigations} from "../../../utils/!!!data-for-dev.ts";
import NavLine from "./NavLine/NavLine.tsx";

export default function NavBlock() {
    return (
        <ul>
            {navigations.map((navigation) => (
                <NavLine name={navigation.name} link={navigation.link} />
            ))}
        </ul>
    )
}
