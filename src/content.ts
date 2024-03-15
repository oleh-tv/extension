import { HIGHLIGHTS_KEY, MENU_ITEMS } from "./constants";

window.onload = () => {
  chrome.storage.local.get(HIGHLIGHTS_KEY, (data) => {
    const url = window.location.href;
    for (const highlight of data[HIGHLIGHTS_KEY][url] || []) {
      const text = highlight.text;
      const elements = Array.from(
        document.querySelectorAll(":not(iframe)")
      ).filter(
        (element) => element.textContent && element.textContent.includes(text)
      );

      for (const element of elements) {
        const regex = new RegExp(text, "g");
        const html = element.innerHTML;
        element.innerHTML = html.replace(
          regex,
          `<span style="background-color: aquamarine">${text}</span>`
        );
      }
    }
  });
};

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const range = window.getSelection().getRangeAt(0);
    const wrapper = document.createElement("span");
    wrapper.style.backgroundColor = "aquamarine";
    wrapper.style.color = "black";
    wrapper.style.padding = "10px";
    range.surroundContents(wrapper);

    chrome.runtime.sendMessage({ type: MENU_ITEMS.ADD, text: selectedText });
  }
});
