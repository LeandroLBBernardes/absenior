import { ICardMenuComponent } from "../../../../interfaces/card-menu-props.interface";
import { CardMenuComponent } from "../card-component-menu";

export function CardMenuGroup({listCard}: any) {
  return(
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-rows-6 lg:grid-cols-3 row-span-5 md:gap-6 lg:gap-10 h-full'>
      {listCard?.map((card: ICardMenuComponent, index: number) => (
          <CardMenuComponent
            key={index} 
            color={card.color}
            image={card.image}
            description={card.description}
            link={card.link}
            externalLink={card.externalLink}
          />
      ))}
    </div>
  )
}