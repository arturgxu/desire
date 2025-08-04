document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.querySelector(".form")  
  
  const name_input = document.getElementById("name")
  const desire_input = document.getElementById("desire")

  name_input.addEventListener("change", (event) => {
    const value = event.target.value
    localStorage.setItem('name', value)
  });

  desire_input.addEventListener("change", (event) => {
    const value = event.target.value
    localStorage.setItem('desire', value)
  });

  const local_name = localStorage.getItem("name")
  const local_desire = localStorage.getItem("desire")


  if (local_name) {
    name_input.value = local_name
  }

  if (local_desire) {
    desire_input.value = local_desire
  }
  
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = name_input.value.trim()
    const desire = desire_input.value.trim()

    if (!name || !desire) {
      alert("Пожалуйста, заполни оба поля!")
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

      if (true) {        
        const main = document.querySelector("main")
        main.innerHTML = ''

        const success = document.createElement("div")
        const succesText = document.createElement("h1")

        succesText.textContent = `${name}, желаем тебе хорошего вечера! 😊` 
        
        success.appendChild(succesText)
        main.appendChild(success)

        localStorage.clear()

      } else {
        alert("Произошла ошибка при отправке.")
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error)
      alert("Ошибка соединения с сервером.")
    }
  });
});

