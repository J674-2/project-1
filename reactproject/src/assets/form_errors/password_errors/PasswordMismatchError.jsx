import { memo } from 'react';

const PasswordMismatchError = memo(function PasswordMismatchError({touch, mismatch}) {
    return (
        <>
        {(touch && mismatch) && <li className="text-red-400">The passwords do not match.</li>}
        </>
    )
})

export default PasswordMismatchError