var keys = JSON.parse(localStorage.getItem('keys')) || [];

function addKey(value){
  var keyList = document.getElementById('keyList');
  var keyInput = document.createElement('input');
  keyInput.setAttribute('type', 'text');
  if (value != undefined){
    keyInput.setAttribute('value', value);
  }
  keyList.appendChild(keyInput);
}

function showKeys(){
  var keyList = document.getElementById('keyList');
  keyList.innerHTML = '';
  for (var k of keys){
    addKey(k);
  }
}

$(document).ready(function(){
  showKeys();
});

function saveKeys(){
  var keyInputs = document.querySelectorAll('#keyList > input');
  keys = [];
  var newKey;
  for(var i in keyInputs){
    newKey = keyInputs[i].value;
    console.log(newKey);
    console.log(keys.indexOf(newKey));
    if(newKey && keys.indexOf(newKey) === -1){
      keys.push(newKey);
    }
  }
  localStorage.setItem('keys', JSON.stringify(keys));
  showKeys();
}
