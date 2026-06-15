const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const JWT_SECRET = process.env.JWT_SECRET || 'eurostar-ecommerce-secret';
const JWT_EXPIRES_IN = '1h';

function register({ username, email, password }) {
  if (!username || !email || !password) {
    throw { status: 400, message: 'Username, email, and password are required' };
  }

  if (userModel.findByEmail(email)) {
    throw { status: 409, message: 'Email already registered' };
  }

  if (userModel.findByUsername(username)) {
    throw { status: 409, message: 'Username already taken' };
  }

  const user = userModel.create({ username, email, password });
  const token = generateToken(user);

  return { user, token };
}

function login({ email, password }) {
  if (!email || !password) {
    throw { status: 400, message: 'Email and password are required' };
  }

  const user = userModel.findByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const { password: _, ...safeUser } = user;
  const token = generateToken(safeUser);

  return { user: safeUser, token };
}

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  register,
  login,
  verifyToken,
};
