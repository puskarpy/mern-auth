import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import OAuth from '../components/OAuth'

// import { handleLogin } from '../api/apiCalls.js'

export default function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({name : '', email: '', password: ''})
    const [error, setError] = useState(null)
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    const handleSignup = async() => {
    try {
        const res = await axios.post("http://localhost:3000/api/v1/users/signup", {
        name : formData.name,
        email : formData.email,
        password : formData.password,
    })
    console.log(res.data);
    setFormData({name : '', email: '', password: ''})
    return res.data
    } catch (error) {
        setError(error)
    }
    }

  return (
    <div className='px-12 py-6 flex flex-col items-center'>
        <h1 className='mx-auto text-5xl font-bold tracking-tighter mb-8 '>Signup</h1>
        <form method="post" className='mx-auto bg-neutral-300 flex flex-col gap-4 p-8 rounded-lg min-w-md'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-sm tracking-tighter'>Name</label>
                <input name='name' value={formData.name} onChange={handleChange} type="text" className='bg-neutral-100 p-3 rounded-md focus:outline-1 focus:outline-neutral-500' placeholder='eg: John Doe' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-sm tracking-tighter'>Email</label>
                <input name='email' value={formData.email} onChange={handleChange} type="email" className='bg-neutral-100 p-3 rounded-md focus:outline-1 focus:outline-neutral-500' placeholder='eg: john@gmail.com' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-sm tracking-tighter '>Password</label>
                <input name='password' value={formData.password} onChange={handleChange} type="password" className='bg-neutral-100 p-3 rounded-md focus:outline-1 focus:outline-neutral-500' />
            </div>
            <div className='mt-8 w-full'>
                <Link onClick={handleSignup} className='flex justify-center bg-stone-100 p-3 rounded-md'>Sign up</Link>
            </div>
            <OAuth/>
            <div className='flex gap-1'>
                <span>Already have an account?</span> <Link to={'/login'} className='text-blue-700' >login</Link>
            </div>
            { error && <p className='text-red-500'>{error.response.data.message}</p> }
        </form>
    </div>
  )
}
