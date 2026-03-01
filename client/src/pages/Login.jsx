import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return;

    // ✅ MOCK JWT TOKEN
    localStorage.setItem("token", "mock-jwt-token");
    localStorage.setItem("userEmail", email);

    // ✅ Set role
    if (email === "admin@gmail.com") {
      localStorage.setItem("role", "admin");
    } else {
      localStorage.setItem("role", "user");
    }

    // ✅ Redirect back if exists
    const redirectPath = localStorage.getItem("redirectAfterLogin");

    if (redirectPath) {
      navigate(redirectPath);
      localStorage.removeItem("redirectAfterLogin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleLogin}
          className="bg-orange-600 hover:bg-orange-700 text-white w-full py-2 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;