import { useAuthContext } from "@/context/AuthContext"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NavMenu from "./NavMenu";
import { useState } from "react";

export default function Navbar() {
    const { user } = useAuthContext();
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <nav className="flex justify-between items-center px-10 text-white h-[8vh] border-b border-zinc-800">
            <h1>CTB</h1>
            <aside className="flex items-center gap-3">
                <button className="bg-zinc-800 px-3 py-2 rounded-3xl">{user.fullname}</button>
                <section>
                    <button onClick={()=>setOpenMenu(!openMenu)}><MoreHorizIcon /></button>
                    <section className={`${openMenu ? 'block' : 'hidden'}`}>
                    <NavMenu email={user.email}/>
                    </section>
                </section>
            </aside>
        </nav>
    )
}