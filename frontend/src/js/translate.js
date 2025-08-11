import {translate_document} from "./variables.js";

export default function translate() {
    let current_language = "ru";
    
    document.getElementById("button_language").addEventListener("click", () => {
        if (current_language === "ru") {
            current_language = "hy"
        } else {
            current_language = "ru"
        }
        updateLanguage();
        
      });
    
      function updateLanguage() {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            element.textContent = translate_document[current_language] [key]
        })
      };
}