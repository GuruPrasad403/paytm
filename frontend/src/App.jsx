import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Signup from "./components/Signup."
import Signin from "./components/Signin"
import DashBoard from "./components/Dashboard"
import { Send } from "./components/Send"
import  { Toaster } from 'react-hot-toast';
import Previte from "./components/Previte";
import UserProvider from './context/UserContext'
function App() {

  return (
    <UserProvider>
      <Router>
          <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/" element={<Previte  />}>
          <Route index element={<DashBoard/>}/>
          <Route path="/send" element={<Send/>}/>
          </Route>
          </Routes>
          <Toaster />
      </Router>
      </UserProvider>
  )
}

export default App
