import { memo } from 'react';

const RequiredError = memo(function RequiredError({touch, field, fieldName}) {
    return(
        <>
        {touch && field.length == 0 ? (<li className="text-red-400">{fieldName} is required.</li>) : null}
        </>
    )
})

export default RequiredError