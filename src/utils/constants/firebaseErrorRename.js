const firebaseErrorRename = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "The user account has been disabled.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-credential":
      return "Incorrect email or password";
    case "auth/too-many-requests":
      return "You've reached the requests limit, please wait.";
    case "auth/email-already-in-use":
      return "The email is already in use";
    default:
      return errorCode; // Return original message for unknown codes
  }
};

export default firebaseErrorRename;
