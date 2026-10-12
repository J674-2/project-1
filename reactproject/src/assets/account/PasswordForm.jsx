import { useState } from 'react';

import { memo } from 'react';

import RequiredError from '../form_errors/RequiredError';
import MinPasswordLengthError from '../form_errors/password_errors/MinPasswordLengthError';
import MaxLengthError from '../form_errors/MaxLengthError';
import PasswordCharactersError from '../form_errors/password_errors/PasswordCharactersError';
import PasswordCommonError from '../form_errors/password_errors/PasswordCommonError';
import PasswordMismatchError from '../form_errors/password_errors/PasswordMismatchError';
import FailedSubmissionError from '../form_errors/FailedSubmissionError';

const PasswordForm = memo(function PasswordForm() {

    const [touch, setTouch] = useState({password1: false, password2: false}) 

    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [success, setSuccess] = useState(false)

    const [passwordCommon, setPasswordCommon] = useState(false)
    const [error, setError] = useState(false)

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

    function resetForm() {
        setPassword1("")
        setPassword2("")
        setTouch({password1: false, password2: false})
    }

    const untouchedEmptyFields = password1 == "" || password2 == ""

    function updatePassword() {
        if (!isPassword1Invalid() && !isPassword2Invalid() && !untouchedEmptyFields) {
            fetch("/api/auth/password/change/", {method: "POST", credentials: "include", body: new URLSearchParams({new_password1: password1, new_password2: password2})})
            .then(function(response) {
                if (response.ok) {
                    resetForm()
                    setSuccess(true)
                    setPasswordCommon(false)
                    setError(false)
                } else if (response.status == 401) {
                    fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                    .then(response => {
                        if (response.ok) {
                            updatePassword()
                        } else {
                            throw new Error() 
                        }
                    })
                } else if (response.status == "400") {
                    response.json()
                    .then(data => {
                        if (data.new_password2?.[0] == "This password is too common.") {
                            setSuccess(false)
                            setPasswordCommon(true)
                            setError(false)
                        } else {
                            throw new Error()
                        }
                    }) 
                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                setSuccess(false)
                setPasswordCommon(false)
                setError(true)
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        setTouch({password1: true, password2: true})
        updatePassword()
    }

    return (
        <>
        <form className="sm:px-20" aria-describedby="change-password-success" aria-errormessage="change-password-form-error" onSubmit={handleSubmit} noValidate>
            <label htmlFor="password1">New password:</label>
            <input 
                required id="password1" type="password" autoComplete="off"
                aria-invalid={isPassword1Invalid()} aria-errormessage="password1-errors" 
                value={password1} onChange={(e) => {setPassword1(e.target.value); setTouch({...touch, password1: false}); setPasswordCommon(false); setSuccess(false); setError(false)}} 
                onBlur={() => setTouch({...touch, password1: true})}
            />
            <ul id="password1-errors" className="errors-container" aria-live="polite">
                <RequiredError touch={touch.password1} field={password1} fieldName="New password" />
                <MinPasswordLengthError touch={touch.password1} password1={password1} />
                <MaxLengthError touch={touch.password1} field={password1} limit={20} />
                <PasswordCharactersError touch={touch.password1} password1={password1} />
                <PasswordCommonError touch={touch.password1} common={passwordCommon} />
            </ul>
                                
            <label htmlFor="password2">Re-enter new password:</label>
            <input 
                required id="password2" type="password" autoComplete="off"
                aria-invalid={isPassword2Invalid()} aria-errormessage="password2-errors" 
                value={password2} onChange={(e) => {setPassword2(e.target.value); setTouch({...touch, password2: false}); setSuccess(false); setError(false)}} 
                onBlur={() => setTouch({...touch, password2: true})}
            />
            <ul id="password2-errors" className="errors-container" aria-live="polite">
                <RequiredError touch={touch.password2} field={password2} fieldName="Re-entering of new password" />
                <PasswordMismatchError touch={touch.password2} mismatch={arePasswordsMismatched()} />
            </ul>

            <div id="change-password-form-error" className="m-0 not-empty:mb-6 text-center" aria-live="polite">
                <FailedSubmissionError error={error} actionName="Changing password" />
            </div>

            <div className="mt-2 mb-1 flex justify-center">
                <button type="submit">Submit</button>
            </div>

            {
            success && 
            <div id="change-password-success" className='mt-4 text-green-600' aria-live="polite">      
                <div className="flex justify-center text-center">
                    <p>Your password has been changed successfully.</p>
                </div>
            </div>
            }
        </form>
        </>
    )
})

export default PasswordForm