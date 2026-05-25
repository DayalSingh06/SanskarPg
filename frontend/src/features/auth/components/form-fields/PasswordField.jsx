import { useState } from "react";
import {
  EyeOnIcon,
  EyeOffIcon,
} from "../../../../components/common/icons/SvgIcons";

export default function PasswordField({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  darkMode,
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Label */}
      <label
        htmlFor={id}
        className="mt-3 mb-1 block text-xs sm:text-sm md:text-sm"
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative w-full">
        <input
          id={id}
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full rounded-md border px-3 py-2 pr-10 text-sm focus:ring-1 focus:ring-indigo-300 focus:outline-none sm:px-4 sm:pr-11 sm:text-base ${
            darkMode
              ? "border-gray-800 text-gray-200"
              : "border-gray-200 text-[#0f0c1c]"
          } `}
        />

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-[#505b73] sm:right-3"
        >
          {show ? <EyeOnIcon /> : <EyeOffIcon />}
        </button>
      </div>

      {/* Error */}
      {touched && error && <p className="text-xs text-red-500">{error}</p>}
    </>
  );
}
