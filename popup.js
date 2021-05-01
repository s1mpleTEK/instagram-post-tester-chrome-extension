// Initialize butotn with users's prefered color
let findPostBtn = document.querySelector(".js-find-post");
const usrProfilePicture = document.querySelector("nav ._6q-tv");

const descriptionInput = document.querySelector('.js-description-input')
const usernameInput = document.querySelector('.js-username-input')
const mediaInput = document.querySelector('.js-media-input')

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });
mediaInput.addEventListener("change", (e) => {
  // console.log("change", e)
  const preview = document.querySelector('.preview');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false)

  if (file) {
    reader.readAsDataURL(file);
  }
})

findPostBtn.addEventListener("click", async () => {
  // console.log("click")
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const description = descriptionInput.value
  const username = usernameInput.value
  const media = mediaInput.value
  chrome.storage.sync.set({
    postProperties: {
      username: username,
      description: description,
      media: media
    }
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: findPost,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

function findPost() {
  let currentIdex = 0;
  chrome.storage.sync.get("postProperties", (result) => {
    const target = document.querySelectorAll("article")[currentIdex]
    console.log(result)
    // console.log("result.username:", result.username)
    // console.log("result.postProperties.username:", result.postProperties.username)

    const usernameTop = target.querySelector('.sqdOP.yWX7d._8A5w5.ZIAjV')
    const usernameDown = target.querySelector('.FPmhX.notranslate.MBL3Z')
    const description = target.querySelector('._8Pl3R')

    usernameTop.textContent = result.postProperties.username
    usernameDown.textContent = result.postProperties.username
    description.textContent = result.postProperties.description
  });
}
