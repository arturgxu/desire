import translate from "./translate.js";
import local_storage from "./local_storage.js";
import form from "./form.js";


document.addEventListener("DOMContentLoaded", () => {
  const name_input = document.getElementById("name");
  const desire_input = document.getElementById("desire");
  
  translate();
  local_storage(name_input, desire_input);
  form(name_input, desire_input);
});
