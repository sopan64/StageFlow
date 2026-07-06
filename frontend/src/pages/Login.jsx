import { useState } from "react";
import Button from "../components/Button";
import "../styles/Login.css";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState("");

    const navigate = useNavigate();

    function handleLogin(){

        if(username === "" || password === ""){
            alert("Please fill all the fields");
            return;
        }
        setLoggedInUser(username);

        console.log(username);
        console.log(password);

        setUsername("");
        setPassword("");

        setIsLoggedIn(true);
        navigate("/dashboard");
    }

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>StageFlow</h1>

                <p>Club Event Management</p>

                <Input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <Button text="Register" />

            </div>

        </div>
    );
}

export default Login;