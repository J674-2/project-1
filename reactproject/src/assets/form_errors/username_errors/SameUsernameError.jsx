import { memo } from 'react';

const SameUsernameError =  memo(function SameUsernameError({touch, same}) {
    return (
        <>
        {(touch && same) && <li className="text-red-400">Username is the same as your current one.</li>}
        </>
    )
})

export default SameUsernameError