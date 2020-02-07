function onSubmit(e) {
  e.preventDefault();
  console.log(e.target);
  console.log(
    Array.from(e.target.elements).map(el => `${el.name}: ${el.value}`)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.onsubmit = onSubmit;
});
