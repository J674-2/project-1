import { useUser } from '../providers/UserProvider';

import { memo } from 'react';

import { useNavigate } from 'react-router';

import { useState } from 'react';

import FailedSubmissionError from '../form_errors/FailedSubmissionError';


const PageHeading = memo(function PageHeading({heading}) {

    const navigate = useNavigate() 

    const [user, setUser] = useUser()

    const [error, setError] = useState(false) 
    
    function logOut(e) {
        e.preventDefault()
        fetch("/api/auth/logout/", {method: "POST", credentials: "include"})
        .then( response => {
            if (response.ok) {
                navigate("/")
                setUser("")
                setUserId("")
                setError(false)
            } else if (response.status = 401) {
                navigate("/")
                setUser("")
                setUserId("")
                setError(false)
            } else {
                throw new Error()
            }
        }) 
        .catch(error => {
            setError(true)
        })
    }

    return (
        <>
        <div className="flex justify-center">
            <h1 className="mt-8 mb-10">{heading}</h1>
        </div>
        {user && heading != "Log In" ? 
            <form className="m-0 mb-10 p-0 border-none" aria-errormessage="log-out-form-error" onSubmit={logOut}>
                <div className="flex justify-center">
                    <button className="p-1.5" type="submit">Log out</button>
                </div>

                <div id="log-out-form-error" className="m-0 not-empty:mt-6 text-center" aria-live="polite">
                    <FailedSubmissionError error={error} actionName="Logging out" />
                </div>
            </form> :
        null}
        </>
    )
})

export default PageHeading
