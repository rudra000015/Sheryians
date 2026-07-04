import { login, register, getMe, logout } from "../services/auth.api";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../authContext";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true)
        try {
            const data = await login({ username, email, password })
            setUser(data.user)
        } finally {
            setLoading(false)
        }
    }

    const handleGetMe = useCallback(async () => {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [setLoading, setUser])

    async function handleLogout() {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [handleGetMe])

    return ({
        user, loading, handleRegister, handleLogin, handleLogout, handleGetMe
    })
}
