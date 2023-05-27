import { Outlet } from 'react-router-dom'
import './styles.scss'
import SideBar from '../../components/sidebar'

export function Home() {
    return(
        <section className='flex gap-5'>
            <SideBar />
            <Outlet />
        </section>
    )
}