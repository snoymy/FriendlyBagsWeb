import {Routes, Route, Navigate} from "react-router-dom"
import Login from "./components/pages/login/Login"
import Sales from "./components/pages/sales/Sales"
import ArtWork from "./components/pages/artWork/ArtWork"
import HeadOfMarketing from "./components/pages/headOfMarketing/HeadOfMarketing"
import MarketingManager from "./components/pages/marketingManager/MarketingManager"
import BlockPlate from "./components/pages/blockPlate/BlockPlate"
import HeadOfPlastic from "./components/pages/headOfPlastic/HeadofPlastic"
import HeadOfPrinting from "./components/pages/headOfPrinting/HeadofPrinting"

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
            <Route path="/marketingmanager/:type" element={<MarketingManager/>}/>
            <Route path="/marketingmanager" element={<MarketingManager/>}/>
            <Route path="/blockplate/:type" element={<BlockPlate/>}/>
            <Route path="/blockplate" element={<BlockPlate/>}/>
            <Route path="/headofplastic/:type" element={<HeadOfPlastic/>}/>
            <Route path="/headofplastic" element={<HeadOfPlastic/>}/>
            <Route path="/headofprinting/:type" element={<HeadOfPrinting/>}/>
            <Route path="/headofprinting" element={<HeadOfPrinting/>}/>
            <Route path="/" element={<Navigate to="login"/>}/>
        </Routes>
    )
}

export {RoutePath, Navigate};
