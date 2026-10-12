import PageHeading from './headings/PageHeading';
import RequiredError from './form_errors/RequiredError';
import IncorrectCredentialsError from './form_errors/IncorrectCredentialsError';
import FailedSubmissionError from './form_errors/FailedSubmissionError';

import { useState } from 'react';

import { useUser } from './providers/UserProvider';

import { useAccountDeleted } from './providers/AccountDeletedProvider';

import { useNavigate, Link } from 'react-router';

import reactLogo from './images/reactlogo.jpg';


function headTags() {
    return (
        <>
        <title>My App: Log In</title>
        <meta 
            name="description" 
            content={"This is the log-in page of my portfolio project. " +
            "Here you can log into your account."}
        />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={reactLogo}/>
        <meta property="og:title" content="My App: Log In"/>
        <meta property="og:url" content="<production-url>"/> 
    </>
    )
}


export default function LogIn() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [touch, setTouch] = useState({username: false, password: false})

    const [userNotFound, setUserNotFound] = useState(false)
    const [error, setError] = useState(false)

    const [user, setUser, , , setUserId] = useUser()

    const [, setIsDeleted] = useAccountDeleted()

    function handleSubmit(e) {
        e.preventDefault()
        setTouch({username: true, password: true})
        if (username != "" && password != "") {
            fetch(
                '/api/auth/login/', 
                {method: "POST", credentials: "include", body: new URLSearchParams({username: username, password: password})}
            )
            .then(response => {
                if (response.ok) { 
                    response.json()
                    .then(data => {
                        setIsDeleted(false)
                        setUserNotFound(false)
                        setError(false)
                        setUserId(data.user.pk)
                        setUser(username)
                        navigate("/")
                    })
                } else if (response.status == 400) {
                    setUserNotFound(true)
                    setError(false)
                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                setUserNotFound(false)
                setError(true)
            })
        }
    }


    return (
        <>
        {headTags()}

        <PageHeading heading="Log In"/>

        <div className="sm:flex sm:justify-center">
            <form className="sm:px-20" aria-errormessage="log-in-form-error" onSubmit={handleSubmit} noValidate>
                <label htmlFor="username">Username:</label>
                <input 
                    required id="username" type="text"
                    aria-invalid={touch.username && username == ""} aria-errormessage="username-error"
                    value={username} onChange={(e) => {setUsername(e.target.value); setTouch({...touch, username: false}); setUserNotFound(false); setError(false)}}
                    onBlur={() => setTouch({...touch, username: true})}
                />
                <ul id="username-error" className="errors-container" aria-live="polite">
                    <RequiredError touch={touch.username} field={username} fieldName="Username" />
                    <IncorrectCredentialsError userNotFound={userNotFound} />
                </ul>
                
                <label htmlFor="password">Password:</label>
                <input 
                    required id="password" type="password"
                    aria-invalid={touch.password && password == ""} aria-errormessage="password-error"
                    value={password} onChange={(e) => {setPassword(e.target.value); setTouch({...touch, password: false}); setUserNotFound(false); setError(false)}}
                    onBlur={() => setTouch({...touch, password: true})}
                />
                <ul id="password-error" className="errors-container" aria-live="polite">
                    <RequiredError touch={touch.password} field={password} fieldName="Password" />
                </ul>

                <div id="log-in-form-error" className="m-0 not-empty:mb-6 text-center" aria-live="polite">
                    <FailedSubmissionError error={error} actionName="Login" />
                </div>
                    
                <div className="mt-2 mb-1 flex justify-center">
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>

        <div className='mt-6 mb-10 text-xl flex justify-center'>
            <Link to="/create-user">Or create a user</Link>
        </div>
        </>
    )
}