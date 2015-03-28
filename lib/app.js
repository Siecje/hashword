import scrypt from 'scrypt';

var keys = JSON.parse(localStorage.getItem('keys')) || [];

var domKeys = document.getElementById('keys');

function updateKeys(){
  domKeys.innerHTML = '';
  keys.forEach(function(key){
    domKeys.innerHTML += '<option value="' + key + '">';
  });
}

updateKeys();

var domCopy = document.getElementById('copy');
var domMaster = document.getElementById('master');
var domKey = document.getElementById('key');

function submitForm(){
  if(keys.indexOf(domKey.value) < 0){
    keys.push(domKey.value);
    localStorage.setItem('keys', JSON.stringify(keys));
    updateKeys();
  }

  var password = domKey.value + domMaster.value;
  var maxtime = 0.1;

  scrypt.passwordHash(password, maxtime, function(err, pwdhash){
    if (!err){
      showModal(pwdhash);
    }
  });
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

function manageKeys(){
  // hide form
  document.getElementById('form').style.display = 'none';
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
    keys.forEach(function(key){
      domKeys.innerHTML += '<input type="text" value="' + key + '">';
    });
  }
}

function saveKeys(){
  var keyInputs = document.querySelectorAll('#keyList > input');
  keys = [];
  keyInputs.forEach(function(keyInput){
    if(keyInput.value){
      keys.push(keyInput.value);
    }
  });
  updateKeys();
  localStorage.setItem('keys', JSON.stringify(keys));
}

function backToForm(){
  document.getElementById('form').style.display = 'block';
  var domManageKeys = document.getElementById('manageKeys');
  domManageKeys.style.display = 'none';
  document.getElementById('manageBtn').style.display = 'block';
  document.getElementById('backBtn').style.display = 'none';
}
