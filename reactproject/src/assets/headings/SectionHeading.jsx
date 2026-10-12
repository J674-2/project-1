import { memo } from 'react';

const SectionHeading =  memo(function SectionHeading({heading}) {
    return(
        <div className='mb-8 flex justify-center'>
            <h2>{heading}</h2>
        </div>
    )
})

export default SectionHeading
