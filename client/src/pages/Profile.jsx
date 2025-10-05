import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { logout } from '../store/usercontext/userSlice.js'

export default function Profile() {
    const { user } = useSelector(state => state.user) 
    const dispatch = useDispatch()
    const [file, setFile] = useState(undefined)
    
    const fileRef = useRef(null)

    const handleFile = () => {
        fileRef.current.click()
    }

    const handleLogout = async() => {  
    const res = await axios.get("http://localhost:3000/api/v1/users/logout", {
      withCredentials : true
    })
    dispatch(logout())
  }
    
  return (
    <div className="flex flex-col gap-2 p-8 items-center">
        <input type="file" name="" id="" accept="image/*" hidden ref={fileRef} />
        <div className="w-48 h-48">
            {user.user[0].profileImage? <Link onClick={handleFile} onSelect={(e) => setFile(e.target.files[0])} className="overflow-hidden rounded-full flex items-center justify-center"><img src={user.user[0].profileImage} className="object-cover object-center" /></Link>
                :<div className="bg-[#949494] w-48 h-48 rounded-full"></div> }
            </div>
        <div className="flex flex-col gap-4">
            <div className="mt-4 flex flex-col gap-4">
                <input type="text" className="bg-gray-200 text-gray-600 rounded-lg py-2 px-8 focus:outline-0" disabled value = {`${user?.user[0].name}`} />
                <input type="text" className="bg-gray-200 text-gray-600 rounded-lg py-2 px-8 focus:outline-0" disabled value = {`${user?.user[0].email}`} />
            </div>
            <div className="mt-4">
                <Link className="flex justify-center bg-blue-600 text-white px-4 py-2 rounded-lg">Update</Link>
            </div>
            <div className="flex justify-between">
                <Link className="text-red-700">Delete Account</Link>
                <Link onClick={handleLogout} className="text-red-700">Log out</Link>
            </div>
        </div>
    </div>
  )
}
