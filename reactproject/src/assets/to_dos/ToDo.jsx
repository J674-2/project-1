import { useState } from 'react';

import { memo } from 'react';

import RequiredError from '../form_errors/RequiredError';
import MaxLengthError from '../form_errors/MaxLengthError';
import FailedSubmissionError from '../form_errors/FailedSubmissionError';

const ToDo = memo(function ToDo({toDoText, toDoId, fetchUpdatedToDos}) {

    const [edit, setEdit] = useState(false)
    const [touch, setTouch] = useState(false)
    const [editError, setEditError] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
    const [toDo, setToDo] = useState(toDoText) 
    
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

    function deleteToDo() {
        fetch(`/api/to-dos/${toDoId}`, {method: "DELETE", credentials: "include"})
        .then(response => {
            if (response.ok) {
                setDeleteError(false)
                fetchUpdatedToDos()
            } else if (response.status == 401) {
                    fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                    .then(response => {
                        if (response.ok) {
                            deleteToDo()
                        } else {
                            throw new Error() 
                        }
                    })
            } else {
                throw new Error()
            }
        })
        .catch(error => {
            setDeleteError(true)
        })
    }

    function handleDelete(e) {
        e.preventDefault()
        deleteToDo()
    }

    function editToDo() {
        if (!isToDoInvalid() && toDo != "") {
            fetch(`/api/to-dos/${toDoId}`, {method: "PATCH", credentials: "include", body : new URLSearchParams({text: toDo})})
            .then(response => {
                if (response.ok) {
                    setEdit(false)
                    setTouch(false)
                    setEditError(false)
                    fetchUpdatedToDos()
                } else if (response.status == 401) {
                    fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                    .then(response => {
                        if (response.ok) {
                            editToDo()
                        } else {
                            throw new Error() 
                        }
                    })
                } else {
                    throw new Error()
                }
            })
            .catch(error => {
                setEditError(true)
            })
        }
    }

    function handleEdit(e) {
        e.preventDefault()
        setTouch(true)
        editToDo()
    }

    function isEdit() {
        if (edit == false) {
            return (
                <>  
                    <div className="w-full flex gap-4 items-center">
                        <div className='flex-1 flex items-center'>
                            <p className="flex-1 text-center">{toDoText}</p>
                        </div>

                        <button className="p-1" type="button" onClick={() => {setEdit(true); setDeleteError(false)}}>Edit</button>

                        <form className="p-0 border-none" aria-errormessage="delete-to-do-form-error" onSubmit={handleDelete}>
                            <button className="p-1" type="submit">Delete</button>
                        </form>    
                    </div>

                    <div id="delete-to-do-form-error" className="m-0 mt-2" aria-live="polite">
                        <FailedSubmissionError error={deleteError} actionName="Deleting to-do" />
                    </div>
                </>
            )
        } else {
            return (
                <>
                <form 
                    className="w-full p-4 bg-gray-200 border-none flex flex-col items-center" 
                    aria-errormessage="edit-to-do-form-error"
                    onSubmit={handleEdit} noValidate
                >
                    <label htmlFor="edited-to-do">Edited to-do:</label>
                    <input 
                        required type="text" id="edited-to-do" autoComplete="off"
                        aria-invalid={isToDoInvalid()} aria-errormessage="edit-todo-errors" 
                        value={toDo} onChange={e => {setToDo(e.target.value); setTouch(false); setEditError(false)}} 
                        onBlur={() => setTouch(true)}
                    /> 
                    <ul id="edit-todo-errors" className="errors-container" aria-live="polite">
                        <RequiredError touch={touch} field={toDo} fieldName="To-do" />
                        <MaxLengthError touch={touch} field={toDo} limit={16} />
                    </ul>

                    <div className='flex justify-center gap-4'>
                        <div>
                            <button className="p-1" type="submit">Submit</button>
                        </div>

                        <div>
                            <button className="p-1" type="button" onClick={() => {setEdit(false); setEditError(false)}}>Cancel</button>
                        </div>
                    </div>

                    <div id="edit-to-do-form-error" className="m-0 mt-2" aria-live="polite">
                        <FailedSubmissionError error={editError} actionName="Editing to-do" />
                    </div>
                </form>

                
                </>
            )
        }
    }

    return (
        <>
        {isEdit()}
        </>
    )
})

export default ToDo