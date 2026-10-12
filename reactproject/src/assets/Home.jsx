import PageHeading from './headings/PageHeading';
import HomeCard from './home/HomeCard';

import ToBottom from './scroll_buttons/ToBottom';
import ToTop from './scroll_buttons/ToTop';

import { useAccountDeleted } from './providers/AccountDeletedProvider';

import reactLogo from './images/reactlogo.jpg';


function headTags() {

    return (
        <>
        <title>My App: Home</title>
        <meta 
            name="description" 
            content={"This is the home page of my portfolio project. " +
            "Here you will find a description of the different parts of the project, as well as links to them."}
        />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={reactLogo}/>
        <meta property="og:title" content="My App: Home"/>
        <meta property="og:url" content="<production-url>"/>
    </>
    )
}

export default function Home() {

    const [isDeleted] = useAccountDeleted()

    return (
        <>
        {headTags()}

        <ToBottom />
        
        <PageHeading heading="Home"/>
        
        {isDeleted && <div className="mb-10 flex justify-center" aria-live="polite"><p className='mt-4 text-green-600'>Your account has been deleted.</p></div>}
        
        <div className="mb-10 grid grid-cols-1 grid-rows-3 gap-8 lg:gap-16 sm:grid-cols-4 sm:grid-rows-2">
            <HomeCard 
                content="On the Menu page you can edit which food items are displayed in the menu." 
                link="menu" page="Menu" 
                cs="sm:col-start-1" rs="sm:row-start-1" 
            />
            <HomeCard 
                content="On the To-Dos page you can edit a to-do list which will be saved into a database, allowing you to access it anytime you are logged in." 
                link="to-dos" page="To-Dos" 
                cs="sm:col-start-3" rs="sm:row-start-1" 
            />
            <HomeCard 
                content="Go to the Log In page or to the Create User page. Once logged in, you can create your to-do list on the To-Dos page." 
                link="log-in" page="Log In" 
                cs="sm:col-start-2" rs="sm:row-start-2" 
            />
        </div>
        
        <ToTop />
        </>
    )
}
