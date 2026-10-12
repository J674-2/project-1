import { memo } from 'react';

const FormHeading =  memo(function FormHeading({heading}) {
    return(
        <div className="flex justify-center">
            <h3>{heading} menu item</h3>
        </div>
    )
})

export default FormHeading
