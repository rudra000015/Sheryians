import { useState } from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

    const { loading, handleLogin } = useAuth()

    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        try {
            await handleLogin({ email, password })
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Unable to log in. Please try again.")
        }
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />
                    {error && <p className="form-error">{error}</p>}
                    <button className='button' type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
    )
}

export default Login
