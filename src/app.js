import { PastaTimer } from "./PastaTimer/PastaTimer";
import { PastaAnimator } from "./PastaAnimator/PastaAnimator";
import { pastaData } from "./pastaData/pastaData";

let PA = new PastaAnimator();

const controls = document.getElementsByClassName("btn");

const controlsArray = Array.from(controls)

controlsArray.forEach((button, index) => {
  button.addEventListener("click", () => {
    const selectedPasta = pastaData[button.dataset.name];
    pastaMenu.style.display = "none";
    selectedPastaPage.style.display = "block";
    let PT = new PastaTimer(selectedPasta);
    PT.initTimer();

    const templatePage = document.getElementsByTagName("iframe")[0].contentWindow.document;
    templatePage.getElementById("menu").addEventListener("click", () => {
      pastaMenu.style.display = "block";
      selectedPastaPage.style.display = "none";
    })
  });
});