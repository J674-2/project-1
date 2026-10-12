import { memo } from 'react';

const FailedSubmissionError = memo(function FailedSubmissionError({error, actionName}) {
    return (
        <>
        {error && <p className="text-red-400">{actionName} was unsuccessful.</p>}
        </>
    )
})


export default FailedSubmissionError