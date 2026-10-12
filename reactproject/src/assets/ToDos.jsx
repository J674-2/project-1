import PageHeading from './headings/PageHeading';
import ToBottom from './scroll_buttons/ToBottom';
import ToTop from './scroll_buttons/ToTop';
import ToDoList from './to_dos/ToDoList';

import reactLogo from './images/reactlogo.jpg';


function headTags() {
    return (
        <>
        <title>My App: To-Dos</title> 
        <meta 
            name="description" 
            content={"This is the to-dos page of my portfolio project. Here you will be able to edit a to-do list, which will be saved to a database."}
        />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={reactLogo}/>
        <meta property="og:title" content="My App: To-Dos"/>
        <meta property="og:url" content="<production-url>"/> 
    </>
    )
}


export default function ToDos() {

    return (
        <>
        {headTags()}

        <ToBottom />

        <PageHeading heading="To-Dos" />

        <p className="text-center mt-8 mb-6">This is a to-do list. The to-dos you add will be saved to a database.</p>

        <ToDoList /> 
        
        <ToTop />
        </>
    )
}
