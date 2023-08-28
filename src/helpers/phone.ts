export const isPhone = (phone: string) => {
  return /^\+[1-9]\d{8,14}$/.test(phone);
};

export const cleanPhoneNumber = (phone: string) => {
  if (phone) {
    return phone.replace(/^0/, '');
  }
  return phone;
};
