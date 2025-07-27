import { useAuthContext } from "@/context/AuthContext"

export default function Navbar() {
    const { user } = useAuthContext();
    return (
        <nav className="flex justify-between items-center px-10 text-white h-[10vh] border-b border-zinc-800">
            <h1>CTB</h1>
            <aside>
                <button className="bg-zinc-800 p-3 rounded-3xl">{user.fullname}</button>
            </aside>
        </nav>
    )
}