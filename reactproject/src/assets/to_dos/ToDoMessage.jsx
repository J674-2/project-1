import { memo } from 'react';

const ToDoMessage = memo(function ToDoMessage({text, margin, error}) {
 
    return (
        <div className='sm:flex sm:justify-center'>
            <div className={`${margin} py-10 sm:px-20 border-2 flex flex-col`}>
                <p className={error ? "text-center text-red-500": "text-center"}>{text}</p>
            </div>
        </div>
    )
})

export default ToDoMessage