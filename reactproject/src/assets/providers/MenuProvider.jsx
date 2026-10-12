import { createContext, useReducer, useContext } from 'react';

function reducer(prevState, action) {
    switch (action.type) {
        case "add": {
            const newState = [...prevState, action.newItem]
            sessionStorage.setItem("menuItems", JSON.stringify(newState))
            return newState
        }
        case "update": {
            let newState = prevState.filter( item => item.name != action.item)    
            newState = [...newState, action.updatedItem]
            sessionStorage.setItem("menuItems", JSON.stringify(newState))
            return newState
        }
        case "delete": {
            const newState = prevState.filter( item => item.name != action.item)
            sessionStorage.setItem("menuItems", JSON.stringify(newState))
            return newState
        }
        default: {
            return prevState
        }
    }
}

const MenuContext = createContext({})


export default function MenuProvider({children}) {

    function initialState() {
        if (sessionStorage.getItem("menuItems")) {
            return JSON.parse(sessionStorage.getItem("menuItems"))
        } else {
            return ([
                {course: "starter", name: "Garlic bread", price: "5.60"}, 
                {course: "main", name: "Spaghetti", price: "13.45"}, 
                {course: "dessert", name: "Ice cream", price: "4.75"}
            ])
        }
    }

    const [menuItems, dispatch] = useReducer(reducer, null, initialState)

    return (
        <MenuContext value={[menuItems, dispatch]}>
            {children}
        </MenuContext>
    )
}



export const useMenu = () => useContext(MenuContext)