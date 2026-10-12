import { useState } from'react';

import FormHeading from '../../headings/FormHeading';
import RequiredError from '../../form_errors/RequiredError';
import MaxLengthError from '../../form_errors/MaxLengthError';
import PriceFormatError from '../../form_errors/menu_errors/PriceFormatError';
import ItemExistsError from '../../form_errors/menu_errors/ItemExistsError';


export default function AddItemForm({menuItems, dispatch}) {
    
    const [course, setCourse] = useState("starter")
    const [item, setItem] = useState("")
    const [price, setPrice] = useState("")

    const [touch, setTouch] = useState({item: false, price: false})

    function doesItemExist() {
        for (let x of menuItems) {
            if (x.name.toLowerCase() == item.toLowerCase()) {
                return true
            }
        }
        return false
    }

    function isItemInvalid() {
        if (touch.item == true ) {
            if (item.length == 0) {
                return true
            } else if (item.length > 20) {
                return true
            } else if (doesItemExist()) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function isPriceInvalid() {
        if (touch.price == true){
            if (price.length == 0) {
                return true
            } else if (price.length > 6)  {
                return true
            } else if (!(/^[0-9]+\.[0-9]{2}$/.test(price))) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
 
    function resetForm(){
        setCourse("starter")
        setItem("")
        setPrice("")
        setTouch({item: false, price: false})
    }

    const untouchedEmptyFields = item == "" || price == ""

    function handleSubmit(e) {
        e.preventDefault()
        setTouch({item: true, price: true})
        if (!isItemInvalid() && !isPriceInvalid() && !untouchedEmptyFields) {
            dispatch({type: "add", newItem: {course: course, name: item, price: price}})
            resetForm()
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FormHeading heading="Add"/>

            <ul>
                <li id="instructions" className='my-6 ml-5 list-disc'>All fields in this form require a value.</li>
            </ul>

            <label htmlFor="course">Course:</label>
            <select 
                required id="course" className="mb-6" 
                value={course} onChange={(e)=> setCourse(e.target.value)}
            >
                <option value={"starter"}>Starter</option>
                <option value={"main"}>Main</option>
                <option value={"dessert"}>Dessert</option>
            </select>

            <label htmlFor="item">Item:</label>
            <input 
                required type="text" id="item" autoComplete="off"  
                aria-invalid={isItemInvalid()} aria-errormessage="add-item-errors" 
                value={item} onChange={(e) => {setItem(e.target.value); setTouch({...touch, item: false})}} onBlur={() => setTouch({...touch, item: true})}
            />
            <ul id="add-item-errors" className="errors-container" aria-live="polite" >
                <RequiredError touch={touch.item} field={item} fieldName="Item name" />
                <MaxLengthError touch={touch.item} field={item} limit={20} />
                <ItemExistsError touch={touch.item} exists={doesItemExist()} />
            </ul>

            <label htmlFor="price">Price:</label>
            <input 
                required type="number" id="price" autoComplete="off"
                aria-invalid={isPriceInvalid()} aria-errormessage="add-price-errors" 
                value={price} onChange={(e)=> {setPrice(e.target.value); setTouch({...touch, price: false})}} onBlur={() => setTouch({...touch, price: true})}
            />
            <ul id="add-price-errors" className="errors-container" aria-live="polite">
                <RequiredError touch={touch.price} field={price} fieldName="Price" />
                <MaxLengthError touch={touch.price} field={price} limit={6} />
                <PriceFormatError touch={touch.price} field={price} />
            </ul>
            
            <div className="flex justify-center">
                <button type="submit" className="mt-2 mb-1">Add item</button>
            </div>
        </form>
    )
}
