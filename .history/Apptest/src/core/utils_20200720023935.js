export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password, confirmPassword) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  if (confirmPassword !== password) return "Password is not matched";
  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const addressValidator = (address) => {
  if (!address || address.length <= 0) return "address cannot be empty.";

  return "";
};

export const clinicValidator = (clinic) => {
  if (!clinic || clinic.length <= 0) return "clinic cannot be empty.";

  return "";
};

export const confirmPasswordValidator = (confirmPassword, password) => {
  if (!confirmPassword || confirmPassword.length <= 0) return "Password cannot be empty.";
  if (confirmPassword !== password) return "Password is not matched";
  return "";
};


export const phoneValidator = (phoneNum) => {
  if (!phoneNum || phoneNum.length <= 0) return "Phone Number cannot be empty.";
  if (phoneNum !== parseInt(phoneNum, 10)) return ("Phone Number invalid format");

  return "";
};
