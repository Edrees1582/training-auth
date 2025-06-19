export const ValidateRequiredFields = (requiredFields, body) => {
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  return body;
};

export const ValidateEmail = (email) => {
  const regex = new RegExp(/^\S+@\S+\.\S+$/);

  return regex.test(email);
};