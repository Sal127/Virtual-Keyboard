const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: []
    },
  
    eventHandlers: {
      oninput: null,
      onclose: null
    },
  
    properties: {
      value: "",
      capsLock: false
    },
  
    init() {
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");
  
      this.elements.main.classList.add("keyboard");
      this.elements.keysContainer.classList.add("keyboard-keys");
      this.elements.keysContainer.appendChild(this._createKeys());
  
      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");
  
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
  
      document.querySelectorAll(".textwindow").forEach((element) => {
           this.open(element.value, (currentValue) => {
            element.value = currentValue;
          });
        
      });
    },
  
    _createKeys() {
      const fragment = document.createDocumentFragment();
      const keyLayout = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "backspace",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "caps",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "enter",
        "shiftL",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "?",
        "shiftR",
        "space"
      ];
  
      const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
      };
  
      keyLayout.forEach((key) => {
        const keyElement = document.createElement("button");
        const insertLineBreak =
          ["backspace", "p", "enter", "shiftR"].indexOf(key) !== -1;
  
        keyElement.classList.add("keyboard-key");
  
        switch (key) {
            case "backspace":
              keyElement.classList.add("keyboard-wide");
              keyElement.innerHTML = createIconHTML("Backspace");
              keyElement.addEventListener("click", () => {
                this.properties.value = this.properties.value.substring(
                  0,
                  this.properties.value.length - 1
                );
                this._triggerEvent("oninput");
              });
            break;
  
            case "caps":
              keyElement.classList.add("keyboard-wide-capslk", "keyboard-active");
              keyElement.innerHTML = createIconHTML("Capslk");
              keyElement.addEventListener("click", () => {
                this._toggleCapsLock();
                keyElement.classList.toggle(
                  "keyboard-check",
                  this.properties.capsLock
                );
              });
            break;
  
            case "enter":
              keyElement.classList.add("keyboard-wide");
              keyElement.innerHTML = createIconHTML("Enter");
              keyElement.addEventListener("click", () => {
                this.properties.value += "\n";
              });
            break;
          
            case "shiftL":
              keyElement.classList.add("keyboard-wide-shiftL");
              keyElement.innerHTML = createIconHTML("Shift");
              keyElement.addEventListener("click", () => {
                this.properties.value += "\n";
              });
            break;  
            
            case "shiftR":
              keyElement.classList.add("keyboard-wide-shiftR");
              keyElement.innerHTML = createIconHTML("Shift");
              keyElement.addEventListener("click", () => {
                this.properties.value += "\n";
              });
            break;

            case "space":
              keyElement.classList.add("keyboard-extrawide");
              //keyElement.innerHTML = createIconHTML("space_bar");
              keyElement.addEventListener("click", () => {
                this.properties.value += " ";
                this._triggerEvent("oninput");
              });
            break;
  
        
            default:
              keyElement.textContent = key.toLowerCase();
              
              keyElement.addEventListener("click", () => {
                  this.properties.value += this.properties.capsLock
                    ? key.toUpperCase()
                    : key.toLowerCase();
                  this._triggerEvent("oninput");
              });
            break;
        }
  
        fragment.appendChild(keyElement);
  
        if (insertLineBreak) {
          fragment.appendChild(document.createElement("br"));
        }
      });
  
      return fragment;
    },
    

    _triggerEvent(name) {
      if (typeof this.eventHandlers[name] === "function") {
        this.eventHandlers[name](this.properties.value);
      }
    },
  
    _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;
      
      for (const key of this.elements.keys) {
        console.log(key.textContent);
        console.log(this.properties.capsLock);
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
        }
      }
    },
  
    open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
    },
  };
  
  Keyboard.init();

  let keys = document.querySelectorAll('.keyboard-key');
  let spaceKey = document.querySelector('.keyboard-extrawide');
  let shiftLeft = document.querySelector('.keyboard-wide-shiftL');
  let shiftRight = document.querySelector('.keyboard-wide-shiftR');
  let caps_lk = document.querySelector('.keyboard-wide-capslk'); 
  
  
  for(let i = 0; i < keys.length; i++) {
    keys[i].setAttribute('keyname', keys[i].innerText);
    keys[i].setAttribute('lowerCaseName', keys[i].innerText.toLowerCase());
    keys[i].setAttribute('upperCaseName', keys[i].innerText.toUpperCase());
  }
  
  window.addEventListener('keydown', function(e) {
    for(let i = 0; i < keys.length; i++) {
        if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
          keys[i].classList.add('active');
        }
        
        if(e.code == 'Space') {
          spaceKey.classList.add('active');
        }
        if(e.code == 'ShiftLeft') {
          shiftRight.classList.remove('active');
        }
        if(e.code == 'ShiftRight') {
          shiftLeft.classList.remove('active');
        }
        if(e.code == 'CapsLock') {
          caps_lk.classList.toggle('active');
          for (const key of keys) {
            // console.log(key.textContent);
            // console.log(key.childElementCount);
            if (key.childElementCount === 0) {
              key.textContent.toUpperCase();
              caps_lk.classList.add("keyboard-check");
            }
          }
        }
    }
  });

  window.addEventListener('keyup', function(e) {
    for(let i = 0; i < keys.length; i++) {
        if(e.key == keys[i].getAttribute('keyname' ) || e.key == keys[i].getAttribute('lowerCaseName')) {
            keys[i].classList.remove('active')
            keys[i].classList.add('remove')
        }
        if(e.code == 'Space') {
            spaceKey.classList.remove('active');
            spaceKey.classList.add('remove');
        }
        if(e.code == 'ShiftLeft') {
          shiftRight.classList.remove('active')
          shiftRight.classList.remove('remove')
        }
        if(e.code == 'ShiftRight') {
          shiftLeft.classList.remove('active')
          shiftLeft.classList.remove('remove')
        }
        setTimeout(()=> {
            keys[i].classList.remove('remove')
        },200);
    }
});