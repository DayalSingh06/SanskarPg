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
        className={`md:text-md mt-3 mb-1 block text-xs sm:text-sm ${darkMode ? "text-gray-300" : "text-[#0f0c1c]"} `}
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative w-full">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={`w-full rounded-md border px-3 py-2 pr-10 text-sm focus:ring-1 focus:ring-indigo-300 focus:outline-none sm:px-4 sm:pr-11 sm:text-base ${
            darkMode
              ? "border-gray-800 text-gray-200"
              : "border-gray-200 text-[#0f0c1c]"
          } `}
        />

        {/* Icon */}
        {icon && (
          <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[#505b73] sm:right-3">
            {icon}
          </span>
        )}
      </div>

      {/* Error */}
      {touched && error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </>
  );
}
