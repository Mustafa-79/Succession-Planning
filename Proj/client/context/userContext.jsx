import {createContext, useState, useEffect, useReducer} from 'react'
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({})

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { authenticatedUser: action.payload, no: action.no}
        case 'LOGOUT':
            return { authenticatedUser: null, no: 0  }
        default:
            return state
    }
}

export function UserContextProvider({children}) {

    const [state, dispatch] = useReducer(UserReducer, {
        authenticatedUser: null,
        no: 0
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log("Retrieved user data from localStorage:", user);
        if (user) {
            if (user.adminID)
                dispatch({ type: 'LOGIN', payload: user, no: 2})
            else 
                dispatch({ type: 'LOGIN', payload: user, no: 1})
        }
    }, [])

    console.log('UserContext state:', state)

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}