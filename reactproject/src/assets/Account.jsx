import PageHeading from './headings/PageHeading';
import SectionHeading from './headings/SectionHeading';
import UsernameForm from './account/UsernameForm';
import PasswordForm from './account/PasswordForm';
import FailedSubmissionError from './form_errors/FailedSubmissionError';

import ToBottom from './scroll_buttons/ToBottom';
import ToTop from './scroll_buttons/ToTop';

import { useState } from 'react';

import { useUser } from './providers/UserProvider';
import { useAccountDeleted } from './providers/AccountDeletedProvider';

import { useNavigate } from 'react-router';

import reactLogo from './images/reactlogo.jpg';


function headTags() {
    return (
        <>
        <title>My App: Account</title>
        <meta 
            name="description" 
            content={"This is the account page of my portfolio project. " +
            "Here you will be able to change your username or password, as well as delete your account."}
        />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={reactLogo}/>
        <meta property="og:title" content="My App: Account"/>
        <meta property="og:url" content="<production-url>"/> 
        </>
    )
}


export default function Account({dialogRef}) {

    const [user, setUser, , userId, setUserId] = useUser()

    const [, setIsDeleted] = useAccountDeleted()
     
    const [form, setForm] = useState("username")

    const [confirm, setConfirm] = useState(false)

    const [error, setError] = useState(false)

    const navigate = useNavigate()

    function chooseForm() {
        if (form == "username") {
            return <UsernameForm />
        } else {
            return <PasswordForm />
        }
    }

    function deleteAccount() {
        fetch(`/api/user/${userId}`, {method: "DELETE", credentials: "include"})
        .then(response => {
            if (response.ok) {
                setUser("")
                setUserId("")
                setError(false)
                setIsDeleted(true)
                navigate("/")
            } else if (response.status == 401) {
                    fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                    .then(response => {
                        if (response.ok) {
                            deleteAccount()
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

    function handleDelete(e) {
        e.preventDefault()
        deleteAccount()
    }

    function content() {
        if (user) {
            return (
                <> 
                <ToBottom />

                <PageHeading heading="Account"/>

                <div className='mb-8 flex justify-center'>
                    <p>This is {user}'s account page.</p>
                </div>

                <div className='mb-8 flex justify-center text-center'>
                    <p>Here you are able to edit your username and password or delete your account.</p>
                </div>

                <SectionHeading heading="Edit account"/>

                <div className='mb-8 flex justify-center gap-4'>
                    <button className="p-2" disabled={form === "username"} onClick={() => setForm("username")}>Username form</button>
                    <button className="p-2" disabled={form === "password"} onClick={() => setForm("password")}>Password form</button>
                </div>
                <div className="mb-10 sm:mx-10 sm:flex sm:justify-center">
                    <div className='sm:w-125'>
                        {chooseForm()}
                    </div>
                </div>

                <SectionHeading heading="Delete account"/>

                <div className='mb-10 sm:mx-10 sm:flex sm:justify-center'>
                {
                confirm ? 
                <form className='sm:w-125' aria-errormessage="delete-user-form-error" onSubmit={handleDelete} noValidate>
                    <p className="text-center">Are you sure you want to delete your account?</p>
    
                    <div className="mt-6 flex justify-center gap-8">
                        <button type="button" onClick={() => {setConfirm(false); setError(false)}}>Cancel</button>
                        <button type="submit">Delete</button>
                    </div>

                    <div id="delete-user-form-error" className="m-0 not-empty:mt-6 text-center" aria-live="polite">
                        <FailedSubmissionError error={error} actionName="Deleting user" />
                    </div>
                </form>
                :
                <div className='flex justify-center'>
                    <button type="submit" onClick={() => setConfirm(true)}>Delete</button>
                </div>
                }
                </div>

                <ToTop />
                </>
            )
        } else {
            return (
                <> 
                <div className='h-[80%] flex flex-col '>
                    <PageHeading heading="Account"/>

                    <div className='flex-1 flex items-center justify-center'>
                        <p>Please log in to view this page.</p>
                    </div>
                </div>
                </>
            )
        }
    }

    return (
        <>
        {headTags()}

        {content()}
        </>
    )
}
