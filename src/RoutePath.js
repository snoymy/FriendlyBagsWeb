import {Routes, Route, Navigate} from "react-router-dom"
import Login from "./components/pages/login/Login"
import Sales from "./components/pages/sales/Sales"
import ArtWork from "./components/pages/artWork/ArtWork"
import HeadOfMarketing from "./components/pages/headOfMarketing/HeadOfMarketing"

const RoutePath = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/sales/:type" element={<Sales/>}/>
            <Route path="/sales" element={<Sales/>}/>
            <Route path="/artwork/:type" element={<ArtWork/>}/>
            <Route path="/artwork" element={<ArtWork/>}/>
            <Route path="/headofmarketing/:type" element={<HeadOfMarketing/>}/>
            <Route path="/headofmarketing" element={<HeadOfMarketing/>}/>
            <Route path="/" element={<Navigate to="login"/>}/>
        </Routes>
    )
}

export {RoutePath, Navigate};
