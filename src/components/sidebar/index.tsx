import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard, MdHome, MdSettings } from "react-icons/md";
import { FaDoorOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SideBar() {
  const menus = [
    { name: "Home", link: "/", icon: MdHome },
    { name: "Menu Principal", link: "/", icon: MdDashboard },
    { name: "Perfil", link: "/", icon: MdSettings },
    { name: "Sair", link: "/", icon: FaDoorOpen }
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-absenior-orange min-h-screen ${open ? "w-52" : "w-20"} duration-500 text-white flex flex-col justify-between pb-6`}>
        <div className="flex flex-col relative text-white">
          <div className="py-3 flex justify-end px-4">
            <HiMenuAlt3
              size={32}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="flex flex-col relative text-white">   
            {menus?.map((menu, i) => (
              i < 2 && 
              <Link
                to={menu?.link}
                key={i}
                className="mt-5 group flex text-sm font-medium p-2 hover:bg-absenior-orange-hover text-white delay-100"
              >
                <div className="px-4 font-bold">{React.createElement(menu?.icon, { size: "28"})}</div>
                <h2
                  style={{
                    transitionDelay: `100ms`
                  }}
                  className={`flex flex-col justify-items-center whitespace-pre duration-500 text-sm justify-center
                  ${!open && "opacity-0 overflow-hidden text-center text-sm"}`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${open && "hidden"} 
                        absolute left-18 bg-white font-semibold whitespace-pre
                        text-absenior-background rounded-md drop-shadow-lg 
                        px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                        group-hover:py-1 group-hover:left-24 group-hover:duration-100 
                        group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
          
        <div className="flex flex-col relative text-white">   
          {menus?.map((menu, i) => (
            i >= 2 && 
            <Link
              to={menu?.link}
              key={i}
              className="mt-5 group flex text-sm font-medium p-2 hover:bg-absenior-orange-hover text-white delay-100"
            >
              <div className="px-4 font-bold">{React.createElement(menu?.icon, { size: "28"})}</div>
              <h2
                style={{
                  transitionDelay: `100ms`
                }}
                className={`flex flex-col justify-items-center whitespace-pre duration-500 text-sm justify-center
                ${!open && "opacity-0 overflow-hidden text-center text-sm"}`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"} 
                     absolute left-18 bg-white font-semibold whitespace-pre
                     text-absenior-background rounded-md drop-shadow-lg 
                     px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                     group-hover:py-1 group-hover:left-24 group-hover:duration-100 
                     group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
        
      </div>
  );
};