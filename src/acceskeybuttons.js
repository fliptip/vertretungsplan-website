function deleteAccessKey() {
    getSubstinationURL()
    localStorage.removeItem('userkey')
    alert(`Dein persönlichen Zugangscode wurder von diesem Gerät gelöscht, du kannst diese Sitzung noch 5 Minuten zuende führen.`)
    subst.key = null
    localStorage.setItem('userkey', null);
  }
  
  function changeAccessKey() {
    var inputuserkey = prompt('Persönlichen Zugangscode eingeben!');
    inputuserkey.replace(' ', '');
    subst.key = inputuserkey
    localStorage.setItem('userkey', inputuserkey);
    getSubstinationURL()
  }
  
  const deleteAccessKeyButton = document.getElementById("deleteAccessKey")
  deleteAccessKeyButton.addEventListener("click", deleteAccessKey);
  
  const changeAccessKeyButton = document.getElementById("changeAccessKey")
  changeAccessKeyButton.addEventListener("click", changeAccessKey);
   