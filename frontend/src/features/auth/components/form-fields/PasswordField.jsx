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
        className="
          block
          mb-1 mt-3
          text-xs
          sm:text-sm
          md:text-sm
        "
      >
        {label}
      </label>

      {/* Input */}
      <div
        className="
          w-full
          relative
        "
      >
        <input
          id={id}
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full
            px-3 pr-10 py-2
            text-sm
            rounded-md border
            focus:outline-none focus:ring-1 focus:ring-indigo-300
            sm:px-4 sm:pr-11 sm:text-base
            ${
              darkMode
                ? "border-gray-800 text-gray-200"
                : "border-gray-200 text-[#0f0c1c]"
            }
          `}
        />

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="
            text-[#505b73]
            absolute right-2 top-1/2 -translate-y-1/2
            sm:right-3
          "
        >
          {show ? <EyeOnIcon /> : <EyeOffIcon />}
        </button>
      </div>

      {/* Error */}
      {touched && error && (
        <p
          className="
          text-red-500 text-xs
        "
        >
          {error}
        </p>
      )}
    </>
  );
}
