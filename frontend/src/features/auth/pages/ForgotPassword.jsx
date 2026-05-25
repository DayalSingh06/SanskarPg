import { useState, useEffect } from "react";
import { emailRegex } from "../../../utils/validation.js";
import axios from "../../../utils/axios.js";

export default function ForgotPassword({ isOpen, onClose, darkMode }) {
  const [step, setStep] = useState("EMAIL");

  const [form, setForm] = useState({
    email: "",
    otp: "",
  });

  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  /* TIMER */
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!isOpen) return null;

  /* CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "otp") {
      setForm((prev) => ({
        ...prev,
        otp: value.replace(/\D/g, ""),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setError("");
  };

  /* SEND OTP */
  const sendOtp = async () => {
    setError("");
    setMessage("");

    const email = form.email.trim();

    if (!email) return setError("Please enter your email");
    if (!emailRegex.test(email)) return setError("Enter valid email");

    try {
      setLoading(true);

      const { data } = await axios.post("/api/users/forgot-password/send-otp", {
        email,
      });

      setUserId(data.userId);
      setStep("OTP");
      setMessage("OTP sent successfully");
      setTimer(30);
    } catch (error) {
      const data = error.response?.data;

      if (data?.field === "email") {
        setError(data.message);
      } else {
        setError(data?.message || "Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  /* VERIFY OTP */
  const verifyOtp = async () => {
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(form.otp)) {
      return setError("Enter valid 6-digit OTP");
    }

    try {
      setLoading(true);

      await axios.post("/api/users/forgot-password/verify-otp", {
        userId,
        otp: form.otp,
      });

      onClose({ userId, verified: true });
    } catch (error) {
      setError(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* RESEND */
  const resendOtp = async () => {
    if (timer > 0) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await axios.post("/api/users/forgot-password/send-otp", {
        email: form.email.trim(),
      });

      setMessage("OTP resent");
      setTimer(30);
    } catch (error) {
      const data = error.response?.data;

      if (data?.field === "email") {
        setError(data.message);
      } else {
        setError(data?.message || "Failed to resend OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  /* CANCEL */
  const handleCancel = () => {
    setStep("EMAIL");
    setForm({ email: "", otp: "" });
    setUserId(null);
    setError("");
    setMessage("");
    setTimer(0);
    onClose(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-2xl p-6 shadow-2xl transition-all ${darkMode ? "bg-[#0f0c1c] text-white" : "bg-white text-gray-900"} `}
      >
        {/* TITLE */}
        <h2 className="mb-1 text-xl font-semibold">Forgot Password</h2>

        <p className="mb-4 text-xs text-gray-500">
          {step === "EMAIL"
            ? "Enter your email to receive OTP"
            : "Enter OTP sent to your email"}
        </p>

        {/* STEP INDICATOR */}
        <div className="mb-4 flex gap-2">
          <div
            className={`h-1 flex-1 rounded ${step === "EMAIL" ? "bg-indigo-600" : "bg-green-500"}`}
          />
          <div
            className={`h-1 flex-1 rounded ${step === "OTP" ? "bg-indigo-600" : "bg-gray-300"}`}
          />
        </div>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          disabled={step === "OTP"}
          onChange={handleChange}
          className={`mb-3 w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 ${
            darkMode
              ? "border-gray-700 bg-[#16132b] text-white placeholder-gray-400"
              : "border-gray-300 bg-gray-50 text-gray-900"
          } `}
        />

        {/* OTP */}
        {step === "OTP" && (
          <input
            type="text"
            name="otp"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={form.otp}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 text-center text-lg tracking-widest outline-none focus:ring-2 focus:ring-indigo-400 ${
              darkMode
                ? "border-gray-700 bg-[#16132b] text-white"
                : "border-gray-300 bg-gray-50 text-gray-900"
            } `}
          />
        )}

        {/* ERROR / MESSAGE */}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {message && <p className="mt-2 text-sm text-green-500">{message}</p>}

        {/* BUTTONS */}
        <div className="mt-5 flex flex-col gap-2">
          {step === "EMAIL" ? (
            <>
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 py-2.5 text-white transition hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {loading ? "Sending..." : "Get OTP"}
              </button>

              <button
                onClick={handleCancel}
                className="w-full rounded-lg border py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 py-2.5 text-white transition hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={resendOtp}
                disabled={loading || timer > 0}
                className="w-full rounded-lg border py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </button>

              <button
                onClick={handleCancel}
                className="w-full rounded-lg border py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
