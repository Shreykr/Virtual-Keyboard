let upperCase = true;
let upperCase_shift = true;
let shiftToggle = false;
let content = document.getElementById("some-input");
let all_keys = document.querySelectorAll(".keyboard__btn");
let alphabets = document.querySelectorAll(".alphabet > .front > div");
let caps_indicator = document.querySelector("#key-caps > .front > .indicator");
let textarea = document.querySelector(".textarea-container");
let closeButton = document.getElementById("close-button");
let shift_indicator_l = document.querySelector(
  "#key-shift-l > .front > .indicator"
);
let shift_indicator_r = document.querySelector(
  "#key-shift-r > .front > .indicator"
);
let drawer = document.getElementById("drawer");
let drawerStatus = false;
let audio = new Audio("click.wav");

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
};

const shiftTogglerFn = () => {
  shiftToggle = !shiftToggle;
  shiftCaseChange();
  shift_indicator_l.classList.toggle("indicator-off");
  shift_indicator_r.classList.toggle("indicator-off");
};

const deleteCharacter = () => {
  content.value = content.value.slice(0, -1);
  content.focus();
};

all_keys.forEach((ele) => {
  ele.addEventListener("click", () => {
    if (!(ele.id === "key-delete")) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  });
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
      });
      break;
    }
    case "key-return": {
      ele.addEventListener("click", () => {
        content.value += "\n";
        content.focus();
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
      });

      break;
    }
    case "up-arrow": {
    }
    case "down-arrow": {
    }
    case "left-arrow": {
    }
    case "right-arrow": {
      ele.addEventListener("click", () => {
        content.focus();
      });
      break;
    }
    case "key-space": {
      ele.addEventListener("click", () => {
        content.value += " ";
        content.focus();
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
      });
    }
  }
});

closeButton.addEventListener("click", () => {
  drawer.classList.remove("drawer--open");
  textarea.style.marginBottom = "20px";
});

content.addEventListener("click", () => {
  drawer.classList.add("drawer--open");
  textarea.style.marginBottom = "360px";
});
