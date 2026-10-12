import { memo } from 'react';

const ItemExistsError =  memo(function ItemExistsError({touch, exists}) {
    return (
        <>
        {touch && exists ? <li className="text-red-400">This item is already in the menu.</li> : null}
        </>
    )
})

export default ItemExistsError