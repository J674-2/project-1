import HeaderLink from './HeaderLink';

import reactLogo from '../../assets/images/react.svg';

import { useUser } from '../providers/UserProvider';

export default function Header() {

    const [user] = useUser()

    return (
        <header className="border-b-2 flex items-stretch">
            <div id="top" className="p-3 bg-sky-700 flex flex-1 justify-center">
                <img src={reactLogo} alt="React logo"/>
            </div>
            <nav className="flex-4 flex">
                <ul className="flex-1 flex">
                    <HeaderLink to="/" page="Home"/>
                    <HeaderLink to="/menu" page="Menu"/>
                    <HeaderLink to="/to-dos" page="To-Dos"/>
                    { user ? <HeaderLink to="/account" page="Account"/> : <HeaderLink to="/log-in" page="Log In"/>}
                </ul>
            </nav>
        </header>
    )
}
