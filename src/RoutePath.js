import {Switch, Route} from "react-router"
import {Redirect} from "react-router-dom/cjs/react-router-dom.min"
import Login from "./components/pages/login/Login"

const RoutePath = () => {
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Redirect to="/login">
                    <Login/>
                </Redirect>
            </Route> 
            <Route path="/login">
                <Login/>
            </Route> 
        </Switch>
        </>
    )
}

export default RoutePath;
