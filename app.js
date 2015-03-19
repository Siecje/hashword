var keys = JSON.parse(localStorage.getItem('keys')) || [];
var domKeys = document.getElementById('keys');
domKeys.innerHTML += '<option value="' + '">' + '</option>';
for (var k in keys){
  domKeys.innerHTML += '<option value="' + keys[k] + '">' + keys[k] + '</option>';
}

var domCopy = document.getElementById('copy');
var domMaster = document.getElementById('master');
var domNewKey = document.getElementById('new_key');

domCopy.addEventListener('click', function(){
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

  copyToClipboard(hash);
});

function copyToClipboard (text) {
  // var copyEvent = new ClipboardEvent('copy', {dataType: 'text/plain', data: text} );
  //
  // document.dispatchEvent(copyEvent);
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
}
