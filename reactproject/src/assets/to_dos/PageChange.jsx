import { memo } from 'react';

const PageChange = memo(function PageChange({count, page, setPage}) {

    function currentPage() {
        if (count == 0) {
            return "0/0"
        } else if (typeof(count) === "number" ) {
            return `${page}/${Math.ceil(count/4)}`
        } else {
            return "0/0"
        }
    }

    return (
        <div className="flex justify-center">
            <div className="w-75 flex items-center justify-center">
                <button className="p-1 flex-1" type="button" disabled={page == 1 || typeof(count) !== "number" || count == 0} onClick={() => setPage(page-1)}>Previous</button>
                <div className="flex-1 text-center">
                    <p>Page: {currentPage()}</p>
                </div>
                <button className="p-1 flex-1"type="button" disabled={page == Math.ceil(count/4) || typeof(count) !== "number" || count == 0} onClick={() => setPage(page+1)}>Next</button>
            </div>
        </div>
        
    )
})

export default PageChange