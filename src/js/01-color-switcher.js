const refs = {
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]"),
}

let timerId = 0;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener("click", onStart);
refs.stopBtn.addEventListener("click", onStop);

function onStart() {
    timerId = setInterval(() => changeBodyColor(getRandomHexColor), 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onStop() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}

function changeBodyColor(colorFunction) {
    document.body.style.backgroundColor = colorFunction();    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}
