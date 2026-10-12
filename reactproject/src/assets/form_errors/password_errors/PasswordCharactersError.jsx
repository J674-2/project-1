import { memo } from 'react';

const PasswordCharactersError =  memo(function PasswordCharactersError({touch, password1}) {
    return (
        <>
        {(touch && (/^[0-9]+$/.test(password1))) && <li className="text-red-400">Password should not contain only numbers.</li>}
        </>
    )
})

export default PasswordCharactersError