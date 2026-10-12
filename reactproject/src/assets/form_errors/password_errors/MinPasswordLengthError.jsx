import { memo } from 'react';

const MinPasswordLengthError = memo(function MinPasswordLengthError({touch, password1}) {
    return (
        <>
        { (password1 != "" && touch && password1.length < 8) && <li className="text-red-400">Password must be 8 characters or more.</li>}
        </>
    )
})

export default MinPasswordLengthError