document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const desire = document.querySelector("#desire").value.trim();

    if (!name || !desire) {
      alert("Пожалуйста, заполни оба поля!");
      return;
    }

    try {
      const response = await fetch("/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, desire }),
      });

      if (response.ok) {
        window.location.href = "success.html";
      } else {
        alert("Произошла ошибка при отправке.");
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Ошибка соединения с сервером.");
    }
  });
});
