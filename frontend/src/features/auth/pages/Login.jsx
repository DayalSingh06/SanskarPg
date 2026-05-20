import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios.js";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { validateField } from "../../../utils/validation.js";
import FormField from "../components/form-fields/FormField.jsx";
import PasswordField from "../components/form-fields/PasswordField.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import UpdatePassword from "./UpdatePassword.jsx";

import {
  MailIcon,
  SunIcon,
  MoonIcon,
} from "../../../components/common/icons/SvgIcons.jsx";

export default function Login() {
  const { darkMode, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [resetUserId, setResetUserId] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (Object.values(newErrors).some((err) => err)) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/users/login", {
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      const data = res.data;

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      // role based navigation
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      let message = "Server error. Try again";

      if (!error.response) {
        message = "Network error. Check your internet";
      } else {
        message = error.response.data?.message || message;
      }
      setErrors((prev) => ({
        ...prev,
        password: message,
      }));
    } finally {
      setLoading(false);
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
        relative
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

        {/* Login Card */}
        <div
          className={`
          flex flex-col
          w-full max-w-md
          p-5
          rounded-2xl
          shadow-xl
          backdrop-blur-md
          items-center
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
            mt-4
            p-4
            rounded-md
            sm:p-5
            md:p-6
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
              Welcome
            </h2>

            <p
              className="
              mb-4
              text-xs
              sm:mb-6 sm:text-sm
            "
            >
              Please enter your details to sign in
            </p>

            {/* Email */}
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

            {/* Password */}
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

            {/* Forgot Password */}
            <div
              className="
              flex
              mt-3 mb-3
              text-sm
              justify-end
            "
            >
              <span
                onClick={() => setShowForgot(true)}
                className="
                text-red-600
                cursor-pointer
              "
              >
                Forgot Password?
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              mt-4 py-2
              text-white
              bg-indigo-600
              rounded-md
              cursor-pointer
              hover:bg-indigo-700 transition
              disabled:bg-indigo-300
              disabled:cursor-not-allowed
            "
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Register */}
            <p
              className="
              mt-6
              text-md text-center
            "
            >
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="
                text-[#3d5de0]
                font-medium
                relative
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-0.5
                after:w-0
                after:bg-[#3d5de0]
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
              >
                Create Account
              </Link>
            </p>
          </form>

          {/* Footer */}
          <footer className="mt-4 text-center">
            <span className="text-xs text-[#6b7387]">
              © {new Date().getFullYear()} Sanskar Boy's PG. All rights
              reserved.
            </span>
          </footer>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPassword
          darkMode={darkMode}
          isOpen={showForgot}
          onClose={(data) => {
            setShowForgot(false);

            if (data?.userId) {
              setResetUserId(data.userId);
              setShowUpdatePassword(true);
            }
          }}
        />

        {/* Update Password Modal */}
        <UpdatePassword
          isOpen={showUpdatePassword}
          userId={resetUserId}
          onClose={() => {
            setShowUpdatePassword(false);
            setResetUserId(null);
          }}
        />
      </div>
    </>
  );
}
