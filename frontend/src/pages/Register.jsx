import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const { data } = await registerUser(form);
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

      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />

      <div className="w-full max-w-md fade-up relative z-10">
        <div className="text-center mb-10">
          <div className="float inline-block text-5xl mb-4">✦</div>
          <h1 style={{ fontFamily: "Syne, sans-serif", color: "var(--accent-light)" }}
            className="text-4xl font-extrabold tracking-tight">
            TaskFlow
          </h1>
          <p style={{ color: "var(--text-secondary)" }} className="mt-2 text-sm">
            Δημιούργησε δωρεάν λογαριασμό
          </p>
        </div>

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
            {[
              { label: "Όνομα", name: "name", type: "text", placeholder: "Γιώργης Παύλος" },
              { label: "Email",  name: "email", type: "email", placeholder: "you@example.com" },
              { label: "Κωδικός", name: "password", type: "password", placeholder: "••••••••" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label style={{ color: "var(--text-secondary)", fontFamily: "Syne" }}
                  className="text-xs font-semibold uppercase tracking-widest block mb-2">
                  {label}
                </label>
                <input
                  type={type} name={name}
                  placeholder={placeholder}
                  value={form[name]} onChange={handleChange} required
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)"
                  }}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500 transition-all placeholder-gray-600"
                />
              </div>
            ))}

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
              {loading ? "Δημιουργία..." : "Δημιουργία Λογαριασμού →"}
            </button>
          </form>

          <p style={{ color: "var(--text-secondary)" }} className="text-center text-sm mt-6">
            Έχεις ήδη λογαριασμό;{" "}
            <Link to="/login" style={{ color: "var(--accent-light)" }}
              className="font-semibold hover:underline">
              Σύνδεση
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;