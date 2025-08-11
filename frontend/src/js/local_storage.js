export default function local_storage(name_input, desire_input) {
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
}