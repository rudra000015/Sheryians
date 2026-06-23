import { login, register, getMe, logout } from "../services/auth.api";
import { useCallback, useContext } from "react";
import { AuthContext } from "../auth-context";
import { useEffect } from "react";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true)
        const data = await login({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    const handleGetMe = useCallback(async function handleGetMe() {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }, [setLoading, setUser])

    async function handleLogout() {
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(() => {
        handleGetMe()
    }, [handleGetMe])

    return ({
        user, loading, handleRegister, handleLogin, handleLogout, handleGetMe
    })
}
