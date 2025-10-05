import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import AuthValidator from './components/AuthValidator.jsx'
import Home from './pages/Home.jsx'
import Layout from './Layout.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import { ProtectedLayout } from './ProtectedLayout.jsx'
import About from './pages/About.jsx'

const routes = createBrowserRouter([
  {
    element : <Layout/>,
    children : [
      {
        element : <Home/>,
        path : '/'
      },
      {
        element : <About/>,
        path : '/about'
      },
      {
        element : <Signup/>,
        path : '/signup'
      },
      {
        element : <Login/>,
        path : '/login'
      },
      {
        element : <ProtectedLayout> <Profile/> </ProtectedLayout>,
        path : '/profile'
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <AuthValidator>
          <RouterProvider router={routes}>
          </RouterProvider>
        </AuthValidator>
      </PersistGate>
    </Provider>
  </StrictMode>
)
