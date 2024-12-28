import { BrowserRouter,Routes,Route } from "react-router"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"

function App() {
  return (
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/sign-in' element={<SignIn/>}></Route>
      <Route path='/sign-up' element={<SignUp/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App