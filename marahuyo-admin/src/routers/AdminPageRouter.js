import Login from "../pages/login/Login";
import SignUp from "../pages/login/SignUp";
import Forgot from "../pages/login/Forgot";
import Code from "../pages/login/Code";
import Change from "../pages/login/Change";
import Dashboard from "../pages/main/Dashboard";
import Users from "../pages/main/Users";
import EditAccount from "../pages/main/EditAccount";
import EditUser from "../pages/main/EditUser";

const login = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/forgot",
        element: <Forgot />
    },
    {
        path: "/code/:email",
        element: <Code />
    },
    {
        path: "/change/:id",
        element: <Change />
    }
]

const main = [
    {
        path: "/dashboard/:id",
        element: <Dashboard />
    },
    {
        path: "/users/:id",
        element: <Users />
    },
    {
        path: "/edit/:user/:id",
        element: <EditAccount />
    },
    {
        path: "/settings/:id",
        element: <EditUser />
    }
]

const AdminPageRouter = [
    ...login,
    ...main
]

export default AdminPageRouter;