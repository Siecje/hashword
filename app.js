var keys = JSON.parse(localStorage.getItem('keys')) || [];

var domKeys = document.getElementById('keys');

function updateDOMKeys(){
  domKeys.innerHTML = '';
  for (let k of keys) {
    domKeys.innerHTML += `<option value="${k}">`;
  }
}

updateDOMKeys();

var domCopy = document.getElementById('copy');
var domMaster = document.getElementById('master');
var domKey = document.getElementById('key');

function submitForm(){
  var hash = CryptoJS.SHA256(domKey.value + domMaster.value);

  if (keys.indexOf(domKey.value) < 0) {
    keys.push(domKey.value);
    localStorage.setItem('keys', JSON.stringify(keys));
    updateDOMKeys();
  }
  navigator.clipboard.writeText(hash).then(
    () => {
      showModal();
    },
    () => {
      console.log("Failed");
    },
  );
  
}

domCopy.addEventListener('click', submitForm);

function showModal() {
  var domModal = document.getElementById('openModal');
  domModal.style.opacity = '1';
  domModal.style.pointerEvents = 'auto';
}

function close() {
  // hide modal
  var domModal = document.getElementById('openModal');
  domModal.style.opacity = '0';
  domModal.style.pointerEvents = 'none';

  // clear inputs
  domMaster.value = '';
  domKey.value = '';
}

document.getElementById('close').addEventListener('click', close);

document.addEventListener("keypress", function(e){
  if (e.key === 'Escape') {
    close();
  }
});

function manageKeys() {
  // hide form
  document.getElementById('form').style.display = 'none';
  document.getElementById('manageBtn').style.display = 'none';
  document.getElementById('backBtn').style.display = 'block';
  var domManageKeys = document.getElementById('manageKeys');
  domManageKeys.style.display = 'block';
  var domKeys = document.getElementById('keyList');
  domKeys.innerHTML = '';

  if (keys.length === 0) {
    domKeys.innerHTML += "You don't have any Password Keys.";
  }
  else {
    for (var k of keys) {
      domKeys.innerHTML += `<input type="text" value="${k}">`;
    }
  }
}

function saveKeys() {
  var keyInputs = document.querySelectorAll('#keyList > input');
  keys = [];
  for (let i of keyInputs) {
    if (i.value) {
      keys.push(i.value);
    }
  }
  updateDOMKeys();
  localStorage.setItem('keys', JSON.stringify(keys));
}

function backToForm(){
  document.getElementById('form').style.display = 'block';
  var domManageKeys = document.getElementById('manageKeys');
  domManageKeys.style.display = 'none';
  document.getElementById('manageBtn').style.display = 'block';
  document.getElementById('backBtn').style.display = 'none';
}
