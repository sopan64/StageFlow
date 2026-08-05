import { useEffect, useState } from "react";
import Button from "../components/Button";
import "../styles/Login.css";
import Input from "../components/Input";
import { replace, useNavigate, useLocation } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    async function handleLogin(){

        if(!email || !password){
            setError("Please fill all the fields!");
            return;
        }

        const newUser = {
            email,
            password
        };

        try{
            const response = await fetch("http://localhost:5000/users/login",{
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Faild to login!");
            }
            
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setEmail("");
            setPassword("");
            setError("");

            navigate("/dashboard", {replace: true});
        }
        catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>StageFlow</h1>

                <p>Club Event Management</p>
                {
                    location.state?.success &&
                    <p className="success">{location.state.success}</p>
                }
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