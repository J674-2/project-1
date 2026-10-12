import { useState } from'react';

import FormHeading from '../../headings/FormHeading'
import RequiredError from '../../form_errors/RequiredError';

export default function DeleteItemForm({menuItems, dispatch}) {
    
    const [item, setItem] = useState("")
    const [touch, setTouch] = useState(false)

    function resetForm(){
        setItem("")
        setTouch(false)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setTouch(true)
        if (item) {
            dispatch({type: "delete", item: item})
            resetForm()
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} noValidate>
            <FormHeading heading="Delete" />
            
            <label htmlFor="item-to-delete" className='mt-6'>Item to delete:</label>
            <select 
                required id="item-to-delete" 
                aria-invalid={touch && item == ""} aria-errormessage="delete-todo-error"
                value={item} onChange={(e)=> {setItem(e.target.value); setTouch(false)}} 
                onBlur={() => setTouch(true)}
            >
                <option value="" disabled hidden></option>
                {menuItems.map(item => <option key={item.name} value={item.name}>{item.name}</option>)}
            </select>
            <ul id="delete-todo-error" className="errors-container" aria-live="polite">
                <RequiredError touch={touch} field={item} fieldName="Item"/>
            </ul>
            
            <div className="flex justify-center">
                <button type="submit" className="mt-2 mb-1">Delete item</button>
            </div>
        </form>
        </>
    )
}
