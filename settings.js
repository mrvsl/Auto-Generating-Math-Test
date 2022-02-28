const numQSlider = document.querySelector('#numQSlider'); // slider to select num of questions
const numQText = document.querySelector('#numQText');
const homeBtn = document.querySelector('#settingsToHome')

numQText.innerHTML = numQSlider.value;
numQSlider.oninput = () => {
  numQText.innerHTML = numQSlider.value;
}

homeClicked => {
  localStorage.setItem('numOfQuestions', numQText.innerHTML)
  window.location.assign('/')
}