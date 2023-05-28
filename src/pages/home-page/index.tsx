import { Outlet } from 'react-router-dom'
import './styles.scss'
import SideBar from '../../components/sidebar'

export function Home() {
    return(
        <div className='flex flex-col md:flex-row min-h-screen'>
            <SideBar />
            <Outlet />
        </div>
    )
}