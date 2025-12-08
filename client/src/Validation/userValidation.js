
export const isValidName = (name) => name.trim().length > 0;
//email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password:
export const isValidPassword = (password) => password.length >= 6;

export const passwordsMatch = (password, confirmPassword) => password === confirmPassword;
