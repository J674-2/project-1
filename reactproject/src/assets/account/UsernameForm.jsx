import { useState } from 'react';

import { memo } from 'react';

import { useUser } from '../providers/UserProvider';

import RequiredError from '../form_errors/RequiredError';
import MaxLengthError from '../form_errors/MaxLengthError';
import UsernameTakenError from '../form_errors/username_errors/UsernameTakenError';
import SameUsernameError from '../form_errors/username_errors/SameUsernameError';
import FailedSubmissionError from '../form_errors/FailedSubmissionError';

const UsernameForm = memo(function UsernameForm() {

    const [user, setUser] = useUser()

    const [username, setUsername] = useState(user) 

    const [touch, setTouch] = useState(false)

    const [error, setError] = useState(false)
    const [usernameTaken, setUsernameTaken] = useState(false)

    function isUsernameInvalid() {
        if (touch == true) {
            if (username == "") {
                return true
            } else if (username.length > 15) {
                return true
            } else if (username == user) {
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

    function updateUsername() {
        if (!isUsernameInvalid() && username != user) {
            fetch("/api/auth/user/", {method: "PATCH", credentials: "include", body: new URLSearchParams({username: username})})
            .then(function(response) {
                if (response.ok) {
                    setTouch(false)
                    setError(false)
                    setUsernameTaken(false)
                    setUser(username)
                    setUsername("")
                } else if (response.status == 401) {
                    fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                    .then(response => {
                        if (response.ok) {
                            updateUsername()
                        } else {
                            throw new Error() 
                        }
                    })
                } else if (response.status == "400") {
                    response.json()
                    .then(data => {
                        if (data.username?.[0] == "A user with that username already exists.") {
                            setError(false)
                            setUsernameTaken(true)
                        } else {
                            throw new Error()
                        }
                    })
                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                setError(true)
                setUsernameTaken(false)
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        setTouch(true)
        updateUsername()
    }

    return (
        <>
        <form className="sm:px-20" aria-errormessage="change-username-form-error" onSubmit={handleSubmit} noValidate>
            <label htmlFor="username">New username:</label>
            <input 
                required id="username" type="text" autoComplete="off"
                aria-invalid={isUsernameInvalid()} aria-errormessage="username-errors" 
                value={username} onChange={(e) => {setUsername(e.target.value); setTouch(false); setUsernameTaken(false); setError(false)}} 
                onBlur={() => setTouch(true)}
            />
            <ul id="username-errors" className="errors-container" aria-live="polite">
                <RequiredError touch={touch} field={username} fieldName="New username" />
                <MaxLengthError touch={touch} field={username} limit={15} />
                <SameUsernameError touch={touch} same={username == user} />
                <UsernameTakenError touch={touch} taken={usernameTaken} />
            </ul>

            <div id="change-username-form-error" className="m-0 not-empty:mb-6 text-center" aria-live="polite">
                <FailedSubmissionError error={error} actionName="Changing username" />
            </div>

            <div className="mt-2 mb-1 flex justify-center">
                <button type="submit">Submit</button>
            </div>
        </form>
        </>
    )
})

export default UsernameForm