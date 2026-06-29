export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
export const indiaMobileRegex = /^[6-9]\d{9}$/;
export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateField = (name, value, formData) => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Please enter your name';
      if (value.length < 3) return 'Name must be at least 3 characters';
      if (!nameRegex.test(value.trim())) return 'Please enter a correct name';
      return '';

    case 'email':
      if (!value.trim()) return 'Please enter your email';
      if (!emailRegex.test(value.trim())) return 'Please enter a valid email';
      return '';

    case 'mobile':
      if (!value) return 'Please enter mobile number';
      if (!indiaMobileRegex.test(value.trim()))
        return 'Enter a valid mobile number';
      return '';

    case 'password':
      if (!value) return 'Please enter your password';
      if (!strongPasswordRegex.test(value.trim()))
        return 'Password must be at least 8 characters and include uppercase, lowercase, number & special character';
      return '';

    case 'confirmPassword':
      if (!value) return 'Please confirm your password';
      if (value.trim() !== formData.password.trim())
        return 'Passwords do not match';
      return '';

    default:
      return '';
  }
};

export const validateForm = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

export const getPasswordStrength = (password) => {
  if (!password) return '';

  const lengthScore = password.length >= 8;
  const upperCase = /[A-Z]/.test(password);
  const lowerCase = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const symbol = /[@$!%*?&]/.test(password);

  const score = [lengthScore, upperCase, lowerCase, number, symbol].filter(
    Boolean
  ).length;

  if (score <= 2) return 'Weak';
  if (score === 3 || score === 4) return 'Medium';
  if (score === 5) return 'Strong';
};
