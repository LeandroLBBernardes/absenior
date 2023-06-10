import './styles.scss'
import { UserPerfil } from '../../../components/user-perfil';
import { CardMenuGroup } from './card-group-menu';
import { ICardMenuComponent } from '../../../interfaces/card-menu-props.interface';

import ImageCardActivity from '../../../assets/image-card-activity.png'
import ImageCardPratice from '../../../assets/image-card-pratice.png'
import ImageCardSupport from '../../../assets/image-card-support.png'
import ImageCardAchivemente from '../../../assets/image-card-achivement.png'
import ImageCardProgress from '../../../assets/image-card-progress.png'
import ImageCardTasks from '../../../assets/image-card-tasks.png'



export function MainMenu() {
  const listCard: Array<ICardMenuComponent> = [
    {image: ImageCardActivity, description: 'Atividades', color: '#B5CCFF', link:'../activity'},
    {image: ImageCardPratice, description: 'Praticar Escrita', color: '#FBFFC9', link:'../practice'},
    {image: ImageCardProgress, description: 'Progresso', color: '#FFCEDF', link:'../progress'},
    {image: ImageCardAchivemente, description: 'Conquistas', color: '#99BEA3', link:'../achievements'},
    {image: ImageCardTasks, description: 'Tarefas', color: '#E7AB76', link:'../homework'},
    {image: ImageCardSupport, description: 'Apoio ', color: '#E48888', link:'../../construction', externalLink: true}
  ];


  return (
    <div className='p-5 w-full min-h-screen main-menu-page'>
      <div className='flex flex-col bg-white rounded-3xl card-main-page p-6 md:px-5 md:pt-2 md:pb-5 lg:px-10 lg:pt-0 lg:pb-5 h-full'>

        <div className='flex flex-col justify-center items-center gap-3 md:flex-row md:justify-between md:gap-0 md:text-md lg:text-lg pt-8 pb-6'>
          <h1 className='text-2xl lg:text-3xl'>Menu Pricipal</h1>
          <UserPerfil />
        </div>

        <CardMenuGroup listCard={listCard} />
      </div>
    </div>
  );
}