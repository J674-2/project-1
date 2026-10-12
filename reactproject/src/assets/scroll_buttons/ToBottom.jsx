import { memo } from 'react';

const ToBottom = memo(function ToBottom() {

    function handleClick() {
        const element =  document.getElementById("bottom")
        if (element) {
            element.scrollIntoView(
                {
                    behaviour: "smooth",
                    block: "end"
                }
            )
        }
    }

    return (
        <div className="mt-10">
            <a className="text-sm p-1 bg-sky-400 rounded hover:bg-sky-500 sm:text-base hover:no-underline" href="#bottom" onClick={handleClick}>To bottom</a>
        </div>
    )
})

export default ToBottom