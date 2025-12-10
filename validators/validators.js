const isEmail = (v) => /\S+@\S+\.\S+/.test(v);

const signupValidator = (body) => {
  const { name, email, password } = body;
  if (!name || !email || !password) return 'Name, email and password are required';
  if (!isEmail(email)) return 'Invalid email';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

const contactValidator = (body) => {
  const { name, email, status } = body;
  if (!name || !email) return 'Name and email are required';
  if (!isEmail(email)) return 'Invalid email';
  if (status && !['Lead','Prospect','Customer'].includes(status)) return 'Invalid status';
  return null;
};

module.exports = { signupValidator, contactValidator };
