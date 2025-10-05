import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {loginStart, loginSuccess, loginFailed} from '../store/usercontext/userSlice.js'
import OAuth from '../components/OAuth.jsx'

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, loading } = useSelector( state => state.user )

    const [ formData, setFormData ] = useState( { email: '', password: '' } )

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    const handleSignin = async() => {
        try {
            dispatch(loginStart())
            const res = await axios.post("http://localhost:3000/api/v1/users/signin", {
            email : formData.email,
            password : formData.password,
        }, {
            withCredentials : true
        })
            if(res.data.success === false) {
                dispatch(loginFailed(res.data))
            }

        const userData = await axios.get("http://localhost:3000/api/v1/users/me", { withCredentials: true });
        dispatch(loginSuccess(userData.data));

        setFormData({email: '', password: ''})
        navigate('/')
        } catch (error) {
            dispatch(loginFailed(error))
            setFormData({email: '', password: ''})
        }
    }

  return (
    <div className='px-12 py-8 flex flex-col items-center'>
        <h1 className='mx-auto text-5xl font-bold tracking-tighter mb-8 '>Login</h1>
        <form method="post" className='mx-auto bg-neutral-300 flex flex-col gap-4 p-8 rounded-lg min-w-md'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-sm tracking-tighter'>Email</label>
                <input name='email' value={formData.email} onChange={handleChange} type="email" className='bg-neutral-100 p-3 rounded-md focus:outline-1 focus:outline-neutral-500' placeholder='eg: john@gmail.com' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-sm tracking-tighter '>Password</label>
                <input name='password' value={formData.password} onChange={handleChange} type="password" className='bg-neutral-100 p-3 rounded-md focus:outline-1 focus:outline-neutral-500' />
            </div>
            <div className='mt-8 w-full'>
                <Link onClick={handleSignin} className='flex justify-center bg-stone-100 p-3 rounded-md'> {loading?'Logging in...' :'Log in'}</Link>
            </div>
            <OAuth/>
            <div className='flex gap-1'>
                <span>Don't have an account?</span> <Link to={'/signup'} className='text-blue-700' >signup</Link>
            </div>
            {
                error && <p className='text-red-500'>{error.data}</p>
            }
        </form>
    </div>
  )
}
