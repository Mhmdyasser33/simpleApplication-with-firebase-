import { Navigate, useLocation } from "react-router";
import { useContextAuth } from "./AuthContext";


export const ProtectedRoutes = ({children}) => {
    const {currentUser} = useContextAuth() ;
    const location = useLocation() ;
    if(!currentUser){
    return <Navigate to="/login" state={{path : location.pathname}} />
    }
  return children
}
