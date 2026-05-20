import { useEffect, useRef, useState } from "react";
import axios from "../../../utils/axios";

export default function Otp({
  isOpen,
  onVerify,
  onClose,
  userId,
  apiError,
  darkMode,
  isVerifying,
}) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);

  // Reset
  useEffect(() => {
    if (isOpen) {
      setOtp(Array(6).fill(""));
      setError("");
      setMessage("");
      setTimer(30);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  // Timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Paste
  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = paste.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
  };

  const otpString = otp.join("");

  // VERIFY
  const handleVerify = async () => {
    if (isVerifying) return;

    if (!userId) {
      setError("User not found");
      return;
    }

    if (otpString.length !== 6) {
      setError("Enter valid OTP");
      return;
    }

    try {
      await onVerify(otpString, userId);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  // AUTO VERIFY
  useEffect(() => {
    if (otpString.length === 6 && !otp.includes("") && !isVerifying) {
      handleVerify();
    }
  }, [otpString]);

  // RESEND
  const handleResend = async () => {
    if (!userId || timer > 0) return;

    try {
      setResending(true);
      setError("");
      setMessage("");

      await axios.post("/api/users/resend-otp", { userId });

      setMessage("OTP sent again");
      setTimer(30);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    } finally {
      setResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        flex z-50
        bg-black/60
        fixed inset-0 items-center justify-center backdrop-blur-sm
      "
    >
      <div
        className={`
          w-full max-w-sm
          p-6
          rounded-xl
          shadow-xl
          transition
          ${
            darkMode
              ? "bg-linear-to-br from-[#0f0c1c] to-[#1a1633] text-white"
              : "bg-white"
          }
        `}
      >
        <h2
          className="
            mb-4
            text-xl font-semibold text-center
          "
        >
          🔐 Verify OTP
        </h2>

        {/* OTP BOXES */}
        <div
          className="
            flex
            mb-4
            justify-between gap-2
          "
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isVerifying}
              className={`
                w-10 h-12
                text-center text-lg font-semibold
                rounded-lg
                transition-all
                outline-none duration-200
                ${
                  darkMode
                    ? "bg-[#16132b] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    : "border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                }
              `}
            />
          ))}
        </div>

        {/* Messages */}
        {message && (
          <p
            className="
            text-green-500 text-sm
          "
          >
            {message}
          </p>
        )}
        {(error || apiError) && (
          <p
            className="
              text-red-500 text-sm
            "
          >
            {error || apiError}
          </p>
        )}

        {/* Buttons */}
        <div
          className="
            flex
            mt-4
            gap-2
          "
        >
          <button
            onClick={handleVerify}
            disabled={isVerifying || otpString.length !== 6}
            className="
              w-full
              py-2
              text-white
              bg-indigo-600
              rounded-lg
              hover:bg-indigo-700 transition
            "
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>

          <button
            onClick={handleResend}
            disabled={timer > 0 || resending}
            className="
              w-full
              py-2
              bg-gray-300
              rounded-lg
              hover:bg-gray-400 transition
            "
          >
            {timer > 0 ? `Resend (${timer}s)` : "Resend"}
          </button>
        </div>

        {/* Cancel */}
        <button
          onClick={onClose}
          disabled={isVerifying}
          className="
            w-full
            mt-3 py-2
            bg-gray-400
            rounded-lg
            hover:bg-gray-500 transition
          "
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
