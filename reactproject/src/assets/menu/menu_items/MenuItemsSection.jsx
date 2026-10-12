export default function MenuItemsSection({course, items}) {

    return (
        <div className="flex flex-col">
            <h3 className='mt-10 mb-6 md:mt-0 md:mb-10 underline text-center'>{course}</h3>
            <div data-testid={course.toLowerCase()} className="mx-4 p-4 border-2 flex flex-col items-center">
                <ul className="flex flex-col items-center gap-2">
                    {items.map( item => <li key={item.name}>{item.name}, £{item.price}</li>)}
                </ul>
            </div>
        </div>
    )
}

