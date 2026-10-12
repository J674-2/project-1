import { NavLink } from 'react-router';

import { memo } from 'react';

const HeaderLink = memo(function HeaderLink({to, page}) {
    return (
        <li className="border-gray-500 border-r-2 last:border-none flex-1 flex">
            <NavLink 
                className={
                    ({isActive}) => isActive ? 
                    "bg-gray-500 text-gray-300 hover:bg-gray-700 w-full flex items-center justify-center no-underline" : 
                    "bg-gray-300 hover:bg-gray-700 hover:text-gray-300 w-full flex items-center justify-center no-underline"
                } 
                to={to}
            >
                {page}
            </NavLink>
        </li>
    )
})

export default HeaderLink
