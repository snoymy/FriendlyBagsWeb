import {useState} from "react"
import "./Login.css"
import {RoutePath, Navigate} from "../../../RoutePath"
import BackEndInterface from "../../../BackEndInterface"

const Login = () => {
    const [id, setID] = useState("")
    const [password, setPassword] = useState("")
    const [loginResult, setLoginResult] = useState(()=><p>&nbsp;</p>)

    const mockUserData = [
        {
            id:"sales",
            password:"pass",
            role:"sales"
        },
        {
            id:"artwork",
            password:"pass",
            role:"artwork"
        },
        {
            id:"headofmarketing",
            password:"pass",
            role:"headofmarketing"
        },
        {
            id:"marketingmanager",
            password:"pass",
            role:"marketingmanager"
        },
    ]

    const onLogin = () => {
        if(!id.trim()){
            setLoginResult(() => <p>Please Enter ID</p>)
            return
        }
        if(!password.trim()){
            setLoginResult(() => <p>Please Enter Password</p>)
            return
        }

        // mock up

        const status = mockUserData.filter((item) => {
            return item.id === id && item.password === password;
        })
        console.log(status)
        const role = status.length > 0 ? status[0].role : "" 

        // end mockup
        
        if(role !== ""){
            setLoginResult(() => <Navigate to={"/" + role}/>)
        }
        else{
            setLoginResult(() => <p>Invalid ID or Password</p>)
        }
    }

    return (
        <div className="login-form-wrapper">
            <div className="login-form">
                <h1>Login</h1>
                <input type="text" placeholder="ID" value={id} onChange={(e) => setID(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onLogin}>Login</button>
                <div className="login-form-result">{loginResult}</div>  
            </div>
        </div>
    )
}

export default Login;

