// Российский номер: 10 цифр, либо 11 цифр, начинающихся с 7 или 8
export const isValidPhone = (raw: string): boolean => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return true;
  return digits.length === 11 && (digits[0] === "7" || digits[0] === "8");
};
