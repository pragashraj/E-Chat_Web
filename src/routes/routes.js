import Home from '../screens/Home/Home'
import SignIn from '../screens/SignIn/SignIn'
import SignUp from '../screens/SignUp/SignUp'

const routes = {
    data: [
        {
            name: "SignIn",
            path: "/",
            component: SignIn,
            type: "main",
        },
        {
            name: "SignUp",
            path: "/sign-Up",
            component: SignUp,
            type: "",
        },
        {
            name: "Home",
            path: "/home",
            component: Home,
            type: "main",
        },
    ]
}

export default routes