import { memo } from 'react';

const IncorrectCredentialsError = memo(function  IncorrectCredentialsError({userNotFound}) {
    return (
        <>
        {userNotFound && <li className="text-red-400">The credentials entered are not correct.</li>}
        </>
    )
})

export default IncorrectCredentialsError