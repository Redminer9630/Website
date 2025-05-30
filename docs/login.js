document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();

  if (result.success) {
    localStorage.setItem("uid", result.uid);
    window.location.href = "/settings.html";
  } else {
    Modal.toast(result.message || "Login fehlgeschlagen.");
  }
});
