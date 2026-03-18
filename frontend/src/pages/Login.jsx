import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Κάτι πήγε στραβά");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--bg-primary)" }}
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />

      <div className="w-full max-w-md fade-up relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="float inline-block text-5xl mb-4">✦</div>
          <h1 style={{ fontFamily: "Syne, sans-serif", color: "var(--accent-light)" }}
            className="text-4xl font-extrabold tracking-tight">
            TaskFlow
          </h1>
          <p style={{ color: "var(--text-secondary)" }} className="mt-2 text-sm">
            Καλωσόρισες πίσω
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
        }} className="rounded-2xl p-8">

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
              className="text-red-400 px-4 py-3 rounded-xl mb-5 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label style={{ color: "var(--text-secondary)", fontFamily: "Syne" }}
                className="text-xs font-semibold uppercase tracking-widest block mb-2">
                Email
              </label>
              <input
                type="email" name="email"
                placeholder="you@example.com"
                value={form.email} onChange={handleChange} required
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)"
                }}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition-all placeholder-gray-600"
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontFamily: "Syne" }}
                className="text-xs font-semibold uppercase tracking-widest block mb-2">
                Κωδικός
              </label>
              <input
                type="password" name="password"
                placeholder="••••••••"
                value={form.password} onChange={handleChange} required
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)"
                }}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition-all placeholder-gray-600"
              />
            </div>

            <button type="submit" disabled={loading}
              style={{
                background: loading
                  ? "rgba(124,58,237,0.4)"
                  : "linear-gradient(135deg, #7c3aed, #06b6d4)",
                fontFamily: "Syne"
              }}
              className="w-full py-3 rounded-xl text-white font-bold text-sm tracking-wide
                         mt-2 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
                         disabled:cursor-not-allowed">
              {loading ? "Σύνδεση..." : "Σύνδεση →"}
            </button>
          </form>

          <p style={{ color: "var(--text-secondary)" }} className="text-center text-sm mt-6">
            Δεν έχεις λογαριασμό;{" "}
            <Link to="/register" style={{ color: "var(--accent-light)" }}
              className="font-semibold hover:underline">
              Εγγραφή
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;