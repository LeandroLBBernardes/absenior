import { LoadingAnimation } from '../../components/loading-animation';
import './style.scss'

export function LoadingPage() {
  return(
    <>
      <div className='grid grid-cols-1 w-full loading-page h-screen'>
        <div className='w-full flex flex-col justify-center text-center items-center'>
          <div className='animation'><LoadingAnimation /></div>
          <h1>Carregando...</h1>
        </div>
      </div>
      
    </>
  );
}