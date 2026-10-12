import { memo } from 'react';

const ToTop = memo(function ToTop() {

    function handleClick() {
        const element =  document.getElementById("top")
        if (element) {
            element.scrollIntoView(
                {
                    behaviour: "smooth",
                    block: "start"
                }
            )
        }
    }

    return (
        <div className="mb-10">
            <a className="text-sm p-1 bg-sky-400 rounded hover:bg-sky-500 sm:text-base hover:no-underline" href="#top" onClick={handleClick}>Back to top</a>
        </div>
    )
})

export default ToTop