import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Home from './views/Home';
import Post from "./views/Post";
import Dashboard from "./views/Dashboard";
import {Logout} from "./api/AuthAPI";
import ProfilePage from "./views/ProfilePage";
import Settings from "./views/Dashboard/Settings";

const AuthRoutes = ({children}) => {
    let location = useLocation();
    return (
      localStorage.hasOwnProperty("user") ?
          children :
          <Navigate to={"/"} state={{from: location}} replace/>
  )
}

function App() {
  return (
    <Router>
      <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/logout"} element={<AuthRoutes><Logout/></AuthRoutes>} />
          <Route path={"/dashboard"} element={<AuthRoutes><Dashboard/></AuthRoutes>}/>
          <Route path={"/settings"} element={<AuthRoutes><Settings/></AuthRoutes>}/>

          <Route path={"/s/:postURL"} element={<Post/>}/>
          <Route path={"/@:username"} element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
