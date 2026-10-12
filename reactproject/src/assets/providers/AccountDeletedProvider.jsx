import { useState, useContext, createContext } from "react";

const AccountDeletedContext = createContext(false)



export default function AccountDeletedProvider({children}) {

    const [isDeleted, setIsDeleted] = useState(false)
    
    return (
        <AccountDeletedContext value={[isDeleted, setIsDeleted]}>
            {children}
        </AccountDeletedContext>
    )
}


export const useAccountDeleted = () => useContext(AccountDeletedContext)