import { useSessionContext } from "@/context/SessionContext";
import Footer from "./Footer";

export default function SideBar({openSideBar}) {

    const { setSessionRefresh, allSessions, generateSession } = useSessionContext();

    const changeSession = (newSessionId) => {
        localStorage.setItem("sessionId", newSessionId);
        setSessionRefresh(prev => {
            return prev + 1
        })
    }

    return (
        <aside className={`${openSideBar ? 'flex':'hidden'} fixed z-98 p-2 flex-col pb-12 w-70 lg:w-[20vw] h-full bg-zinc-900 md:flex`}>
            <nav className="flex justify-between h-[6vh] items-center mb-5 border-b border-zinc-700 py-5">
                <h1>Chats</h1>
            </nav>
            <section className="flex flex-col justify-between pb-5 h-full">
                <section className="h-[70%] flex flex-col gap-3 overflow-y-auto py-2">
                    {allSessions.map((item, index) => {
                        const id = localStorage.getItem("sessionId");
                        const isActive = item._id === id;
                        return (
                            <button
                                key={index}
                                className={`${isActive ? 'bg-zinc-700' : ' '} flex-shrink-0 w-full h-10 rounded hover:bg-zinc-800`}
                                onClick={() => changeSession(item._id)}
                            >
                                {item.chats.length > 0
                                    ? `${item.chats[0].prompt.slice(0, 30)}...`
                                    : 'New Chat'}
                            </button>
                        );
                    })}
                </section>

                <button className="h-14 w-full mx-auto bg-[#0a68d2] hover:bg-blue-900 rounded" onClick={() => generateSession()}>New Chat</button>
                <Footer/>
            </section>
        </aside>
    )
}