let upperCase = true;
let upperCase_shift = true;
let shiftToggle = false;
let content = document.getElementById("some-input");
let all_keys = document.querySelectorAll(".keyboard__btn");
let alphabets = document.querySelectorAll(".alphabet > .front > div");
let caps_indicator = document.querySelector("#key-caps > .front > .indicator");
let textarea = document.querySelector(".textarea-container");
let shift_indicator_l = document.querySelector(
  "#key-shift-l > .front > .indicator"
);
let shift_indicator_r = document.querySelector(
  "#key-shift-r > .front > .indicator"
);
let drawer = document.getElementById("drawer");
let drawerStatus = false;
let audio = new Audio("click.wav");
let keysTimeoutTracker;
let keysIntervalTracker;

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

const clearTimers = (ele) => {
  ele.addEventListener("mouseout", () => {
    clearTimeout(keysIntervalTracker);
    clearTimeout(keysTimeoutTracker);
  });
  ele.addEventListener("mouseup", () => {
    clearTimeout(keysIntervalTracker);
    clearTimeout(keysTimeoutTracker);
  });
};

const continuosInput = (ele) => {
  if (ele.id === "key-delete") {
    ele.addEventListener("mousedown", () => {
      keysTimeoutTracker = setTimeout(() => {
        keysIntervalTracker = setInterval(() => {
          deleteCharacter();
          content.focus();
        }, 100);
      }, 500);
    });
    clearTimers(ele);
  } else if (ele.id === "key-tab") {
    ele.addEventListener("mousedown", () => {
      keysTimeoutTracker = setTimeout(() => {
        keysIntervalTracker = setInterval(() => {
          content.value += "\t";
          content.focus();
        }, 100);
      }, 500);
    });
    clearTimers(ele);
  } else if (ele.id === "key-return") {
    ele.addEventListener("mousedown", () => {
      keysTimeoutTracker = setTimeout(() => {
        keysIntervalTracker = setInterval(() => {
          content.value += "\n";
          content.focus();
        }, 300);
      }, 500);
    });
    clearTimers(ele);
  } else if (ele.id === "key-space") {
    ele.addEventListener("mousedown", () => {
      keysTimeoutTracker = setTimeout(() => {
        keysIntervalTracker = setInterval(() => {
          content.value += " ";
          content.focus();
        }, 300);
      }, 500);
    });
    clearTimers(ele);
  } else {
    ele.addEventListener("mousedown", () => {
      keysTimeoutTracker = setTimeout(() => {
        keysIntervalTracker = setInterval(() => {
          shiftToggle
            ? (content.value += ele.querySelector(
                " .front > div:first-child"
              ).innerText)
            : (content.value += ele.querySelector(
                ".front > div:last-child"
              ).innerText);
          content.focus();
        }, 100);
      }, 500);
    });
    clearTimers(ele);
  }
};

all_keys.forEach((ele) => {
  ele.addEventListener("click", () => {
    if (!(ele.id === "key-delete")) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
    if (
      !(ele.id === "key-caps") &&
      !(ele.id === "key-shift-l") &&
      !(ele.id === "key-shift-r") &&
      !(ele.id === "key-delete") &&
      !(ele.id === "close-button") &&
      !(ele.id === "key-option-l") &&
      !(ele.id === "key-option-r") &&
      !(ele.id === "key-command-l") &&
      !(ele.id === "key-option-r") &&
      !(ele.id === "key-control") &&
      !(ele.id === "key-function")
    ) {
      content.focus();
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
      continuosInput(ele);
      break;
    }
    case "key-tab": {
      ele.addEventListener("click", () => {
        content.value += "\t";
      });
      continuosInput(ele);
      break;
    }
    case "key-return": {
      ele.addEventListener("click", () => {
        content.value += "\n";
      });
      continuosInput(ele);
      break;
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
      ele.addEventListener("click", () => {});
      break;
    }
    case "key-space": {
      ele.addEventListener("click", () => {
        content.value += " ";
      });
      continuosInput(ele);
      break;
    }
    case "close-button": {
      ele.addEventListener("click", () => {
        drawer.classList.remove("drawer--open");
        textarea.style.marginBottom = "20px";
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
      });
      continuosInput(ele);
    }
  }
});

content.addEventListener("click", () => {
  drawer.classList.add("drawer--open");
  textarea.style.marginBottom = "360px";
});
