import { memo } from 'react';

const PriceFormatError = memo(function PriceFormatError({touch, field}) {
    return(
        <>
        {touch && field.length > 0 && !(/^[0-9]+\.[0-9]{2}$/.test(field)) ? (<li className="text-red-400">This should be formatted as a price.</li>) : null }
        </>
    )
})

export default PriceFormatError
