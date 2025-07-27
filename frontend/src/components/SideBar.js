import { useSessionContext } from "@/context/SessionContext";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import "./style.css"

export default function SideBar() {

    const { setSessionRefresh, allSessions, generateSession } = useSessionContext();

    const changeSession = (newSessionId) => {
        localStorage.setItem("sessionId", newSessionId);
        setSessionRefresh(prev => {
            return prev + 1
        })
    }

    return (
        <aside className="p-2 flex flex-col w-[20vw] h-screen bg-zinc-900">
            <nav className="flex justify-between h-[6vh] items-center mb-5 border-b border-zinc-700 py-5">
                <h1>Chats</h1>
                <span><ArrowCircleLeftIcon/></span>
            </nav>
            <section className="flex flex-col justify-between h-full">
                <section className="h-[80vh] flex flex-col gap-3 overflow-y-auto py-2">
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

                <button className="h-14 w-70 neon-btn" onClick={() => generateSession()}>New Chat</button>
            </section>
        </aside>
    )
}