var keys = JSON.parse(localStorage.getItem('keys')) || [];

var domKeys = document.getElementById('keys');

function updateKeys(){
  domKeys.innerHTML = '';
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

function capitalizeFirstLetter(hash){
  for(var i=0;i<hash.length;i++){
    if(hash[i].toUpperCase() !== hash[i]){
      if(i === hash.length - 1){
        return hash.substring(0, i) + hash[i].toUpperCase();
      }
      else{
        return hash.substring(0, i) + hash[i].toUpperCase() + hash.substring(i+1, hash.length);
      }
    }
  }
}

function copyToClipboard(hash){
  var gui = require('nw.gui');
  var clipboard = gui.Clipboard.get();
  // Add special character and
  // ensure there is a capital letter
  var password = '!' + capitalizeFirstLetter(hash.toString());
  clipboard.set(password, 'text');
}

function clearInputs(){
  domMaster.value = '';
  domKey.value = '';
}

function addKey(){
  var domKeys = document.getElementById('keyList');
  domKeys.innerHTML += '<input type="text"><br>';
}

function removeKey(keyIndex){
  var domKeys = document.getElementById('keyList');
  var toRemove = document.getElementById(keyIndex);
  domKeys.removeChild(toRemove);
}

function manageKeys(){
  // hide form
  document.getElementById('passwordForm').style.display = 'none';
  document.getElementById('manageBtn').style.display = 'none';
  document.getElementById('backBtn').style.display = 'block';
  var domManageKeys = document.getElementById('manageKeys');
  domManageKeys.style.display = 'block';
  var domKeys = document.getElementById('keyList');
  domKeys.innerHTML = '';

  if(keys.length === 0){
    domKeys.innerHTML += 'You don\'t have any Password Keys.';
  }
  else{
    for(var i in keys){
      domKeys.innerHTML += '<div id="key_' + i + '"><input type="text" value="' + keys[i] + '"><button type="button" onclick="removeKey(' + i + ')">Delete</button><div>';
    }
  }
}

function saveKeys(){
  var keyInputs = document.querySelectorAll('#keyList > input');
  keys = [];
  for(var i in keyInputs){
    if(keyInputs[i].value){
      keys.push(keyInputs[i].value);
    }
  }
  updateKeys();
  localStorage.setItem('keys', JSON.stringify(keys));
}

function backToForm(){
  document.getElementById('passwordForm').style.display = 'block';
  var domManageKeys = document.getElementById('manageKeys');
  domManageKeys.style.display = 'none';

  var manageBtn = document.getElementById('manageBtn');
  manageBtn.style.display = 'inline-block';
  //manageBtn.style.textAlign = 'center';
  document.getElementById('backBtn').style.display = 'none';
}
