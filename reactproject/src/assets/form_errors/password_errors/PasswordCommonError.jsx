import { memo } from 'react';

const PasswordCommonError = memo(function PasswordCommonError({touch, common}) {
    return (
        <>
        {(touch && common) && <li className="text-red-400">This password is too common.</li>}
        </>
    )
})

export default PasswordCommonError