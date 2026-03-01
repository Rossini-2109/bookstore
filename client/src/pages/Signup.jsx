import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-500">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 border rounded"
        />

        <button className="bg-orange-600 hover:bg-orange-700 text-white w-full py-2 rounded">
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 font-semibold">
            Login
          </Link>
        </p>
      </div>

    </div>
  );
};

export default Signup;