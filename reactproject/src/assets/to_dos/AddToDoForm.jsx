import { useState } from 'react';

import { memo } from 'react';

import MaxLengthError from '../form_errors/MaxLengthError';
import RequiredError from '../form_errors/RequiredError';
import FailedSubmissionError from '../form_errors/FailedSubmissionError';

const AddToDoForm = memo(function AddToDoForm({fetchUpdatedToDos}) {

    const [touch, setTouch] = useState(false)
    const [toDo, setToDo] = useState("")
    const [error, setError] = useState(false)

    function isToDoInvalid() {
        if (touch == true) {
            if (toDo == "") {
                return true
            } else if (toDo.length > 16) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function addToDo() {
        if (!isToDoInvalid() && toDo != "") {
            fetch("/api/to-dos", {method: "POST", credentials: "include", body: new URLSearchParams({text: toDo})})
            .then(response => {
                if (response.ok) {
                    setTouch(false)
                    setToDo("")
                    setError(false)
                    fetchUpdatedToDos()
                } else if (response.status == 401) {
                    fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                    .then(response => {
                        if (response.ok) {
                            addToDo()
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

    function handleSubmit(e) {
        e.preventDefault()
        setTouch(true)
        addToDo()
    }

    return (

        <div className='flex justify-center'>
            <form aria-errormessage='add-to-do-form-error' className="flex flex-col items-center max-w-125 md:px-20 border-none" onSubmit={handleSubmit} noValidate>
                <label htmlFor="add-todo">Add to-do:</label>
                <input 
                    required type="text" id="add-todo" autoComplete="off"
                    aria-invalid={isToDoInvalid()} aria-errormessage="add-todo-errors" 
                    value={toDo} onChange={(e) => {setToDo(e.target.value); setTouch(false); setError(false)}} 
                    onBlur={() => setTouch(true)}
                />
                <ul id="add-todo-errors" className="errors-container" aria-live="polite">
                    <RequiredError touch={touch} field={toDo} fieldName="To-do"/>
                    <MaxLengthError touch={touch} field={toDo} limit={16} />
                </ul>

                <div id="add-to-do-form-error" className="errors-container text-center m-0 not-empty:mb-6" aria-live="polite">
                    <FailedSubmissionError error={error} actionName="Adding to-do" />
                </div>

                <div className="flex justify-center">
                    <button className="mt-2 mb-1" type="submit">Add to-do</button>
                </div>
            </form>
        </div>
    )
})

export default AddToDoForm