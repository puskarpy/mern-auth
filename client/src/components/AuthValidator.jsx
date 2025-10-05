import { useDispatch } from "react-redux"
import axios from "axios"
import { persistor } from "../store/store.js"
import { useEffect } from "react"
import { logout } from "../store/usercontext/userSlice.js"

export default function AuthValidator({children}) {

    const dispatch = useDispatch()

    useEffect(() => {    
      const validateAuth = async() => {
        try {
            await axios.get("http://localhost:3000/api/v1/users/me", {
                withCredentials : true
            })
        } catch (error) {
            persistor.purge()
            dispatch(logout())
        }
      }

      validateAuth()
    }, [dispatch])
    
  return children
}
