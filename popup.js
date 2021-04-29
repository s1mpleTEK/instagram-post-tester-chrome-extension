// Initialize butotn with users's prefered color
let findPostBtn = document.querySelector(".js-find-post");
const usrProfilePicture = document.querySelector("nav ._6q-tv");

const descriptionInput = document.querySelector('.js-description-input')
const usernameInput = document.querySelector('.js-username-input')


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


findPostBtn.addEventListener("click", async () => {
  console.log("click")
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const description = descriptionInput.value
  const username = usernameInput.value
  chrome.storage.sync.set({
    postProporties: {
      username: username,
      description: description
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
  chrome.storage.sync.get("description", ({ result }) => {
    post = document.querySelectorAll("article")[currentIdex]
    console.log(result.description)
  });
}
