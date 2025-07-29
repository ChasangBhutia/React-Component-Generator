import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

export default function NavMenu({email}){
    const router = useRouter();
    const {logout} = useAuthContext();
    return(
        <section className="flex flex-col text-left bg-zinc-800 fixed right-10 top-[60px] p-3 pt-0 justify-between rounded-xl">
            <p className="h-10 flex items-center w-full gap-1 text-gray-400"><AccountCircleOutlinedIcon/>{email}</p>
            <button className="h-10 flex items-center w-full hover:bg-zinc-600 rounded-xl px-2 gap-2" onClick={()=>{router.push('/login')}}><SwapHorizIcon/> Switch User</button>
            <button className="h-10 flex items-center w-full hover:bg-zinc-600 rounded-xl px-2 gap-2" onClick={logout}><LogoutOutlinedIcon/>log out</button>
        </section>
    )
}