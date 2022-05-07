let upperCase = true;
let upperCase_shift = true;
let shiftToggle = false;

let content = document.getElementById("some-input");

let all_keys = document.querySelectorAll(".keyboard__btn");

let alphabets = document.querySelectorAll(".alphabet > .front > div");

let caps_indicator = document.querySelector("#key-caps > .front > .indicator");

let body = document.querySelector("body");

let textarea = document.querySelector(".textarea-container");

let closeButton = document.getElementById("close-button");

let overlay = document.getElementById("overlay");

let shift_indicator_l = document.querySelector(
  "#key-shift-l > .front > .indicator"
);

let shift_indicator_r = document.querySelector(
  "#key-shift-r > .front > .indicator"
);

let drawer = document.getElementById("drawer");

let drawerStatus = false;

var audio = new Audio("click.wav");

const shiftCaseChange = () => {
  if (upperCase_shift) {
    alphabets.forEach((ele, index) => {
      ele.childNodes[0].nodeValue = ele.childNodes[0].nodeValue.toLowerCase();
    });
  } else {
    alphabets.forEach((ele, index) => {
      ele.childNodes[0].nodeValue = ele.childNodes[0].nodeValue.toUpperCase();
    });
  }
  upperCase_shift = !upperCase_shift;
  audio.play();
};

const toggleCase = () => {
  if (upperCase) {
    alphabets.forEach((ele, index) => {
      ele.childNodes[0].nodeValue = ele.childNodes[0].nodeValue.toLowerCase();
    });
  } else {
    alphabets.forEach((ele, index) => {
      ele.childNodes[0].nodeValue = ele.childNodes[0].nodeValue.toUpperCase();
    });
  }
  upperCase = !upperCase;
  upperCase_shift = upperCase;
  if (shiftToggle) {
    shiftCaseChange();
  }
  caps_indicator.classList.toggle("indicator-off");
  audio.play();
};

const shiftTogglerFn = () => {
  shiftToggle = !shiftToggle;
  shiftCaseChange();
  shift_indicator_l.classList.toggle("indicator-off");
  shift_indicator_r.classList.toggle("indicator-off");
  audio.play();
};

const deleteCharacter = () => {
  content.value = content.value.slice(0, -1);
  content.focus();
  audio.play();
};

all_keys.forEach((ele, index) => {
  switch (ele.id) {
    case "key-caps": {
      ele.addEventListener("click", toggleCase);
      break;
    }
    case "key-shift-l": {
      ele.addEventListener("click", shiftTogglerFn);
    }
    case "key-shift-r": {
      ele.addEventListener("click", shiftTogglerFn);
      break;
    }
    case "key-delete": {
      ele.addEventListener("click", deleteCharacter);
      break;
    }
    case "key-tab": {
      ele.addEventListener("click", () => {
        content.value += "\t";
        content.focus();
        audio.play();
      });
      break;
    }
    case "key-return": {
      ele.addEventListener("click", () => {
        content.value += "\n";
        content.focus();
        audio.play();
      });
    }
    case "key-command-l": {
    }
    case "key-command-r": {
    }
    case "key-option-r": {
    }
    case "key-option-l": {
    }
    case "key-control": {
    }
    case "key-function": {
      ele.addEventListener("click", () => {
        content.value += "";
        content.focus();
        audio.play();
      });

      break;
    }
    case "up-arrow": {
      ele.addEventListener("click", () => {
        audio.play();
        content.focus();
      });
    }
    case "down-arrow": {
      ele.addEventListener("click", () => {
        audio.play();
        content.focus();
      });
    }
    case "left-arrow": {
      ele.addEventListener("click", () => {
        audio.play();
        content.focus();
      });
    }
    case "right-arrow": {
      ele.addEventListener("click", () => {
        audio.play();
        content.focus();
      });
      break;
    }
    case "key-space": {
      ele.addEventListener("click", () => {
        content.value += " ";
        content.focus();
        audio.play();
      });
      break;
    }
    default: {
      ele.addEventListener("click", () => {
        shiftToggle
          ? (content.value += ele.querySelector(
              " .front > div:first-child"
            ).innerText)
          : (content.value += ele.querySelector(
              ".front > div:last-child"
            ).innerText);
        content.focus();
        audio.play();
      });
    }
  }
});

closeButton.addEventListener("click", () => {
  drawer.classList.remove("drawer--open");
  body.style.justifyContent = "center";
  textarea.style.marginBottom = "20px";
  audio.play();
});

content.addEventListener("click", () => {
  drawer.classList.add("drawer--open");
  // body.style.justifyContent = "space-around";
  textarea.style.marginBottom = "360px";
});
