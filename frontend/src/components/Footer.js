import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <footer className='w-full flex flex-col items-center'>
            <section className='flex gap-2'>
                <a href='https://www.linkedin.com/in/chasang/'>
                    <LinkedInIcon />
                </a>
                <a href='https://github.com/ChasangBhutia'>
                    <GitHubIcon />
                </a>
            </section>
            <p className='text-[15px] mt-2 text-zinc-600'>©CBT-{new Date().getFullYear()}-By@Chasang</p>
        </footer>
    )
}