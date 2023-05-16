import { Outlet } from 'react-router-dom'
import './styles.scss'

export function Home() {
    return(
        <>
            <Outlet />
        </>
    )
}