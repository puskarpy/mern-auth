import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { CircleUser } from 'lucide-react'

export default function Header() {

  const {user} = useSelector(state => state.user)

  return (
    <div className="flex justify-between items-center bg-neutral-100 px-12 py-3">
        <div>
          <Link className="text-4xl font-bold tracking-tighter">Auth</Link>
        </div>
        <div className="flex gap-8">
          <Link to={'/'}>Home</Link>
          <Link to={'/about'}>About</Link>
        </div>
        { user ?
          <div className="flex gap-6 items-center">
            <Link to={'/profile'} className="">
              {user.user[0].profileImage?
              <div className="overflow-hidden rounded-full"><img src={user.user[0].profileImage} alt="profile image" className="w-7 h-7 object-cover" /></div>
                :<CircleUser size={30} color="#848484"/>
                }
            </Link>
        </div> :
        <div className="flex gap-6">
            <Link to={'/login'} className="bg-blue-700 text-white hover:opacity-90 px-4 py-2 rounded-sm">Log in</Link>
        
        </div>}
    </div>
  )
}
