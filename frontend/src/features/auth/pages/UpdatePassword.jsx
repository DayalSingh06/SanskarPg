import { useState } from "react";
import axios from "../../../utils/axios.js";
import { useTheme } from "../../../context/ThemeContext.jsx";
import PasswordField from "../components/form-fields/PasswordField.jsx";
import {
  validateField,
  getPasswordStrength,
} from "../../../utils/validation.js";

export default function UpdatePassword({ userId, isOpen, onClose }) {
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  if (!isOpen) return null;

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, formData),
      }));
    }
  };

  // handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, formData),
    }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const newErrors = {
      password: validateField("password", formData.password, formData),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword,
        formData,
      ),
    };

    setErrors(newErrors);
    setTouched({
      password: true,
      confirmPassword: true,
    });

    if (Object.values(newErrors).some((err) => err)) return;

    try {
      setLoading(true);

      await axios.post("/api/users/forgot-password/reset", {
        userId,
        password: formData.password.trim(),
        confirmPassword: formData.confirmPassword.trim(),
      });

      onClose();
    } catch (error) {
      let message = "Server error";

      if (!error.response) {
        message = "Network error";
      } else {
        message = error.response.data?.message || message;
      }

      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`
          w-full max-w-sm p-6 rounded-lg
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-[#0f0c1c]"}
        `}
      >
        <h2 className="mb-4 text-lg font-semibold">Update Password</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* Password */}
          <PasswordField
            label="New Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            darkMode={darkMode}
          />

          {/* Strength */}
          {formData.password && (
            <p
              className={`text-xs mt-1 ${
                strength === "Weak"
                  ? "text-red-500"
                  : strength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
              }`}
            >
              Strength: {strength}
            </p>
          )}

          {/* Confirm Password */}
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

          {/* Server Error */}
          {serverError && (
            <p className="text-red-500 text-sm mt-2">{serverError}</p>
          )}

          {/* Buttons */}
          <div className="flex mt-4 gap-2">
            <button
              type="submit"
              disabled={loading}
              className={`
                flex-1 py-2 text-white rounded
                ${
                  darkMode
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }
                disabled:bg-indigo-300 disabled:cursor-not-allowed
              `}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`
                flex-1 py-2 border rounded
                ${
                  darkMode
                    ? "border-gray-700 text-white hover:bg-gray-800"
                    : "border-gray-300 text-[#0f0c1c] hover:bg-gray-100"
                }
              `}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
