import { memo } from 'react';

const MaxLengthError = memo(function MaxLengthError({touch, field, limit}) {
    return (
        <>
        {touch && field.length > limit ? (<li className="text-red-400">Maximum of {limit} characters.</li>) : null}
        </>
    )
})


export default MaxLengthError