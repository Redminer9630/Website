document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    Modal.toast("Passwörter stimmen nicht überein.");
    return;
  }

  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();

  if (result.success) {
    Modal.toast("Konto erstellt. Du kannst dich jetzt einloggen.");
    window.location.href = "/login.html";
  } else {
    Modal.toast(result.message || "Registrierung fehlgeschlagen.");
  }
});
