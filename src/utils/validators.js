// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Form validation for login
export const validateLoginForm = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  }
  
  return errors;
};

// Form validation for registration
export const validateRegisterForm = (values) => {
  const errors = {};
  
  if (!values.name) {
    errors.name = 'Name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(values.password)) {
    errors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
  }
  
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Please confirm your password';
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match';
  }
  
  return errors;
};

// Form validation for checkout
export const validateCheckoutForm = (values) => {
  const errors = {};
  
  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!values.address) {
    errors.address = 'Address is required';
  }
  
  if (!values.city) {
    errors.city = 'City is required';
  }
  
  if (!values.postalCode) {
    errors.postalCode = 'Postal code is required';
  }
  
  if (!values.phone) {
    errors.phone = 'Phone number is required';
  }
  
  return errors;
};