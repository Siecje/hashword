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
  copyToClipboard(hash);
  clearInputs();
}

function copyToClipboard(password){
  var gui = require('nw.gui');
  var clipboard = gui.Clipboard.get();
  clipboard.set(password.toString(), 'text');
}

function clearInputs(){
  domMaster.value = '';
  domKey.value = '';
}
