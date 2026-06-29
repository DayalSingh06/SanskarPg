import { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../../../utils/axios';

export default function Otp({
  isOpen,
  onVerify,
  onClose,
  userId,
  apiError,
  darkMode,
  isVerifying,
}) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const verifyingRef = useRef(false);
  const lastSubmittedOtpRef = useRef('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);

  const otpString = otp.join('');

  useEffect(() => {
    if (isOpen) {
      setOtp(Array(6).fill(''));
      setError('');
      setMessage('');
      setTimer(30);
      verifyingRef.current = false;
      lastSubmittedOtpRef.current = '';
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setError('');
    setMessage('');
    lastSubmittedOtpRef.current = '';

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    const newOtp = paste.split('');

    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
    setError('');
    setMessage('');
    lastSubmittedOtpRef.current = '';
  };

  const handleVerify = useCallback(async () => {
    if (isVerifying || verifyingRef.current) return;

    if (!userId) {
      setError('User not found');
      return;
    }

    if (otpString.length !== 6 || otp.includes('')) {
      setError('Enter valid OTP');
      return;
    }

    if (lastSubmittedOtpRef.current === otpString) return;

    try {
      verifyingRef.current = true;
      lastSubmittedOtpRef.current = otpString;
      setError('');

      await onVerify(otpString, userId);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      verifyingRef.current = false;
    }
  }, [isVerifying, onVerify, otp, otpString, userId]);

  useEffect(() => {
    if (otpString.length === 6 && !otp.includes('')) {
      handleVerify();
    }
  }, [otpString, otp, handleVerify]);

  const handleResend = async () => {
    if (!userId || timer > 0 || resending) return;

    try {
      setResending(true);
      setError('');
      setMessage('');
      lastSubmittedOtpRef.current = '';

      await axios.post('/api/users/resend-otp', { userId });

      setMessage('OTP sent again');
      setOtp(Array(6).fill(''));
      setTimer(30);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    } finally {
      setResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`w-full max-w-sm rounded-xl p-6 shadow-xl transition ${
          darkMode
            ? 'bg-linear-to-br from-[#0f0c1c] to-[#1a1633] text-white'
            : 'bg-white'
        }`}
      >
        <h2 className="mb-4 text-center text-xl font-semibold">Verify OTP</h2>

        <div className="mb-4 flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isVerifying || verifyingRef.current}
              className={`h-12 w-10 rounded-lg text-center text-lg font-semibold transition-all duration-200 outline-none ${
                darkMode
                  ? 'border border-gray-700 bg-[#16132b] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  : 'border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              }`}
            />
          ))}
        </div>

        {message && <p className="text-sm text-green-500">{message}</p>}

        {(error || apiError) && (
          <p className="text-sm text-red-500">{error || apiError}</p>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleVerify}
            disabled={
              isVerifying ||
              verifyingRef.current ||
              otpString.length !== 6 ||
              lastSubmittedOtpRef.current === otpString
            }
            className="w-full rounded-lg bg-indigo-600 py-2 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isVerifying || verifyingRef.current ? 'Verifying...' : 'Verify'}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0 || resending}
            className="w-full rounded-lg bg-gray-300 py-2 transition hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {resending
              ? 'Sending...'
              : timer > 0
                ? `Resend (${timer}s)`
                : 'Resend'}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isVerifying || verifyingRef.current}
          className="mt-3 w-full rounded-lg bg-gray-400 py-2 transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
