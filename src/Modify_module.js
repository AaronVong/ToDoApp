function doubleClick() {
  let name = document.querySelectorAll(".name");
  let clickCounter = 0;
  name.forEach((element) => {
    element.addEventListener("click", () => {
      clickCounter += 1;
      setTimeout(() => {
        console.log("Double click failed");
        clickCounter = 0;
        return;
      }, 500);
      if (clickCounter === 2) {
        let newNameInput = element.nextElementSibling;
        element.style.display = "none";
        newNameInput.style.display = "block";
        newNameInput.focus();
        setTimeout(() => {
          newNameInput.select();
        }, 100);
        newNameInput.value = element.innerText;
      }
    });
  });
}
export default doubleClick;
