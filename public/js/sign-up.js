// signing up new user
const signUp = async () => {
  event.preventDefault();

  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const passwordConfirm = document
    .getElementById("password-confirm")
    .value.trim();

  if (password === passwordConfirm) {
    document.getElementById("submitBtn").disabled = false;
  } else {
    alert("Yours passwords do not match");
  }

  const response = await fetch(`/api/sign-up`, {
    method: "POST",
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/api/blogs/dashboard");
  } else {
    console.log(response);
    alert("Failed to sign up");
  }
};

const signUpBtn = document
  .getElementById("submitBtn")
  .addEventListener("click", signUp);
