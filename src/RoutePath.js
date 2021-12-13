import {Routes, Route, Navigate} from "react-router-dom"
import Login from "./components/pages/login/Login"
import Sales from "./components/pages/sales/Sales"

const RoutePath = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/sales/:type" element={<Sales/>}/>
            <Route path="/sales" element={<Sales/>}/>
            <Route path="/" element={<Navigate to="login"/>}/>
        </Routes>
    )
}

export {RoutePath, Navigate};
