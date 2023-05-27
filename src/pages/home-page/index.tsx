import { Outlet } from 'react-router-dom'
import './styles.scss'
import SideBar from '../../components/sidebar'

export function Home() {
    return(
        <div className='flex'>
            <SideBar />

            <div className='p-5 w-full'>
                <Outlet />
            </div>
        </div>
    )
}