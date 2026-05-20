import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios.js";
import { useTheme } from "../../../context/ThemeContext.jsx";
import Otp from "./Otp.jsx";
import FormField from "../components/form-fields/FormField.jsx";
import PasswordField from "../components/form-fields/PasswordField.jsx";
import {
  MailIcon,
  RegisterUser,
  MobileIcon,
  SunIcon,
  MoonIcon,
} from "../../../components/common/icons/SvgIcons.jsx";
import {
  validateField,
  validateForm,
  getPasswordStrength,
} from "../../../utils/validation.js";

export default function Register() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "admission",
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [otpState, setOtpState] = useState({
    isOpen: false,
    userId: null,
    error: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && !/^\d{0,10}$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, {
        ...formData,
        [name]: value,
      }),
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name], formData),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) return;

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    setTouched(
      Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}),
    );

    if (Object.keys(newErrors).length !== 0) return;

    try {
      setIsRegistering(true);
      setGlobalError(null);

      const { confirmPassword, ...payload } = formData;

      const response = await axios.post("/api/users/register", payload);

      if (response?.data?.success && response?.data?.showOtpModal) {
        setOtpState({
          isOpen: true,
          userId: response.data.userId,
          error: "",
        });
      }
    } catch (err) {
      const data = err.response?.data;

      const backendMessage = data?.message || "Something went wrong";

      // Email field error
      if (data?.field === "email") {
        setErrors((prev) => ({
          ...prev,
          email: backendMessage,
        }));

        setTouched((prev) => ({
          ...prev,
          email: true,
        }));
      } else {
        setGlobalError(backendMessage);
      }
    }
  };

  const handleOtpVerify = async (otp) => {
    try {
      setIsVerifyingOtp(true);
      await axios.post("/api/users/verify-otp", {
        otp,
        userId: otpState.userId,
      });
      setOtpState({
        isOpen: false,
        userId: null,
        error: "",
      });
      setFormData(initialState);

      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "OTP verification failed";
      setOtpState((prev) => ({
        ...prev,
        error: msg,
      })); // or you can show inline error in modal
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <>
      <div
        className={`
          flex
          min-h-screen
          px-4 py-6
          select-none
          items-center justify-center
          ${darkMode ? "bg-[#0f0c1c] text-white" : "bg-[#f8fafc] text-[#0f0c1c]"}
        `}
      >
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
          flex
          w-10 h-10
          rounded-full
          absolute right-4 top-4
          items-center justify-center transition
          ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-300 hover:bg-gray-400"
          }
        `}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
        <div
          className={`
            flex flex-col
            w-full max-w-md
            p-5
            rounded-2xl
            shadow-xl
            backdrop-blur-md items-center
            sm:p-6
            ${
              darkMode
                ? "bg-[#181525] border border-gray-800 text-gray-200"
                : "bg-white border border-gray-200 text-[#0f0c1c]"
            }
          `}
        >
          <form
            onSubmit={handleSubmit}
            className={`
              w-full
              mt-2 mb-3 p-4
              rounded-md
              sm:mt-3 sm:p-5
              md:mt-4 md:p-6
              ${
                darkMode
                  ? "border border-gray-800 text-gray-200"
                  : "border border-gray-200 text-[#0f0c1c]"
              }
            `}
          >
            <h2
              className="
                mb-1
                text-xl font-semibold
                sm:text-2xl
              "
            >
              Register
            </h2>

            {globalError && (
              <p
                className="
                  mb-2
                  text-red-500 text-xs
                "
              >
                {globalError}
              </p>
            )}

            <p
              className="
                mb-4
                text-xs
                sm:mb-6 sm:text-sm
                md:text-md
              "
            >
              Please enter your details to sign up
            </p>

            {/* ----------------- Name ----------------- */}
            <FormField
              label="Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              icon={<RegisterUser />}
              darkMode={darkMode}
            />

            {/* ----------------- Email ----------------- */}
            <FormField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              icon={<MailIcon />}
              darkMode={darkMode}
            />

            {/* ----------------- Mobile ----------------- */}
            <FormField
              label="Mobile"
              id="mobile"
              name="mobile"
              type="text"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.mobile}
              touched={touched.mobile}
              icon={<MobileIcon />}
              darkMode={darkMode}
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
            />

            {/* ----------------- Password ----------------- */}
            <PasswordField
              label="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              darkMode={darkMode}
            />

            {/* Password Strength */}
            {formData.password && (
              <p
                className={`
                  text-xs
                  ${
                    strength === "Weak"
                      ? "text-red-500"
                      : strength === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }
                `}
              >
                Strength: {strength}
              </p>
            )}

            {/* ----------------- Confirm Password ----------------- */}

            <PasswordField
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              darkMode={darkMode}
            />

            {/* ----------------- Submit ----------------- */}
            <button
              type="submit"
              disabled={isRegistering}
              className="
                w-full
                mt-4 py-2
                text-white
                bg-indigo-600
                rounded-md
                hover:bg-indigo-700 transition disabled:bg-indigo-300
              "
            >
              {isRegistering ? "Sending OTP..." : "Register"}
            </button>

            <p
              className="
                mt-6
                text-md text-center
                cursor-pointer
                sm:text-md
              "
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="
                  text-[#3d5de0] font-medium
                  relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#3d5de0] after:transition-all after:duration-300 hover:after:w-full
                "
              >
                Sign in
              </Link>
            </p>
          </form>
          <footer
            className="
              mt-auto py-2
              text-center
            "
          >
            <span
              className="
                text-xs text-[#6b7387]
              "
            >
              © {new Date().getFullYear()} Sanskar Boy's PG. All rights
              reserved.{" "}
            </span>
          </footer>
        </div>
      </div>
      <Otp
        darkMode={darkMode}
        isOpen={otpState.isOpen}
        userId={otpState.userId}
        apiError={otpState.error}
        onVerify={handleOtpVerify}
        isVerifying={isVerifyingOtp}
        onClose={() => {
          setOtpState({
            isOpen: false,
            userId: null,
            error: "",
          });
          setGlobalError(null);
          setIsVerifyingOtp(false);
        }}
      />
    </>
  );
}
