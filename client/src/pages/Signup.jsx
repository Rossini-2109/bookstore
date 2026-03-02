import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login({
          token: data.token,
          email: formData.email,
          username: formData.name,
          role: data.user.role,
        });
        navigate("/");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-slate-50 font-sans overflow-hidden">
      {/* LEFT SIDE: VISUAL STAGE (Image) */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center bg-slate-900 overflow-hidden">
        {/* Quality Reading Image */}
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80"
          alt="Bookshelf"
          className="absolute inset-0 w-full h-full object-cover opacity-40 transform scale-110 motion-safe:animate-[pulse_10s_infinite]"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-slate-950 via-slate-900/80 to-slate-900/40" />

        {/* Info Card */}
        <div className="relative z-10 max-w-lg p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="w-12 h-1 bg-amber-500 mb-8 rounded-full" />
          <h3 className="text-4xl font-black text-white leading-[1.1] mb-6">
            Start your <br /> literacy{" "}
            <span className="text-amber-500 italic">journey</span> today.
          </h3>
          <p className="text-slate-300 text-lg font-medium mb-10 leading-relaxed">
            Join a community of thousands who share your passion for books, art,
            and storytelling.
          </p>

          <div className="grid gap-4">
            {[
              "Create your own reading wishlists",
              "Track your orders and deliveries",
              "Earn points on every purchase",
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

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-1 h-20 bg-gradient-to-b from-amber-500 to-transparent opacity-20" />
        <div className="absolute bottom-20 right-20 w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent opacity-20" />
      </div>

      {/* RIGHT SIDE: SIGNUP FORM */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white relative">
        <div className="absolute top-0 right-0 w-full h-1.5 bg-amber-500" />

        <div className="max-w-md w-full mx-auto relative z-10 py-10">
          {/* Logo Section */}
          <div className="mb-8 flex items-center gap-3">
            <div className=" rounded-xl shadow-lg shadow-amber-100">
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
              Create Account.
            </h2>
            <p className="text-slate-500 font-medium">
              Become a member and enjoy exclusive benefits.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-amber-600 transition-colors">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-200 transition-all text-slate-800 font-semibold placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-amber-600 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-200 transition-all text-slate-800 font-semibold placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-amber-600 transition-colors">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="•••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-200 transition-all text-slate-800 font-semibold placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-amber-600 transition-colors">
                  Confirm
                </label>
                <div className="relative">
                  <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="•••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-200 transition-all text-slate-800 font-semibold placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full py-4 mt-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-lg transition-all hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Registering...
                </>
              ) : (
                <>
                  Register Now
                  <FaArrowRight className="text-amber-500 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-slate-900 font-black hover:text-amber-600 transition-colors"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
