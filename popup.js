// Initialize butotn with users's prefered color
let findPostBtn = document.querySelector('.js-find-post');
const usrProfilePicture = document.querySelector("nav ._6q-tv");

const descriptionInput = document.querySelector('.js-description-input')
const usernameInput = document.querySelector('.js-username-input')
const mediaInput = document.querySelector('.js-media-input')

let imgBase64 = null

////////////////////////////

const preview = document.querySelector('.preview')

// mediaInput.addEventListener('change', (e) => {
//   e.preventDefault()

//   const file = e.dataTransfer.items[0].getAsFile()
//   const reader = new FileReader()
//   const dtFile = new DataTransfer()
//   dtFile.items.add(file)
//   mediaInput.files = dtFile.files

//   reader.addEventListener('load', function () {
//     // Convert image file to base64 string
//     imgBase64 = reader.result
//     preview.src = reader.result
//     mediaInput.classList.add('loaded')
//   }, false)

//   reader.readAsDataURL(file)

// })

mediaInput.addEventListener('change', () => {
  const file = mediaInput.files[0]
  const reader = new FileReader()
  console.log("file=",file)
  reader.addEventListener('load', function () {
    // console.log("reader: ", reader)
    preview.src = reader.result
    imgBase64 = reader.result
  }, false)
  // reader.onload = function (e) {
  //   // console.log('e=', e)
  //   preview.src = reader.result
  //   imgBase64 = e.target.result
  // };

  if (file) {
    console.log("rf=",reader.readAsDataURL(file))
  }
})

////////////////////////

findPostBtn.addEventListener('click', async () => {
  // console.log("click")
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab === undefined || !tab.url.startsWith('https://www.instagram.com/')) {
    // chrome.storage.local.set({errorMessage: 'You need to be on the Youtube homepage !'})
    console.log("va sur insta chacal")
    return
  }

  const description = descriptionInput.value
  const username = usernameInput.value

  // console.log(imgBase64)
  try {

    chrome.storage.local.set({
      postProperties: {
        username: username,
        description: description,
        media: imgBase64
      }
    });
  } catch (e) {
    console.log("nope", e)
  }

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
  chrome.storage.local.get("postProperties", (result) => {
    const target = document.querySelectorAll("article")[currentIdex]
    console.log(result)
    console.log("result.media:", result.media)
    console.log("result.postProperties.media:", result.postProperties.media)

    const usernameTop = target.querySelector('.sqdOP.yWX7d._8A5w5.ZIAjV')
    const usernameDown = target.querySelector('.FPmhX.notranslate.MBL3Z')
    const description = target.querySelector('._8Pl3R')
    const imgPost = target.querySelector('.KL4Bh img.FFVAD')

    usernameTop.textContent = result.postProperties.username
    usernameDown.textContent = result.postProperties.username
    description.textContent = result.postProperties.description
    imgPost.src = result.postProperties.media
    imgPost.srcset =""
  });
}
