document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  // Validaciones simples
  if (nombre === "" || correo === "" || telefono === "" || mensaje === "") {
    showModal("Todos los campos son obligatorios.");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(correo)) {
    showModal("El correo electrónico no es válido.");
    return;
  }

  if (!/^[0-9]{7,10}$/.test(telefono)) {
    showModal("El teléfono debe tener solo números (7 a 10 dígitos).");
    return;
  }

  // FORMSPREE - Aquí colocas tu endpoint de Formspree
  const formspreeURL = "https://formspree.io/f/mjkrqyol"; // <-- cámbialo

  try {
    const response = await fetch(formspreeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ nombre, correo, telefono, mensaje }),
    });

    if (response.ok) {
      showModal("Tu mensaje fue enviado exitosamente.");
      document.getElementById("contactForm").reset();
    } else {
      showModal("Ocurrió un error al enviar el mensaje.");
    }
  } catch (error) {
    showModal("Error de conexión con el servidor.");
  }
});

function showModal(message) {
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  const modal = new bootstrap.Modal(document.getElementById("responseModal"));
  modal.show();
}
