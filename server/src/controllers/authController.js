const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user: user.toJSON(),
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      message: 'Login successful',
      user: user.toJSON(),
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error during login' });
  }
};

const getProfile = async (req, res) => {
  res.json({
    user: req.user.toJSON()
  });
};

const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.id;

    // Check if username or email is taken by another user
    if (username || email) {
      const existingUser = await User.findOne({
        where: {
          [require('sequelize').Op.and]: [
            {
              [require('sequelize').Op.or]: [
                ...(username ? [{ username }] : []),
                ...(email ? [{ email }] : [])
              ]
            },
            {
              id: { [require('sequelize').Op.ne]: userId }
            }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ 
          error: 'Username or email already taken' 
        });
      }
    }

    // Update user
    await req.user.update({
      ...(username && { username }),
      ...(email && { email })
    });

    res.json({
      message: 'Profile updated successfully',
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};