export default function FormField({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon,
  darkMode,
  autoComplete = "off",
  ...rest
}) {
  return (
    <>
      {/* Label */}
      <label
        htmlFor={id}
        className={`
          block
          mb-1 mt-3
          text-xs
          sm:text-sm
          md:text-md
          ${darkMode ? "text-gray-300" : "text-[#0f0c1c]"}
        `}
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
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
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

        {/* Icon */}
        {icon && (
          <span
            className="
              text-[#505b73]
              pointer-events-none
              absolute right-2 top-1/2 -translate-y-1/2
              sm:right-3
            "
          >
            {icon}
          </span>
        )}
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
