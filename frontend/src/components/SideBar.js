import useSessions from "@/hooks/useSessions"

export default function SideBar(){

    const {allSessions, generateSession} = useSessions();

    const changeSession = (sessionId)=>{
        localStorage.setItem("sessionId",sessionId);
        const id = localStorage.getItem("sessionId");
        alert(id);
    }

    return(
        <aside className="p-2 flex flex-col w-[20vw] h-screen bg-zinc-900">
            <nav className="flex justify-between h-10">
                <h1>CTB</h1>
                <span>Close</span>
            </nav>
            <section className="flex flex-col justify-between h-full">
                <h3 className="mb-3">Chats</h3>
                <section className="h-[80vh] flex flex-col gap-3 overflow-y-auto py-2">
                    {allSessions.map((item, index)=>{
                        return <button className="flex-shrink-0 w-full bg-zinc-700 h-10 rounded" key={index} onClick={()=>changeSession(item._id)}>{item.title}</button>
                    })}
                </section>
                <button className="bg-black h-14" onClick={()=>generateSession()}>New Chat</button>
            </section>
        </aside>
    )
}