import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard, MdHome, MdSettings } from "react-icons/md";
import { FaDoorOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/users-service/users-supabase";
import Swal from "sweetalert2";

export default function SideBar() {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const menus = [
        { name: "Home", link: "../home", icon: MdHome },
        { name: "Menu", link: "../home/menu", icon: MdDashboard },
        { name: "Perfil", link: "../home/settings", icon: MdSettings },
        { name: "Sair", link: "#", icon: FaDoorOpen, click: () => {logoutSystem()}}
    ];

    const logoutSystem = (): void => {
        alertUser();
    }

    const alertUser = (): void => {
        Swal.fire({
            title: 'Você tem certeza disso?',
            text: "Ao clicar em sair, você será redirecionado para a tela de login",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#508E92',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero deslogar!',
            cancelButtonText: 'Não, não quero deslogar!'
          }).then((result) => {
            if (result.isConfirmed) {
                logoutAndRedirect();
            }
          })
    }

    const logoutAndRedirect = (): void => {
        logoutUser();
        sucessAlert();
        returnToMainPage();
    }

    const sucessAlert = (): void => {
        Swal.fire(
            'Deslogado!',
            'Você retornará para tela de login',
            'success'
        )
    }

    const returnToMainPage = (): void => {
        setTimeout(() => {
            navigate('/');
        }, 1300);
    }

    return (
        <div className={`bg-absenior-orange h-14 md:min-h-screen w-full ${open ? "md:w-52" : "md:w-20"} duration-0 md:duration-500 text-white pb-0 md:pb-4
        flex flex-row md:flex-col justify-center md:justify-between sticky top-0 z-50 gap-5 md:gap-0`}>
            <div className="flex flex-row md:flex-col relative text-white">
                <div className="py-0 md:py-3 flex justify-end px-0 md:px-4">
                    <HiMenuAlt3
                        size={32}
                        className="cursor-pointer hidden md:block" 
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="flex flex-row items-center gap-5 md:gap-0 md:flex-col md:items-stretch relative text-white">   
                    {menus?.map((menu, i) => (
                    i < 2 && 
                    <Link
                        to={menu?.link}
                        key={i}
                        className="mt-0 md:mt-5 group flex text-sm font-medium p-0 md:p-2 md:hover:bg-absenior-orange-hover text-white delay-0 md:delay-100"
                    >
                        <div className="px-0 md:px-4 font-bold">{React.createElement(menu?.icon, { size: "28"})}</div>
                        <h2
                        style={{
                            transitionDelay: `100ms`
                        }}
                        className={`flex flex-col justify-items-center whitespace-pre duration-0 md:duration-500 text-sm justify-center
                        ${!open && "opacity-0 overflow-hidden text-center text-sm"} hidden invisible md:visible md:flex`}
                        >
                        {menu?.name}
                        </h2>
                        <h2
                        className={`${open && "md:hidden"} 
                                absolute left-18 bg-white font-semibold whitespace-pre
                                text-absenior-background rounded-md drop-shadow-lg 
                                px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                                group-hover:py-1 group-hover:left-24 group-hover:duration-100 
                                group-hover:w-fit hidden md:flex`}
                        >
                        {menu?.name}
                        </h2>
                    </Link>
                    ))}
                </div>
            </div>
            
            <div className="flex flex-row items-start gap-5 md:gap-0 md:flex-col md:items-stretch relative text-white">   
                {menus?.map((menu, i) => (
                    i >= 2 && 
                    <Link
                    to={menu?.link}
                    key={i}
                    className="mt-3 md:mt-5 group flex text-sm font-medium p-0 md:p-2 md:hover:bg-absenior-orange-hover text-white delay-0 md:delay-100"
                    >
                    <div className="px-0 md:px-4 font-bold" onClick={menu?.click && menu?.click }>{React.createElement(menu?.icon, { size: "28"})}</div>
                    <h2
                        style={{
                        transitionDelay: `100ms`
                        }}
                        className={`flex flex-col justify-items-center whitespace-pre duration-0 md:duration-500 text-sm justify-center
                        ${!open && "opacity-0 overflow-hidden text-center text-sm"} hidden invisible md:visible md:flex`}
                    >
                        {menu?.name}
                    </h2>
                    <h2
                        className={`${open && "md:hidden"} 
                            absolute left-18 bg-white font-semibold whitespace-pre
                            text-absenior-background rounded-md drop-shadow-lg 
                            px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                            group-hover:py-1 group-hover:left-24 group-hover:duration-100 
                            group-hover:w-fit hidden md:flex`}
                    >
                        {menu?.name}
                    </h2>
                    </Link>
                ))}
            </div>
            
        </div>
    );
};