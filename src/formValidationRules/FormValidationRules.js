// Required Input
export const required = value => (value ? undefined : "Required");

// Email Input
export const email = (value, allValues, props) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? props.translate("email_validation")
    : "";

// MaxLength Input
export const minLength = min => (value, allValues, props) =>
  value && value.length < min
    ? props.translate("min_length_validation", { min })
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
