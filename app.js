var keys = JSON.parse(localStorage.getItem('keys')) || [];

var domKeys = document.getElementById('keys');

function updateKeys(){
  for (var k in keys){
    domKeys.innerHTML += '<option value="' + keys[k] + '">';
  }
}

updateKeys();

var domCopy = document.getElementById('copy');
var domMaster = document.getElementById('master');
var domKey = document.getElementById('key');

function submitForm(){

  var hash = CryptoJS.SHA256(domKey.value + domMaster.value);

  if(keys.indexOf(domKey.value) < 0){
    keys.push(domKey.value);
    localStorage.setItem('keys', JSON.stringify(keys));
    updateKeys();
  }

  showModal(hash);
}

domCopy.addEventListener('click', submitForm);

function showModal(text){
  var domModal = document.getElementById('openModal');
  domModal.style.opacity = '1';
  domModal.style.pointerEvents = 'auto';
  var domPassword  = document.getElementById('password');
  domPassword.value = text;
  domPassword.select();
}

function close(){
  // hide modal
  var domModal = document.getElementById('openModal');
  domModal.style.opacity = '0';
  domModal.style.pointerEvents = 'none';

  // clear inputs
  var domPassword  = document.getElementById('password');
  domPassword.value = '';
  domMaster.value = '';
  domKey.value = '';
}

document.getElementById('close').addEventListener('click', close);

document.addEventListener("keypress", function(e){
  if(e.keyCode === 27){
    close();
  }
});
