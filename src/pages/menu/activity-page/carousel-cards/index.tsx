import './styles.scss'
import { CardActivity } from '../cards-activity';

export function ActivityCarousel({cardListPros}: any) {
    const initialCardList = cardListPros as Array<any>; 

    return(
        <div className='flex w-full activity-carousel lg:px-8 mb-3'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full pt-3'>
                {initialCardList?.map((card,index) => (
                    <CardActivity
                        key={index} 
                        title={card.title}
                        subTitle={card.subTitle}
                        imagem={card.imagem}
                        link={card.link}
                    />
                ))}
            </div>
        </div>
    );
}