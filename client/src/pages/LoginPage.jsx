import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import logo from "../assets/RAFFLESIA-01.png";
import api from "../services/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/admin");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo / Branding */}
        <div className="text-center space-y-2">
          <img src={logo} alt="logo" className="h-12 mx-auto" />
          <h1 className="text-xl font-semibold text-[var(--color-primary)]">
            Rafflesia House
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Staff Access Only
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
          className="card-base p-6 space-y-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Lock size={16} />
            <span>Authorized personnel only</span>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-200 p-2 rounded">
              {errorMsg}
            </div>
          )}

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-[var(--color-border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[var(--color-border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Visitor Notice */}
        <p className="text-xs text-center text-[var(--color-text-muted)]">
          This page is intended for Rafflesia House staff and administrators
          only.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
