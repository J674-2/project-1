import { memo } from 'react';

const UsernameTakenError =  memo(function UsernameTakenError({touch, taken}) {
    return (
        <>
        {(touch && taken) && <li className="text-red-400">Username is unavailable.</li>}
        </>
    )
})

export default UsernameTakenError