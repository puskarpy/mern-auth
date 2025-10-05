import {getAuth, signInWithPopup ,GoogleAuthProvider } from 'firebase/auth'
import { app } from '../firebase/firebase.js'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {loginSuccess} from '../store/usercontext/userSlice.js'

export default function OAuth() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


const handleGoogleSignup = async() => {
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        const userData = {
            name : user.displayName,
            email : user.email,
            profileImage : user.photoURL
        }
        dispatch(loginSuccess(userData))
        navigate('/')
        
    } catch (error) {
        
    }
}

  return (
    <Link onClick={handleGoogleSignup} className='flex justify-center bg-blue-500 text-white p-3 rounded-lg'>
        Sign in with google
    </Link>
  )
}
