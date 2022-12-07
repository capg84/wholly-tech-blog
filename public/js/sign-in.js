const signIn = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("passsword").value.trim();

  if (email && password) {
    const response = await fetch("/api/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      alert("Sign in details do not match");
    } else {
      alert("Successfully signed in");
      document.location.replace("/api/blogs/dashboard");
    }
  }
};

const signInBtn = document
  .getElementById("sign-in-btn")
  .addEventListener("click", signIn);
