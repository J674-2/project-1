import PageHeading from './headings/PageHeading';
import RequiredError from "./form_errors/RequiredError";
import UsernameTakenError from "./form_errors/username_errors/UsernameTakenError";
import PasswordCommonError from './form_errors/password_errors/PasswordCommonError';
import PasswordCharactersError from './form_errors/password_errors/PasswordCharactersError';
import MinPasswordLengthError from './form_errors/password_errors/MinPasswordLengthError';
import PasswordMismatchError from './form_errors/password_errors/PasswordMismatchError';
import MaxLengthError from './form_errors/MaxLengthError';
import FailedSubmissionError from './form_errors/FailedSubmissionError';

import { useUser } from './providers/UserProvider';

import { useAccountDeleted } from './providers/AccountDeletedProvider';

import { useNavigate } from 'react-router';

import { useState } from 'react';

import reactLogo from './images/reactlogo.jpg';


function headTags() {
    return (
        <>
        <title>My App: Create User</title>
        <meta 
            name="description" 
            content={"This is the create user page of my portfolio project. " +
            "Here you will be able to create a user account."}
        />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={reactLogo}/>
        <meta property="og:title" content="My App: Create User"/>
        <meta property="og:url" content="<production-url>"/> 
    </>
    )
}


export default function CreateUser() {
    
    const [user] = useUser()

    const [, setIsDeleted] = useAccountDeleted()

    const navigate = useNavigate()

    const [touch, setTouch] = useState({password1: false, password2: false, username: false}) 

    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [usernameTaken, setUsernameTaken] = useState(false)
    const [passwordCommon, setPasswordCommon] = useState(false)

    const [error, setError] = useState(false)

    function isUsernameInvalid() {
        if (touch.username == true) {
            if (username == "") {
                return true
            } else if (username.length > 15) {
                return true
            } else if (usernameTaken) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function isPassword1Invalid() {
        if (touch.password1 == true) {
            if (password1 == "") {
                return true
            } else if (password1.length < 8) {
                return true
            } else if (password1.length > 20) {
                return true
            } else if ((/^[0-9]+$/.test(password1))) {
                return true 
            } else if (passwordCommon) {
                return true 
            } else {
                return false
            } 
        } else {
            return false
        }
    }

    function arePasswordsMismatched() {
        return (password1 !== password2 && touch.password1 == true)
    }

    function isPassword2Invalid() {
        if (touch.password2 == true) {
            if (password2 == "") {
                return true
            } else if (arePasswordsMismatched()) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const untouchedEmptyFields = username == "" || password1 == "" || password2 == ""
    
    function handleSubmit(e) {
        e.preventDefault()
        setTouch({password1: true, password2: true, username: true})
        if (!isPassword1Invalid() && !isPassword2Invalid() && !isUsernameInvalid() && !untouchedEmptyFields) {
            fetch("/api/auth/registration/", {method: "POST", body: new URLSearchParams({username: username, password1: password1, password2: password2})})
            .then(response => {
                if (response.ok) {
                    setIsDeleted(false)
                    navigate("/log-in")
                } else if (response.status == "400") {
                    response.json()
                    .then(data => {
                        if (data.username?.[0] == "A user with that username already exists.") {
                            setUsernameTaken(true)
                        } else if (data.password1?.[0] == "This password is too common.") {
                            setPasswordCommon(true)
                        } else {
                            throw new Error()
                        }
                    }) 
                } else {
                    throw new Error()
                }
            })
            .catch(error => {
                setError(true)
            })
        }
    }

    return (
        <>
        {headTags()}

        <PageHeading heading="Create User" />
        
        <div className="mb-10 sm:flex sm:justify-center ">
            <form className="sm:px-20" aria-errormessage="create-user-form-error" onSubmit={handleSubmit} noValidate>
                <label htmlFor="username">Username:</label>
                <input 
                    required id="username" type="text" autoComplete="off"
                    aria-invalid={isUsernameInvalid()} aria-errormessage="username-errors" 
                    value={username} onChange={(e) => {setUsername(e.target.value); setTouch({...touch, username: false}); setUsernameTaken(false); setError(false)}} 
                    onBlur={() => setTouch({...touch, username: true})}
                />
                <ul id="username-errors" className="errors-container" aria-live="polite">
                    <RequiredError touch={touch.username} field={username} fieldName="Username" />
                    <MaxLengthError touch={touch.username} field={username} limit={15} />
                    <UsernameTakenError touch={touch.username} taken={usernameTaken} />
                </ul>

                <label htmlFor="password1">Password:</label>
                <input 
                    required id="password1" type="password" autoComplete="off"
                    aria-invalid={isPassword1Invalid()} aria-errormessage="password1-errors" 
                    value={password1} onChange={(e) => {setPassword1(e.target.value); setTouch({...touch, password1: false}); setPasswordCommon(false); setError(false)}} 
                    onBlur={() => setTouch({...touch, password1: true})}
                />
                <ul id="password1-errors" className="errors-container" aria-live="polite">
                    <RequiredError touch={touch.password1} field={password1} fieldName="Password" />
                    <MinPasswordLengthError touch={touch.password1} password1={password1} />
                    <MaxLengthError touch={touch.password1} field={password1} limit={20} />
                    <PasswordCharactersError touch={touch.password1} password1={password1} />
                    <PasswordCommonError touch={touch.password1} common={passwordCommon} />
                </ul>
                    
                <label htmlFor="password2">Re-enter password:</label>
                <input 
                    required id="password2" type="password" 
                    aria-invalid={isPassword2Invalid()} aria-errormessage="password2-errors" autoComplete="off"
                    value={password2} onChange={(e) => {setPassword2(e.target.value); setTouch({...touch, password2: false})}} 
                    onBlur={() => setTouch({...touch, password2: true})}
                />
                <ul id="password2-errors" className="errors-container" aria-live="polite">
                    <RequiredError touch={touch.password2} field={password2} fieldName="Re-entering of password" />
                    <PasswordMismatchError touch={touch.password2} mismatch={arePasswordsMismatched()} />
                </ul>

                <div id="create-user-form-error" className="m-0 not-empty:mb-6 text-center" aria-live="polite">
                    <FailedSubmissionError error={error} actionName="Creating user" />
                </div>

                <div className="flex justify-center">
                    <button className="mt-2 mb-1" type="submit">Create user</button>
                </div>
            </form>
        </div>
        </>
    )
}