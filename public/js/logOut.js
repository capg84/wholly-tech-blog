const logOut = async () => {
  const response = await fetch("/api/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.getElementById("logout").addEventListener("click", logOut);
