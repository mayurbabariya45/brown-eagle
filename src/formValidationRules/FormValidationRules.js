// Required Input
export const required = value => (value ? undefined : "Required");

// Email Input
export const email = (value, allValues, props) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? props.translate("email_validation")
    : "";

// minLength Input
export const minLength = min => (value, allValues, props) =>
  value && value.length < min
    ? props.translate("min_length_validation", { min })
    : undefined;
export const passwordLength = (value, allValues, props) =>
  value && value.length < 6
    ? props.translate("min_length_validation", { min: 6 })
    : undefined;
export const match = matchName => (value, allValues, props) =>
  value !== allValues[matchName]
    ? props.translate("c_password_validation", { matchName })
    : undefined;

// Phone Input
export const phoneNumber = (value, allValues, props) =>
  value &&
  !/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(value)
    ? props.translate("phone_number_validation")
    : undefined;
// Year Validation

export const year = (value, allValues, props) => {
  const fullYear = new Date().getFullYear();
  if (value.length !== 4) return props.translate("year_validation");
  if (!value.match(/\d{4}/)) return props.translate("year_length_validation");
  if (parseInt(value) > fullYear || parseInt(value) < 1900)
    return props.translate("year_match_validation");
  return false;
};
export const numeric = value =>
  value && isNaN(Number(value)) ? "Must be a numeric" : undefined;
export const areaCode = value => {
  if (!value) {
    return value;
  }
  if (value.length !== 5) return "The area code must be 5 digits";
  if (!value.match(/\d{5}/)) return "The area code must be a numeric";
  return false;
};
export const price = value => {
  if (value && !/^\d+(?:\.\d{0,2})$/.test(value))
    return "The product price must be a numeric";
  return true;
};

export const normalizePhone = value => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`;
};

export default normalizePhone;
