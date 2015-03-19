var keys = JSON.parse(localStorage.getItem('keys')) || [];
var domKeys = document.getElementById('keys');
domKeys.innerHTML += '<option value="' + '">' + '</option>';
for (var k in keys){
  domKeys.innerHTML += '<option value="' + keys[k] + '">' + keys[k] + '</option>';
}

var domCopy = document.getElementById('copy');
var domMaster = document.getElementById('master');
var domNewKey = document.getElementById('new_key');

function submitForm(){
  var hash;
  if(domNewKey.value){
    hash = CryptoJS.SHA256(domNewKey.value + domMaster.value);

    if(keys.indexOf(domNewKey.value) < 0){
      keys.push(domNewKey.value);
    }

    localStorage.setItem('keys', JSON.stringify(keys));
  }
  else{
    hash = CryptoJS.SHA256(domKeys.value + domMaster.value);
  }

  // copyToClipboard(hash);
  showModal(hash);
}

domCopy.addEventListener('click', submitForm);

// function copyToClipboard (text){
//   window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
// }

function showModal(text){
  var domModal = document.getElementById('openModal');
  domModal.style.opacity = '1';
  domModal.style.pointerEvents = 'auto';
  var domPassword  = document.getElementById('password');
  domPassword.value = text;
  domPassword.select();
  // TODO: use text
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
  domNewKey.value = '';
  domKeys.value = '';
}

document.getElementById('close').addEventListener('click', close);
