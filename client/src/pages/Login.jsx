import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png"; // Importing your logo

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login({
          token: data.token,
          email: email,
          username: data.user.username,
          role: data.user.role,
        });

        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          navigate(redirectPath);
          localStorage.removeItem("redirectAfterLogin");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-slate-50 font-sans overflow-hidden">
      {/* LEFT SIDE: LOGIN FORM (Clean & Focused) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-20 bg-white relative">
        {/* Subtle Branding Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />

        <div className="max-w-md w-full mx-auto relative z-10">
          {/* Logo Section - Matching Navbar */}
          <div className="mb-8 flex items-center gap-3">
            <div className="  rounded-xl shadow-lg shadow-amber-100">
              <img
                src={logo}
                alt="Book Store"
                className="h-7 w-auto object-contain"
              />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-800 italic">
              BOOK <span className="text-amber-500">STORE</span>
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Welcome Back.
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Enter your credentials to access your collection.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="group">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-amber-600 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-200 transition-all text-slate-800 font-semibold"
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between mb-2 ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest group-focus-within:text-amber-600 transition-colors">
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  FORGOT?
                </Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-200 transition-all text-slate-800 font-semibold"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="group w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-lg transition-all hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <FaArrowRight className="text-amber-500 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          <div className="mt-8 py-4 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-slate-900 font-black hover:text-amber-600 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: PROFESSIONAL VISUAL STAGE */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center bg-slate-900 overflow-hidden">
        {/* Quality Library Background */}
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80"
          alt="Library"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-900/40" />

        {/* Info Card */}
        <div className="relative z-10 max-w-lg p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="w-12 h-1 bg-amber-500 mb-8 rounded-full" />
          <h3 className="text-4xl font-black text-white leading-[1.1] mb-6">
            Discover the world <br /> through{" "}
            <span className="text-amber-500 italic">curated</span> pages.
          </h3>
          <p className="text-slate-300 text-lg font-medium mb-10 leading-relaxed">
            Unlock thousands of titles, exclusive stationery, and a community of
            passionate readers.
          </p>

          <div className="grid gap-4">
            {[
              "Curated weekly recommendations",
              "Manage your digital bookshelf",
              "Exclusive member-only discounts",
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 text-slate-100 bg-white/5 p-4 rounded-2xl border border-white/5"
              >
                <FaCheckCircle className="text-amber-500 shrink-0" size={18} />
                <span className="font-bold text-sm tracking-wide">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Accents */}
        <div className="absolute top-20 right-20 w-1 h-20 bg-gradient-to-b from-amber-500 to-transparent opacity-20" />
        <div className="absolute bottom-20 left-20 w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent opacity-20" />
      </div>
    </div>
  );
};

export default Login;
