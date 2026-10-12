import reactLogo from '../../assets/images/react.svg';

import FooterLink from './FooterLink';

import { useUser } from '../providers/UserProvider';

export default function Footer() {

    const [user] = useUser()

    return (
        <footer className='border-t-2 flex'>
            <div id="bottom" className='bg-sky-200 p-6 border-r-2 flex-1 flex justify-center'>
                <img src={reactLogo} alt="React logo"/>
            </div>
            <div className='p-6 flex-1 flex justify-center bg-gray-300'>
                <ul className="flex flex-col gap-1">
                    <FooterLink to="/" page="Home"/>
                    <FooterLink to="/menu" page="Menu"/>
                    <FooterLink to="/to-dos" page="To-Dos"/>
                    { user ? <FooterLink to="/account" page="Account"/> : <FooterLink to="/log-in" page="Log In"/>}
                </ul>
            </div>
        </footer>
    )
}

