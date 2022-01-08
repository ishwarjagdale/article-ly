import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Home from './views/Home';
import Post from "./views/Post";
import Dashboard from "./views/Dashboard";
import SignUpPage from "./views/SignUpPage";
import {Logout} from "./api/SignUp";
import ProfilePage from "./views/ProfilePage";
import Settings from "./views/Dashboard/Settings";
import NewStory from "./views/NewStory";

const AuthRoutes = ({children}: {children: JSX.Element}) => {
    let location = useLocation();
    return (
      localStorage.hasOwnProperty("user") ?
          children :
          <Navigate to={"/sign-in"} state={{from: location}} replace/>
  )
}

function App() {
  return (
    <Router>
      <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/sign-in"} element={<SignUpPage/>}/>
          <Route path={"/logout"} element={<AuthRoutes><Logout/></AuthRoutes>} />
          <Route path={"/dashboard"} element={<AuthRoutes><Dashboard/></AuthRoutes>}/>
          <Route path={"/settings"} element={<AuthRoutes><Settings/></AuthRoutes>}/>
          <Route path={"/new-story"} element={<AuthRoutes><NewStory/></AuthRoutes>}/>
          <Route path={"/s/:postURL"} element={<Post/>}/>
          <Route path={"/@:username"} element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
