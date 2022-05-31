import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddPost from "./Pages/Home/AddPost";
import Home from "./Pages/Home/Home";
import MyPost from "./Pages/Home/MyPost";
import Navbar from "./Pages/Home/Navbar";
import SingleBlog from "./Pages/Home/SingleBlog";
import UpdateProfile from "./Pages/Home/UpdateProfile";
import Login from "./Pages/Login/Login";
import Fotter from "./Pages/Shared/Fotter";
import NotFound from "./Pages/Shared/NotFound";
import RequireAuth from "./Pages/Shared/RequireAuth";
import Signup from "./Pages/SIgnup/Signup";

function App() {
  return (
    <div className="w-7xl mx-auto md:px-12">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/add-blog" element={
          <RequireAuth>
            <AddPost/>
          </RequireAuth>
        }></Route>
        
        <Route path="/blog/:id" element={<SingleBlog></SingleBlog>}></Route>
        <Route path="my-post" element={<RequireAuth>
          <MyPost></MyPost>
        </RequireAuth>}></Route>
        <Route path="/update-profile" element={<RequireAuth>
           <UpdateProfile></UpdateProfile>
        </RequireAuth>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Fotter></Fotter>
    </div>
  );
}

export default App;
