const images = [
  "images/01.png",
  "images/02.png",
  "images/03.png",
  "images/04.png",
  "images/05.png",
  "images/06.png",
];
const randomImage = images[Math.floor(Math.random() * images.length)];
const imageURL = chrome.runtime.getURL(randomImage); // Get the proper URL for the image
document.body.innerHTML = `<img src="${imageURL}" alt="Blocked Image">`;
