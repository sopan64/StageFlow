import { useState } from "react";
import Button from "../components/Button";
import "../styles/Login.css";
import Input from "../components/Input";
import { replace, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleLogin(){

        if(!email || !password){
            setError("Please fill all the fields!");
            return;
        }

        setEmail("");
        setPassword("");
        setError("");

        navigate("/dashboard", {replace: true});
    }

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>StageFlow</h1>

                <p>Club Event Management</p>
                {
                    error && <p className="error">{error}</p>
                }
                <Input 
                    type="text"
                    placeholder="e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button 
                    text="Sign In"
                    onClick={handleLogin}
                />

                <p>Don't have an account?</p>
                <Button
                    text="Create account"
                    onClick={() => navigate("/register")}
                />

            </div>

        </div>
    );
}

export default Login;