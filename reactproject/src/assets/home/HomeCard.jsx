import reactLogo from '../images/react.svg';

import { Link } from 'react-router';

import { useUser } from '../providers/UserProvider';

export default function HomeCard({content, link, page, cs, rs}) {

    const [user] = useUser()

    function isLoggedIn() {
        if (user && link == "log-in") {
            return (
                <>
                <div className="flex justify-center">
                    <h2 className="text-lg flex items-center">
                        <div className='underline hover:bg-gray-200'>
                            <Link to="account">Account</Link> 
                        </div>
                    </h2>
                </div>

                <p className="text-center">
                    The account page allows you to change your username or password, and allows you to delete your account.
                </p>
                <p className="text-center">
                    Or <Link className='underline hover:bg-gray-200' to="create-user">Create Another User</Link>.
                </p>
            </>
            )
        } else {
            return (
                <>
                <div className="flex justify-center">
                    <h2 className="text-lg flex items-center">
                        <div className='underline hover:bg-gray-200'>
                            <Link to={link}>{page}</Link> 
                        </div>
                        {link == "log-in" && <><div className='mx-2'>or</div><div className='underline hover:bg-gray-200'><Link to="create-user">Create User</Link></div></> }
                    </h2>
                </div>

                <p className="text-center">
                    {content} 
                </p>
                </>
            )
        }
    }

    return(
        <div className={`lg:first:ml-50 lg:nth-2:mr-50 lg:last:mx-25 p-6 border-2 ${cs} ${rs} sm:col-span-2 sm:row-span-1 flex flex-col items-center justify-start gap-4`}>
            <div className='p-4 bg-sky-100 flex justify-center'>
                <img src={reactLogo} alt="React logo"/>
            </div>
            {isLoggedIn()}
        </div>
    )
}

