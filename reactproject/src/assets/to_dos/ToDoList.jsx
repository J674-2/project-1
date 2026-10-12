import { useState, useEffect, useCallback } from 'react';

import SectionHeading from '../headings/SectionHeading';
import ToDo from './ToDo';
import PageChange from './PageChange';
import AddToDoForm from './AddToDoForm';
import ToDoMessage from './ToDoMessage';

import { useUser } from '../providers/UserProvider';

export default function ToDoList() {
    
    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const [toDos, setToDos] = useState([])
    const [toDoCount, setToDoCount] = useState(0)
    
    const [user] = useUser()
    
    useEffect(() => {
        let active = true

        function fetchToDos() {
            if (user) {
                fetch(`/api/to-dos?page=${page}`, {credentials: "include"})
                .then(response => {
                    if (active) {
                        if (response.ok) {
                            response.json()
                            .then(data => {
                                setLoading(false)
                                setError(false)
                                setToDos(data.results) 
                                setToDoCount(data.count)
                            })
                        } else if (response.status == 401) {
                            fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                            .then(response => {
                                if (response.ok) {
                                    fetchToDos()
                                } else {
                                    throw new Error() 
                                }
                            })
                        } else {
                            throw new Error()
                        }
                    }
                })
                .catch((error) => {
                    if (active) {
                        setLoading(false)
                        setError(true)
                        setToDos([]) 
                        setToDoCount(0)
                    }
                })
            } else {
                setLoading(false)
            }
        }

        fetchToDos()
        
        return () => {
            active = false
        }
    }, [user, page])


    const fetchUpdatedToDos = useCallback(() => {
        fetch(`/api/to-dos?page=${page}`, {credentials: "include"})
        .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {
                    setLoading(false)
                    setError(false)
                    setToDos(data.results) 
                    setToDoCount(data.count)
                })
            } else if (response.status == 401) {
                fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                .then(response => {
                    if (response.ok) {
                        fetchUpdatedToDos()
                    } else {
                        throw new Error() 
                    }
                })
            } else {
                throw new Error()
            }
        })
        .catch((error) => {
            setLoading(false)
            setError(true)
            setToDos([]) 
            setToDoCount(0)
        })
    }, [page])


    function content() {
        if (loading) {
            return (
                <ToDoMessage text="Loading..." margin="my-10" error={false} />
            )
        } else if (!user) {
            return (
                <ToDoMessage text="Please log in to be able to see your to-dos." margin="my-10" error={true} />
            )
        } else if (error) {
            return (
                <>
                <ToDoMessage text="An error occurred when fetching your to-dos." margin="mt-10" error={true} />
                
                <AddToDoForm fetchUpdatedToDos={fetchUpdatedToDos} />
                </>
            )
        } else if (toDos.length == 0) {
            return (
                <>
                <ToDoMessage text="You currently have no to-dos." margin="mt-10" error={false} />

                <AddToDoForm fetchUpdatedToDos={fetchUpdatedToDos} />
                </>
            )
        } else {
            return (
                <>
                <div className='sm:flex sm:justify-center'>
                    <div className="mt-10 py-10 sm:px-20 border-2 flex flex-col items-center">
                        <ul className="list-disc flex flex-col gap-8 sm:gap-12">
                        {toDos.map(toDo => 
                            <li key={toDo.id} className="list-none">
                                <ToDo toDoText={toDo.text} toDoId={toDo.id} fetchUpdatedToDos={fetchUpdatedToDos} />
                            </li>
                        )}
                        </ul>
                    </div>
                </div>
                
                <AddToDoForm fetchUpdatedToDos={fetchUpdatedToDos} />
                </>
            )
        }
    }
    
    return (
        <>
        <SectionHeading heading="My To-Do List"/>

        <PageChange count={toDoCount} page={page} setPage={setPage}/>
        
        {content()}        
        </>
    )
}