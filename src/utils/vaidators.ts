export const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const isIpAddress =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const validateEmail = (email: string) => {
  console.log("check ===>", email, emailCheck.test(email));

  return emailCheck.test(email);
};

export const vaidatePassword = (password: string) => {
  return passwordStrength.test(password);
};
