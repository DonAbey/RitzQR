import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing and comparison

// Function to validate the format of an email address
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i
    );
}

// Function to check if an email is already registered in localStorage
function validateEmailStorage(email) {
  const users = JSON.parse(localStorage.getItem("users")) || []; // Get existing users from localStorage
  const user = users.find((user) => user.email === email); // Find a user with the given email

  if (user) {
    return false; // Email is already registered
  } else {
    return true; // Email is not registered
  }
}

// Function to validate the format of a password
function validatePassword(password) {
  return (
    password.length >= 8 && // At least 8 or more characters
    /[A-Z]/.test(password) && // At least one uppercase letter
    /[a-z]/.test(password) && // At least one lowercase letter
    /[0-9]/.test(password) && // At least one digit
    /[^A-Za-z0-9]/.test(password) // At least one symbol
  );
}

// Function to verify user credentials for sign-in
function verifySignIn(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || []; // Get existing users from localStorage
  const user = users.find((user) => user.email === email); // Find a user with the given email

  if (user) {
    if (bcrypt.compareSync(password, user.password)) { // Compare given password with stored hashed password
      return {
        name: user.name,
        email: user.email,
        password: user.password,
        dateJoined: user.dateJoined,
      }; // Return user details if credentials are valid
    }
  }
  return null; 
}

export { validateEmail, validateEmailStorage, validatePassword, verifySignIn };
