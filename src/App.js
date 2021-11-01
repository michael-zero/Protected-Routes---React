import * as React from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";
import useAuth from "./useAuth";

const Home = () => <h1>Home (Public)</h1>;
const Pricing = () => <h1>Pricing (Public)</h1>;

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Settings = () => <h1>Settings (Private)</h1>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
 
  const handleLogin = () => {
    // location.state
    login().then(() => {
      navigate(location.state || "/dashboard");
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

function PrivateRoute({ element, path }) {
  const { authed } = useAuth();
  console.log("chegou aqui");
  console.log(path)
  const ele =
    authed === true ? (
      element
    ) : (
      <Navigate to="/login" replace state={{ path }} />
    );

  return <Route path={path} element={ele} />;
}

function Nav() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
      </ul>
      {authed && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default function App() {
  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <PrivateRoute path="/dashboard" element={<Dashboard />} />
        <PrivateRoute path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
