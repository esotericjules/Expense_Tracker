// User related messages
export const USER_MESSAGES = {
  // Registration messages
  REGISTER_SUCCESS: 'User registered successfully',
  REGISTER_REQUIRED_FIELDS: 'Username, email, and password are required',
  USER_EXISTS: 'User already exists',

  // Login messages
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_REQUIRED_FIELDS: 'Email and password are required',
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Invalid password',

  // JWT related
  JWT_SECRET_UNDEFINED: 'JWT secret key is not defined',
};

// Error messages
export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SERVER_ERROR: 'Server error',

  // Logging messages
  ERROR_REGISTERING_USER: 'Error registering user',
  ERROR_LOGGING_IN: 'Error logging in:',
};
