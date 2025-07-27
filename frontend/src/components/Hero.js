
import { useAuthContext } from "@/context/AuthContext"
import "./style.css"

export default function Hero() {

    const { user } = useAuthContext();
    const hours = new Date().getHours();
    
    let greet;
    if(hours>=0 && hours<=12) greet="Morning";
    else if(hours>12 && hours<=15) greet = "Afternoon";
    else if(hours>3 && hours<=17) greet = "Evening";
    else if(hours>5 && hours<=24) greet = "Night";
    

    return (
        <div className="h-full w-full">
            <h1 className="text-5xl mb-5 pl-5">Good {greet},</h1>
            <h1 className="text-5xl mb-20 text-white neon-text pl-5 neon-text-animated">{user.fullname}</h1>
            
            <h2 className="text-3xl mb-5">🚀Generate React Components Instantly with AI🚀</h2>
            <p className="text-lg">Describe your UI idea in plain English - get clean, ready-to-use React + CSS code in seconds.</p>
        </div>
    )
}