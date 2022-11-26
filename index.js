if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
};


var subst = {
  url: undefined,
  expires: undefined,
  key: undefined,
};

function initialize() {
  //console.log(`subst.url: ${subst.url} \n  expires: ${subst.expires}`);
  if (localStorage.getItem('userkey') === null) {
    var inputuserkey = prompt('Persönlichen Zugangscode eingeben!');
    inputuserkey.replace(' ', '');

    localStorage.setItem('userkey', inputuserkey);
    subst.key = inputuserkey;
    return inputuserkey;
  } else {
    subst.key = localStorage.getItem('userkey');
    return subst.key;
  }
}
initialize();

var geturl = 'https://vertretungsplan.fliptip.workers.dev/';
async function getSubstinationURL() {
  const response = await fetch(geturl, {
    headers: {
      userkey: subst.key,
      'content-type': 'application/json',
    },
    method: 'GET',
  });
  if (response.ok) {
    subst.url = await response.text();
    //console.log('subst.url set:  ' + subst.url);
    subst.expires = subst.url.split('&expiry=')[1];
    return 1 // values of subst Objeject completlay defined
  }
}

getSubstinationURL().then(() => {substURL()});