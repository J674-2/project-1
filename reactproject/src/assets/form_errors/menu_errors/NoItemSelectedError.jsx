import { memo } from 'react';

const NoItemSelectedError = memo(function NoItemSelectedError({noItemSelected}) {
    return (
        <>
        {noItemSelected && <li className="text-red-400">Please select an item to change.</li>}
        </>
    )
})

export default NoItemSelectedError