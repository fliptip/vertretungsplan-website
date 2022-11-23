function deleteAccessKey() {
  localStorage.removeItem('userkey');
  subst.key = undefined
  localStorage.setItem('userkey', undefined);
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

function refreshData() {
  triggerSubstitution()
}

function changeClass() {
  var inputClass = prompt("Klasse eingeben");
  subst.class = inputClass.toUpperCase()
}

function deleteClass() {
  if (subst.class != undefined) { alert(`${subst.class} ist jetzt nicht mehr deine Klasse.`) }
  subst.class = undefined
}

const refreshDataButton = document.getElementById("refreshData")
refreshDataButton.addEventListener("click", refreshData);


const deleteAccessKeyButton = document.getElementById("deleteAccessKey")
deleteAccessKeyButton.addEventListener("click", deleteAccessKey);

const changeAccessKeyButton = document.getElementById("changeAccessKey")
changeAccessKeyButton.addEventListener("click", changeAccessKey);

const deleteClassButton = document.getElementById("deleteClass")
deleteClassButton.addEventListener("click", deleteClass);

const changeClassButton = document.getElementById("changeClass")
changeClassButton.addEventListener("click", changeClass);