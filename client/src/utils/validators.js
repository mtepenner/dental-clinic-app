export const validators = {
  isValidEmail: (email) => {
    // Standard Regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  isValidPassword: (password) => {
    // Minimum 8 characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  },

  isNotEmpty: (value) => {
    return typeof value === 'string' && value.trim().length > 0;
  }
};
