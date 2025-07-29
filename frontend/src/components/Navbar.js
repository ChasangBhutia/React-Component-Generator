import { useAuthContext } from "@/context/AuthContext"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NavMenu from "./NavMenu";
import { useState } from "react";
import Hamburger from 'hamburger-react'

export default function Navbar({setOpenSideBar, openSideBar}) {
    const { user } = useAuthContext();
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <nav className="fixed w-full md:w-[calc(100%-300px)] lg:w-[80vw] z-97 bg-black flex justify-between items-center px-3 sm:px-10 text-white h-[8vh] border-b border-zinc-800">
            <section className="flex items-center">
            <button className={`${openSideBar ? 'fixed left-67 bg-zinc-900 rounded-xl z-99 ': ''} md:hidden `} onClick={()=>setOpenSideBar(prev => !prev)}><Hamburger/></button>
            <h1 className="text-2xl">CTB</h1>
            </section>
            <aside className="flex items-center gap-3">
                <button className="bg-zinc-800 px-3 py-2 rounded-3xl hidden sm:block">{user.fullname}</button>
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