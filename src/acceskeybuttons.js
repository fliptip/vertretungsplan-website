function deleteAccessKey() {
  localStorage.removeItem('userkey');
  subst.key = undefined
  triggerSubstitution();
  statusText(`persönlichen Zugangscode fehlt`);
  alert(`Dein persönlichen Zugangscode wurder von diesem Gerät gelöscht.`)
}

function changeAccessKey() {
  var inputuserkey = prompt('Persönlichen Zugangscode eingeben!');
  statusText(`Datum oder Zugangscode falsch?`);
  inputuserkey.replace(' ', '');
  subst.key = inputuserkey
  localStorage.setItem('userkey', inputuserkey);
  triggerSubstitution();
}

const deleteAccessKeyButton = document.getElementById("deleteAccessKey")
deleteAccessKeyButton.addEventListener("click", deleteAccessKey);

const changeAccessKeyButton = document.getElementById("changeAccessKey")
changeAccessKeyButton.addEventListener("click", changeAccessKey);

function refreshData() {
  triggerSubstitution()
}

const refreshDataButton = document.getElementById("refreshData")
refreshDataButton.addEventListener("click", refreshData);