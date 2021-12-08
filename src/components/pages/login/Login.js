import {useState} from "react"
import "./Login.css"

const Login = () => {
    const [id, setID] = useState("")
    const [password, setPassword] = useState("")

    const mockUserData = [
        {
            id:"user",
            password:"password"
        }
    ]

    const onLogin = () => {
        if(!id.trim()){
            alert("Please Enter ID")
            return
        }
        if(!password.trim()){
            alert("Please Enter Password")
            return
        }
        const status = mockUserData.filter((item) => {
            console.log(item)
            console.log(id, password)
            return item.id === id && item.password === password;
        })
        console.log(status.length)
        if(status.length > 0)
            alert("Success")
        else
            alert("Invalid ID or Password")
    }

    return (
        <div className="login-form-wrapper">
            <div className="login-form">
                <h1>Login</h1>
                <input type="text" placeholder="ID" value={id} onChange={(e) => setID(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login;

