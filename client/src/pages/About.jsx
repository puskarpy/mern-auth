import React from 'react'

export default function About() {
  return (
    <div className='p-8 flex flex-col gap-2'>
      <h1 className='text-3xl font-bold tracking-tight'>MERN Authentication App</h1>
      <p>
        This project is a simple authentication app I built to understand and implement the core concepts of user login and registration in web applications. The app allows users to create an account, log in, and log out securely. I used cookies to handle authentication so that sessions are managed in a safe and reliable way, while Redux was used to manage user state across the frontend.
      </p>
      <p>
        The main purpose of this app was to practice working with authentication flows, including storing tokens in cookies, fetching user details through protected routes, and managing state updates without requiring a page refresh. It also gave me experience in handling login/logout logic on both the backend and frontend, as well as integrating persistent state with Redux.
      </p>
      <p>
        You can get the source code here : <a href="" className='text-blue-700 underline'>Source code</a>
      </p>
    </div>
  )
}
