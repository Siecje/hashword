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
