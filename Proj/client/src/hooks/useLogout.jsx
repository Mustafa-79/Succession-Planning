import { useNavigate } from "react-router-dom"
import { useUserContext } from "./useUserContext"

export const useLogout = () => {
    const { dispatch } = useUserContext()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        navigate('/')
    }

    return { logout }
}