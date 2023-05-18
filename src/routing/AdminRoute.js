import { Redirect, Route } from "react-router-dom";
import jwt from "jwt-decode";
import { Link } from "react-router-dom";

const AdminRoute = ({history, component: Component, ...rest }) => {
    const checkAdmin = () => {
        try{
            const token = localStorage.getItem("authToken") ;
            if(token === null) return -1;
            const user = jwt(token);
            if(user.isAdmin === 1) return 1
            return 0;
        }catch{
            return 0;
        }
    }
  return (
    <Route
      {...rest}
      render={(props) =>{
          const admin = checkAdmin() ;
          if(admin === -1) return <Redirect to="/login" />
          else if(admin === 0 ) return (
            <div className="screen">
              <div className="flex-class column">
                  <h1>
                      you are not an Admin to access this route
                  </h1>
                  <h4><Link to="/">click here</Link> to go to home page</h4>
              </div>
              </div>
          )
          return <Component {...props} />
        }
      }
    />
  );
};

export default AdminRoute;