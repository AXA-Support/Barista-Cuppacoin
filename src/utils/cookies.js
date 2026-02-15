import Cookies from 'js-cookie'

// Cookie keys
export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  TOKEN_TYPE: 'token_type',
  EMPLOYEE: 'employee'
}

/**
 * Set access token in cookies
 * @param {string} token - The access token
 * @param {string} tokenType - The token type (default: 'Bearer')
 */
export const setAuthToken = (token, tokenType = 'Bearer', employee) => {
  // Set token to expire in 7 days (adjust as needed)
  const expires = 7 // days
  // Only use secure flag in production (HTTPS), not on localhost
  const isSecure = window.location.protocol === 'https:'
  const cookieOptions = { expires, secure: isSecure, sameSite: 'strict', path: '/' }
  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, token, cookieOptions)
  Cookies.set(COOKIE_KEYS.TOKEN_TYPE, tokenType, cookieOptions)
  if (employee && employee.id) {
    Cookies.set(COOKIE_KEYS.EMPLOYEE, employee.id, cookieOptions)
  }
}

/**
 * Get access token from cookies
 * @returns {string|null} - The access token or null if not found
 */
export const getAuthToken = () => {
  return Cookies.get(COOKIE_KEYS.ACCESS_TOKEN) || null
}

/**
 * Get token type from cookies
 * @returns {string|null} - The token type or null if not found
 */
export const getTokenType = () => {
  return Cookies.get(COOKIE_KEYS.TOKEN_TYPE) || 'Bearer'
}

/**
 * Get employee ID from cookies
 * @returns {string|null} - The employee ID or null if not found
 */
export const getEmployeeId = () => {
  return Cookies.get(COOKIE_KEYS.EMPLOYEE) || "null"
}

/**
 * Remove auth tokens from cookies
 */
export const removeAuthToken = () => {
  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN, { path: '/' })
  Cookies.remove(COOKIE_KEYS.TOKEN_TYPE, { path: '/' })
  Cookies.remove(COOKIE_KEYS.EMPLOYEE, { path: '/' })
}

/**
 * Check if user is authenticated (has valid token)
 * @returns {boolean} - True if token exists
 */
export const isAuthenticated = () => {
  return !!getAuthToken()
}