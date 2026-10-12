import PageHeading from './headings/PageHeading';
import MenuItems from './menu/menu_items/MenuItems';
import MenuForms from './menu/menu_forms/MenuForms';

import ToBottom from './scroll_buttons/ToBottom';
import ToTop from './scroll_buttons/ToTop';

import reactLogo from './images/reactlogo.jpg';


function headTags() {
    return (
        <>
        <title>My App: Menu</title>
        <meta 
            name="description" 
            content={"This is the menu page of my portfolio project. " +
            "Here you can edit a menu of food items."}
        />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={reactLogo}/>
        <meta property="og:title" content="My App: Menu"/>
        <meta property="og:url" content="<production-url>"/> 
    </>
    )
}


export default function Menu() {

    return (
        <>
        {headTags()}

        <ToBottom />

        <PageHeading heading="Menu" />

        <div className='flex flex-col md:flex-none md:grid md:grid-cols-2 '>
            <div className='mb-10 flex-1 md:flex md:py-0 md:border-r-2 md:border-gray-400'>
                <MenuItems /> 
            </div>
                
            <div className='mb-10 flex-1'>      
                <MenuForms />
            </div> 
        </div>

        <ToTop />
        </>
    )
}
