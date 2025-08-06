const translate_document = {
  ru: {
    header_title: "Опиши  твои  чувства 🤎",
    button_language: "Հայոց լեզու",
    description_first: "Привет, спасибо, что проводишь этот день с нами!",
    description_last:
      "На этой странице вы можете описать, что чувствуете в эту особенную минуту. Это сообщение увидим только мы. Ниже ты увидишь форму, в которой нужно указать твои имя и фамилию, после чего написать описать твои чувства в отдельном поле.",
    label_name: "Введи, пожалуйста, твои имя и фамилию",
    label_desire: "Опиши твои чувства в эту минуту",
    button_submit: "Отправить",
    success_message: "желаем тебе хорошего вечера! 😊",
  },
  hy: {
    header_title: "Նկարագրիր քո զգացմունքները 🤎",
    button_language: "Русский язык",
    description_first:
      "Բարև, շնորհակալություն, որ այս օրը մեզ հետ ես անցկացնում!",
    description_last:
      "Այս էջում կարող ես նկարագրել, ինչ ես զգում այս հատուկ պահին։ Այս հաղորդագրությունը միայն մենք կտեսնենք։ Ներքևում կտեսնես ձև, որտեղ պետք է նշել քո անունը և ազգանունը, այնուհետև գրել քո զգացմունքները առանձին դաշտում։",
    label_name: "Խնդրում ենք մուտքագրել ձեր անունն ու ազգանունը",
    label_desire: "Նկարագրիր քո զգացմունքները այս պահին",
    button_submit: "Ուղարկել",
    success_message: "ցանկանում ենք քեզ լավ երեկո! 😊",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  let current_language = "ru";

  document.getElementById("button_language").addEventListener("click", () => {
    if (current_language === 'ru') {
        current_language = 'hy'
    } else {
        current_language = 'ru'
    }
    updateLanguage();
    
  });

  function updateLanguage() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        element.textContent = translate_document[current_language] [key]
    })
  };


  const name_input = document.getElementById("name");
  const desire_input = document.getElementById("desire");

  name_input.addEventListener("change", (event) => {
    const value = event.target.value;
    localStorage.setItem("name", value);
  });

  desire_input.addEventListener("change", (event) => {
    const value = event.target.value;
    localStorage.setItem("desire", value);
  });

  const local_name = localStorage.getItem("name");
  const local_desire = localStorage.getItem("desire");

  if (local_name) {
    name_input.value = local_name;
  }

  if (local_desire) {
    desire_input.value = local_desire;
  }

  const form = document.querySelector(".form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = name_input.value.trim();
    const desire = desire_input.value.trim();

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
  });
});
