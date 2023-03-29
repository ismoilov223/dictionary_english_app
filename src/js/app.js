// dom elemnts start!
const fontsEl = document.querySelectorAll("#font-one, #font-two, #font-three");
const fontNameEl = document.querySelector("#font-name");
const bodyEl = document.body;
const InpWordEl = document.querySelector("#inp-serch-word");
const serchBtnEl = document.querySelector("#serch-btn");
const audioBtnEl = document.querySelector("#audio-btn");
// const inpWordVal = InpWordEl.value;
// Serch elementTextContent Start!
const dicWordTextEl = document.querySelector("#dic-key");
const dicWordTransEl = document.querySelector("#dic-trans");
const dicMeaningEl = document.querySelector("#meaning-box");
const dicMeaningVerbEl = document.querySelector("#meaning-verb");
const dicSynonmEl = document.querySelector("#synonm-box");
// Serch elementTextVontent end!
// dom elemnts end!
// Theme change start!
const theme_change = document.querySelector("#theme-toggle");
const theme_switchEl = document.querySelector("#theme-swichEl");
const color_theme = localStorage.getItem("color-theme");
if (color_theme == "dark") {
  document.documentElement.classList.add("dark");
  theme_switchEl.classList.add("after:translate-x-full");
  theme_switchEl.classList.add("after:border-white");
  theme_switchEl.classList.add("bg-[#A445ED]");
} else {
  document.documentElement.classList.remove("dark");
}
theme_change.addEventListener("click", () => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    theme_change.classList == "sr-only peer light" &&
    color_theme == "light"
  ) {
    theme_change.classList.remove("light");
    theme_change.classList.add("dark");
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  } else {
    theme_change.classList.remove("dark");
    theme_change.classList.add("light");
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  }
});
// Theme change end!
// Font change start!
fontsEl.forEach((el) => {
  el.addEventListener("click", () => {
    switch (el.textContent) {
      case "Sans Serif":
        fontChange(
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
          " Sans Serif"
        );
        break;
      case "Serif":
        fontChange("Serif", "Serif");
        break;
      case "Mono":
        fontChange("Roboto Mono", "Mono");
        break;

      default:
        bodyEl.style.fontFamily = "sans serif";
        break;
    }
  });
});

bodyEl.style.fontFamily = localStorage.getItem("font");
fontNameEl.textContent = localStorage.getItem("fontText");
function fontChange(font, fontTextcont) {
  bodyEl.style.fontFamily = font;
  fontNameEl.textContent = fontTextcont;
  localStorage.setItem("font", font);
  localStorage.setItem("fontText", fontTextcont);
}
// Font change end!
// Word Serch Start!
serchBtnEl.addEventListener("click", () => {
  DicGetFun();
});
document.addEventListener("keypress", function (e) {
  if (e.key == "Enter" || e.key == "NumPadenter") {
    DicGetFun(InpWordEl.value);
  }
});
function DicGetFun(inpVal) {
  if (inpVal != "" && inpVal != " ") {
    getTodos(inpVal);
    async function getTodos(serchval) {
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${serchval}`
        );
        const data = await res.json();
        let new_phonetic = data[0].phonetics.filter((phones) => {
          return phones.text && phones.audio;
        });
        dicWordTextEl.textContent = data[0].word;
        dicWordTransEl.textContent = new_phonetic[0].text;
        const playDicAudio = new Audio(new_phonetic[0].audio);
        audioBtnEl.addEventListener("click", () => {
          playDicAudio.play();
        });
        dicMeaningEl.innerHTML = `  <p class="text-base font-normal text-[#757575]">Meaning</p>
        ${data[0].meanings[0].definitions.map((def) => {
          return `<div class="meaning-text-box flex gap-5 pt-7 items-center">
          <div
            class="ul-box w-[5px] h-[5px] rounded-full bg-[#8F19E8]"
          ></div>
            <p class="text-[15px] text-[#2D2D2D] dark:text-[#FFFFFF]">
              ${def.definition}
            </p>
            </div>`;
        })}
        <div class="synonms-row flex items-center gap-6 pt-6 md:pt-10">
          <p class="text-[#757575] font-normal text-base">Synonyms</p>
          <p class="text-[#A445ED] text-base font-bold">
          ${data[0].meanings[0].synonyms.map((def) => {
            return `${def}`;
          })};
          </p>
          </div>`;
        dicMeaningVerbEl.innerHTML = `<p class="text-base font-normal text-[#757575]">Meaning</p>
          <div class="meaning-text-box pt-7">
          ${data[0].meanings[1].definitions.map((def) => {
            return ` <div class="meaning-mano-box flex gap-5 items-center">
              <div
                class="ul-box w-[5px] h-[5px] rounded-full bg-[#8F19E8]"
                ></div>
              <p class="text-[15px] text-[#2D2D2D] dark:text-[#FFFFFF]">
              ${def.definition}
                </p>
                </div>`;
          })}
          ${data[0].meanings[1].definitions.map((def) => {
            return `<p
              class="text-[#757575] font-normal text-[15px] pt-3 pl-[20px]"
              >
              ${def.example}
            </p>`;
          })}
          </div>`;
        console.log(data);
        InpWordEl.value = "";
      } catch (error) {
        alert(error);
        alert("soz topilmadi");
        InpWordEl.value = "";
      }
    }
  } else {
    alert("So'zni kiritng!");
  }
}
// Word Serch end!
