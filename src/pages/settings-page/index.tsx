import { Link, Outlet, useLocation } from 'react-router-dom';
import './styles.scss'
import React, { useState } from 'react';
import { ImVolumeHigh } from "react-icons/im"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { textToSpeech } from './utils';
import { ptBr } from '../../config/i18n/generals-pt-br';

export default function Settings() {
  const location = useLocation();
  const pathName: string = location.pathname;

  const initialButtonGroup = [
    {id: 0, icon: FaUserAlt, text: 'Perfil', isDisable: pathName.includes('password') ? true : false, page: '../settings'},
    {id: 1, icon: FaLock, text: 'Senha', isDisable: pathName.includes('password') ? false : true, page:  '../settings/password'}
  ];

  const [buttonGroup, setButtonGroup] = useState(initialButtonGroup);

  const setVisibleButtons = (index: number): any => {
    const nextGroupButton = buttonGroup.map((button, idButton) => {
        let isDisable: boolean = false;

        if(idButton != index)
            isDisable = true;
        
        return {
            id: button.id,
            icon: button.icon,
            text: button.text,
            isDisable: isDisable,
            page: button.page
        }
    });

    setButtonGroup(nextGroupButton);
  }

  return(
    <div className='p-5 md:py-3 lg:py-5 w-full'>
      <div className='w-full min-h-full bg-white rounded-3xl card-settings'>
        <div className='p-8 md:py-3 md:px-10 lg:py-12 lg:px-16 flex flex-col md:flex-row items-center w-full gap-6'>
          <div className='flex items-center gap-3'>
            <h1 className='p-0'>Ajustes</h1>
            <span className="md:hidden" onClick={() => textToSpeech(ptBr.settingsPage_Text)}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
          </div>

          <div className="inline-flex rounded-md shadow-sm" role="group">
            {buttonGroup?.map((button,index) => (
              index != 1 ?
                <Link
                  to={button.page}
                  key={index} 
                  type="button" 
                  className={`px-4 py-2 text-md font-medium ${button.isDisable ? "isDisable" : "notDisable"} rounded-l-lg flex justify-center items-center gap-2 profile-button`}
                  onClick={() => setVisibleButtons(button.id)}
                >
                  {React.createElement(button.icon)}{button.text}
                </Link> : 
                <Link
                  to={button.page}
                  key={index}  
                  type="button" 
                  className={`px-4 py-2 text-md font-medium ${button.isDisable ? "isDisable" : "notDisable"} border rounded-r-lg flex justify-center items-center gap-2 profile-button`}
                  onClick={() => setVisibleButtons(button.id)}
                >
                  {React.createElement(button.icon)}{button.text}
                </Link>
            ))}
          </div>

          <span className="hidden md:block" onClick={() => textToSpeech(ptBr.settingsPage_Text)}>{React.createElement(ImVolumeHigh, { size: "28"})}</span>
        </div>
        <div className='h-full row-span-auto'>
          <hr className='shadow-sm' />
          <div className='p-8 md:py-6 md:px-10 lg:py-6 lg:px-16 2xl:py-20 teste h-full'>
            <Outlet />
          </div>
        </div>
        
      </div>
    </div>
  );
}