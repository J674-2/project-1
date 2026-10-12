import { Link } from 'react-router';


function headTags() {
    return (
        <>
        <title>My App: Page Not Found</title>
    </>
    )
}


export default function NotFound() {
    return(
        <>
        {headTags()}

        <div className='h-full flex flex-col items-center justify-center'>
            <h1 className='mb-12 p-4 bg-red-300'>"Page not found!"</h1>
            <p className="text-center">"There is no page with this URL path. Please check and edit the URL entered or go to one of the links provided above."</p>
        </div>
        </>
    )
}
