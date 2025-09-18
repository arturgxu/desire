export default function form(name_input, desire_input) {
    const form = document.querySelector(".form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = name_input.value.trim();
    const desire = desire_input.value.trim();

    if (!name || !desire) {
      alert("Пожалуйста, заполни оба поля!");
      return;
    }
    request_to_back(name, desire);
});
}

async function request_to_back(name, desire) {
    try {
      const response = await fetch("http://127.0.0.1:8000/add_feeling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, desire }),
      });

      console.log(response);

      if (true) {
        const main = document.querySelector("main");
        main.innerHTML = "";

        const success = document.createElement("div");
        const succesText = document.createElement("h1");

        succesText.dataset.i18n = "success_message";
        succesText.textContent = `${name}, желаем тебе хорошего вечера! 😊`;

        success.appendChild(succesText);
        main.appendChild(success);

        localStorage.clear();
      } else {
        alert("Произошла ошибка при отправке.");
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Ошибка соединения с сервером.");
    }
}