import { useState } from'react';

import FormHeading from '../../headings/FormHeading';
import RequiredError from '../../form_errors/RequiredError';
import MaxLengthError from '../../form_errors/MaxLengthError';
import PriceFormatError from '../../form_errors/menu_errors/PriceFormatError';
import NoItemSelectedError from '../../form_errors/menu_errors/NoItemSelectedError';


export default function UpdateItemForm({menuItems, dispatch}) {
    
    const [item, setItem] = useState("")
    const [updatedCourse, setUpdatedCourse] = useState("")
    const [updatedItemName, setUpdatedItemName] = useState("")
    const [updatedPrice, setUpdatedPrice] = useState("")

    const [touch, setTouch] = useState({updatedItemName: false, updatedPrice: false})

    const [noItemSelected, setNoItemSelected] = useState(false)

    function currentItem(e) {
        setItem(e.target.value) 
        const selectedItem = menuItems.filter( item => item.name == e.target.value)
        setUpdatedCourse(selectedItem[0].course)
        setUpdatedItemName(selectedItem[0].name)
        setUpdatedPrice(selectedItem[0].price)
        setNoItemSelected(false);
    }

    function isUpdateItemInvalid() {
        if (touch.updatedItemName == true && item) {
            if (updatedItemName.length == 0){
                return true
            } else if (updatedItemName.length > 20)  {
                return true
            } else {
                return false
            } 
        } else {
            return false
        }
    }

    function isUpdatePriceInvalid() {
        if (touch.updatedPrice == true && item) {
            if (updatedPrice.length == 0){
                return true
            } else if (updatedPrice.length > 6)  {
                return true
            } else if (!(/^[0-9]+\.[0-9]{2}$/.test(updatedPrice))) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function resetForm(){
        setItem("")
        setUpdatedCourse("")
        setUpdatedItemName("")
        setUpdatedPrice("")
        setTouch({updatedItemName: false, updatedPrice: false})
        setNoItemSelected(false)
    }

    const untouchedEmptyFields = updatedCourse == "" || updatedItemName == "" || updatedPrice == ""

    function handleSubmit(e) {
        e.preventDefault()
        setTouch({updatedItemName: true, updatedPrice: true})
        if (item == "") {
            setNoItemSelected(true)
        } else if (!isUpdateItemInvalid() && !isUpdatePriceInvalid() && !untouchedEmptyFields) {
            dispatch({type: "update", item: item, updatedItem: {course: updatedCourse, name: updatedItemName, price: updatedPrice}})
            resetForm()
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} noValidate>
            <FormHeading heading="Update"/>
            <ul>
                <li className='my-6 ml-5 list-disc'>All fields in this form require a value.</li>
            </ul>

            <label htmlFor='item-to-update'>Item to update:</label>
            <select 
                required id="item-to-update"
                aria-invalid={noItemSelected} aria-errormessage='current-item-error' 
                value={item} onChange={currentItem}
            >
                <option value="" disabled hidden></option>
                {menuItems.map(item => <option key={item.name} value={item.name}>{item.name}</option>)}
            </select>
            <ul id="current-item-error" className="errors-container" aria-live="polite">
                <NoItemSelectedError noItemSelected={noItemSelected} />
            </ul>

            <label htmlFor="updated-course">Updated course:</label>
            <select 
                required id="updated-course" className="mb-6" 
                value={updatedCourse} onChange={(e)=> setUpdatedCourse(e.target.value)}
            >
                <option value="" disabled hidden></option>
                <option value={"starter"}>Starter</option>
                <option value={"main"}>Main</option>
                <option value={"dessert"}>Dessert</option>
            </select>

            <label htmlFor="updated-item-name">Updated item name:</label>
            <input 
                required type="text" id="updated-item-name" autoComplete="off"
                aria-invalid={isUpdateItemInvalid()} aria-errormessage='updated-item-name-errors' 
                value={updatedItemName} onChange={(e)=> {setUpdatedItemName(e.target.value); setTouch({...touch, updatedItemName: false})}} onBlur={() => setTouch({...touch, updatedItemName: true})}
            />
            <ul id="updated-item-name-errors" className="errors-container" aria-live="polite" >
                {item && <RequiredError touch={touch.updatedItemName} field={updatedItemName} fieldName="Updated item name" />}
                <MaxLengthError touch={touch.updatedItemName} field={updatedItemName} limit={20}/>
            </ul>

            <label htmlFor="updated-price">Updated price:</label>
            <input 
                required type="number" id="updated-price" autoComplete="off"
                aria-invalid={isUpdatePriceInvalid()} aria-errormessage='updated-price-errors' 
                value={updatedPrice} onChange={(e)=> {setUpdatedPrice(e.target.value); setTouch({...touch, updatedPrice: false})}} onBlur={() => setTouch({...touch, updatedPrice: true})}
            />
            <ul id="updated-price-errors" className="errors-container" aria-live="polite">
                {item && <RequiredError touch={touch.updatedPrice} field={updatedPrice} fieldName="Updated price" />}
                <MaxLengthError touch={touch.updatedPrice} field={updatedPrice} limit={6}/>
                <PriceFormatError touch={touch.updatedPrice} field={updatedPrice}/>
            </ul>

            <div className="flex justify-center">
                <button type="submit" className="mt-2 mb-1">Update item</button>
            </div>
        </form>
        </>
    )
}
