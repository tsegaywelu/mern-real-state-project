//here i will type all the routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import SignUp from "./pages/Signup";
import Signin from "./pages/signin";
import PrivateRoute from "./components/Privateroute";
import Profile from "./pages/Profile";
import Createlisting from "./pages/Createlisting";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<Createlisting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
