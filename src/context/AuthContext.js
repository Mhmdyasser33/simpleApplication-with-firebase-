import { createContext, useContext, useEffect, useState }  from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged ,signInWithEmailAndPassword , signOut , sendPasswordResetEmail ,updateEmail , updatePassword} from "firebase/auth";
import auth from "../firebase";
const contextCreator = createContext() ;
const  ContextProvider = ({children}) =>{
    const [currentUser , setCurrentUser] = useState() ;
    const [loading , setLoading ] = useState(true) ;
      const signup = (email , password) =>{
          return createUserWithEmailAndPassword(auth , email , password) ;
          }
      const login = (email, password) =>{
        return signInWithEmailAndPassword(auth , email , password) ;
          }
      const logout = () =>{
        return signOut(auth) ;
          }
      const resetpassword = (email) =>{
      return sendPasswordResetEmail(auth , email) ;
         }

      const updateUserMail = (email) =>{
      return updateEmail(auth.currentUser  , email)
        }

      const updateUserPassword = (password) =>{
        return updatePassword(auth.currentUser , password)
       }
 useEffect(() =>{
    const logOutUsers =  onAuthStateChanged(auth , (user) =>{
     setCurrentUser(user)
     setLoading(false) ;
   })
   return()=>{
   logOutUsers() ;
   }
} , [])
    return <contextCreator.Provider value={{
      currentUser,
      signup ,
      login ,
      logout ,
      resetpassword,
      updateUserMail ,
      updateUserPassword
    }}>
        {!loading && children}
    </contextCreator.Provider>
}

export default ContextProvider ;
// custom hook for provide useContext hook
export const useContextAuth = () =>{
return useContext(contextCreator) ;
}