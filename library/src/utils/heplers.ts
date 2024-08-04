export const isPasswordLengthValid = (password: string): boolean => password.length >= 8;

export const containsNumber = (password: string): boolean => /\d/.test(password);

export const containsSymbol = (password: string): boolean => /[!@#$%^&*(),.?":{}|<>]/.test(password);

export const passwordsMatch = (password: string, confirmPassword: string): boolean => password === confirmPassword;
