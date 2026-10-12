import { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext("")


export default function UserProvider({children}) {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState("")
    const [userId, setUserId] = useState("")
    
    useEffect(() => {

        let active = true

        function getUserDetails() {
            fetch('/api/auth/user/', {credentials: "include"})
            .then( response => {
                if (active) {
                    if (response.ok) {
                        response.json()
                        .then(data => {
                            setLoading(false)
                            setUser(data.username)
                            setUserId(data.pk)
                        })
                    } else if (response.status == 401) {
                        fetch("/api/auth/token/refresh/", {method:"POST", credentials: "include"})
                        .then(response => {
                            if (response.ok) {
                                getUserDetails()
                            } else {
                                setLoading(false)
                                setUser("")
                                setUserId("") 
                            }   
                        })
                    } else {
                        setLoading(false)
                        setUser("user")
                        setUserId("")
                    }
                }    
            })
            .catch(error => {
                if (active) {
                    setLoading(false)
                    setUser("")
                    setUserId("")
                }
            })
        }

        getUserDetails()

        return () => {
            active = false
        } 
        }, []
    )

    return (
        <UserContext value={[user, setUser, loading, userId, setUserId]}>
            {children}
        </UserContext>
    )
}


export const useUser = () => useContext(UserContext)