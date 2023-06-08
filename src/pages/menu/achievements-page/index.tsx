import './styles.scss'
import { AchievementsCards } from './achievementes-card-component';
import { InsigniasTable } from './achievements-table';
import { HeaderMenuPageComponent } from '../../../components/header-menu-pages';

export function AchievementsPage() {
    return(
        <div className='p-5 w-full min-h-screen achievements-page'>
            <div className='flex flex-col bg-white rounded-3xl card-achievements-page p-6 md:px-5 md:pt-2 md:pb-5 lg:px-10 lg:pt-0 lg:pb-5 h-full'>

                <HeaderMenuPageComponent 
                    title="Conquistas"
                />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 lg:gap-0 h-full w-full'>

                    <InsigniasTable />

                    <div className='grid place-items-center grid-cols-12 w-full h-full'>
                        <AchievementsCards />
                    </div>
                </div>

            </div>
        </div>
    );
}