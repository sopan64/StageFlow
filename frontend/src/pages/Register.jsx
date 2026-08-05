import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleRegister(){
        
        if(!name || !email || !password || !confirmPassword){
            setError("Please fill all the fields!");
            return;
        }
        if(password.length < 8){
            setError("Password must be at least 8 characters long!");
            return;
        }
        if(password !== confirmPassword){
            setError("Passwords do not match!");
            return;
        }

        const newUser = {
            name, email, password
        };

        try{
            const response = await fetch("http://localhost:5000/users/register", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Faild to register!");
            }

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setError("");

            navigate("/", {
                replace: true,
                state: {
                    success: "✅ Account created successfully! Please sign in."
                }
            });
        }
        catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="register-container">

            <div className="register-card">

                <h3>Create new account</h3>
                {
                    error && <p className="error">{error}</p>
                }

                <Input 
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input 
                    type="text"
                    placeholder="e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Input 
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button 
                    text="Create account"
                    onClick={handleRegister}
                />

            </div>

        </div>
    );
}

export default Register;