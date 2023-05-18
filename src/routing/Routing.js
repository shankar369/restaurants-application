import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "../screens/Login"
import Signup from "../screens/Signup"
import ForgotPassword from "../screens/ForgotPassword"
import ResetPassword from "../screens/ResetPassword"
import PrivateRoute from './PrivateRoute'
import Home from '../screens/Home'
import Restaurant from '../screens/Restaurant'
import AdminRoute from './AdminRoute'
import Users from '../screens/Users'

const Routing = ({children}) => {
    return (
        <>
            <Router>
                {children}
                <Switch>
                    <AdminRoute exact path="/users" component={Users} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/restaurants/:restaurantId" component={Restaurant} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/forgotpassword" component={ForgotPassword} />
                    <Route exact path="/passwordreset/:resetToken" component={ResetPassword} />
                </Switch>
            </Router>
        </>
    )
}

export default Routing;