import Login from "../components/Login";
import DriverLogin from "../components/DriverLogin";
import DriverSignUp from "../components/DriverSignUp";
import Home from "../components/Home";
import SignUp from "../components/SignUp";

const path = {
  login: {
    path: "/login",
    component: Login,
    header: true,
  },
  driverLogin: {
    path: "/driver-login",
    component: DriverLogin,
    header: true,
  },
  driverSignUp: {
    path: "/driver-signup",
    component: DriverSignUp,
    header: true,
  },
  home: {
    path: "/",
    component: Home,
    header: true,
  },
  signUp: {
    path: "/signup",
    component: SignUp,
    header: true,
  },
  // Add other paths as needed
};

export default path;
