import SectionHeading from '../../headings/SectionHeading';
import MenuItemsSection from './MenuItemsSection';

import { useMenu } from '../../providers/MenuProvider';

export default function MenuItems() {

    const [menuItems] = useMenu()

    return (
        <>
        <section className='flex-1 flex flex-col md:pr-12 lg:pr-16'>
            <SectionHeading heading="Menu items"/>

            <div className='border-2 px-6 pb-10 flex-1 flex flex-col md:justify-evenly'>
                <MenuItemsSection course="Starters" items={menuItems.filter( item => item.course == "starter")} />
                <MenuItemsSection course="Mains" items={menuItems.filter( item => item.course == "main")} />
                <MenuItemsSection course="Desserts" items={menuItems.filter( item => item.course == "dessert")} />
            </div>
        </section>
        </>
    )
}
