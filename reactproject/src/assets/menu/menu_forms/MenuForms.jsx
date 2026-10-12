import SectionHeading from '../../headings/SectionHeading';
import AddItemForm from './AddItemForm';
import DeleteItemForm from './DeleteItemForm';
import UpdateItemForm from './UpdateItemForm';

import { useState } from 'react';

import { useMenu } from '../../providers/MenuProvider';

export default function MenuForms() {

    const [form, setForm] = useState({add: true, update: false, delete: false})

    const [menuItems, dispatch] = useMenu()

    return(
        <section className='md:pl-12 lg:pl-16'>
            <SectionHeading heading="Menu forms"/>
            <p className='mb-8'>Press one of the following buttons to display a form that can be used to edit the menu items.</p>
            <div className='flex flex-col'>
                <button type="button" disabled={form.add} onClick={() => setForm({add: true, update: false, delete: false})}>Add item form</button>
                <button type="button" disabled={form.update} className="mt-7" onClick={() => setForm({add: false, update: true, delete: false})}>Update item form</button>
                <button type="button" disabled={form.delete} className="mt-7" onClick={() => setForm({add: false, update: false, delete: true})}>Delete item form</button>
            </div>
            <div className='mt-8'>
                {form.add && <AddItemForm menuItems={menuItems} dispatch={dispatch} />}
            
                {form.update && <UpdateItemForm menuItems={menuItems} dispatch={dispatch} />}
            
                {form.delete && <DeleteItemForm menuItems={menuItems} dispatch={dispatch} />}
            </div>
        </section>
    )
}
