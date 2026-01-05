const USERS_KEY = "pm_users";
const SESSION_KEY = "pm_session";

// Read users from localStorage
function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Write users to localStorage
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Register a new user
export function registerUser(fullName, email, password) {
  const users = readUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("Email already exists.");

  users.push({ fullName, email, password });
  writeUsers(users);
}

// Login with email and password
export function loginUser(email, password) {
  const users = readUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!found) throw new Error("Invalid credentials.");

  localStorage.setItem(SESSION_KEY, found.email);
}

// Logout user
export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

// Check if the user is authenticated
export function isAuthed() {
  return Boolean(localStorage.getItem(SESSION_KEY));
}
