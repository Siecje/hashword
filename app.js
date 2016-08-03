'use strict';

var keys = JSON.parse(localStorage.getItem('keys')) || [];

var domKeys = document.getElementById('keys');

function updateKeys(){
  var keyData = {};
  for(var k of keys){
    keyData[k] = null;
  }
  $('#passwordKey').autocomplete({
    data: keyData
  })
}

$(document).ready(function(){
  updateKeys();
});

var domCopy = document.getElementById('copy');
var domMaster = document.getElementById('master');
var domKey = document.getElementById('passwordKey');

function clearInputs(){
  domMaster.value = '';
  domKey.value = '';
}

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
  // Add special character and
  // ensure there is a capital letter
  var password = '!' + capitalizeFirstLetter(hash.toString());
  const {clipboard} = require('electron');
  clipboard.writeText(password);
  Materialize.toast('Password copied to clipboard!', 4000)
}
