import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  // Signs a token with the user's ID and your secret key, expiring in 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
