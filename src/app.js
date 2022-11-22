
var millisecondsdate = Date.now();
var datePicker = document.getElementById('datePicker');
var value = document.getElementById('datePicker').value;

var subst = {
  url: undefined,
  expires: undefined,
  key: undefined,
};

var userkey;
function initialize() {
  console.log(`subst.url: ${subst.url} \n  expires: ${subst.expires}`);
  datePicker.value = new Date(millisecondsdate).toISOString().slice(0, 10);
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

function substURL() {
  console.log(subst.url + " " + subst.expires);
  if (subst.url === undefined || Date.now() > subst.expires) {
    //initialize();
    console.log('undefined ' + subst.url);
    getSubstinationURL();
  } else {
    //datePicker.onchange;
    triggerSubstitution();
  }
}

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
    console.log('subst.url set:  ' + subst.url);
    subst.expires = subst.url.split('&expiry=')[1];
    //document.cookie = `url=${url}; expires=${expires}`;
    substURL();
    //return url;
  }
}

//var url = getSubstinationURL().then();

//substURL();

//console.log("url: " + url);
function getSubstination(date) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', subst.url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        //document.getElementById("app").innerHTML = xhr.response;
        console.log(json);
        document.getElementById('lastUpdate').innerHTML = `Stand: ${json['payload']['lastUpdate']}`
        var rows = json['payload']['rows'];
        for (let x in rows) {
            var c = rows[x]['group'];
            let newRow = document.createElement('tr');
            var td = document.createElement('td');
            newRow.appendChild(td);
            td.innerHTML = c;
            var rowsdata = rows[x]['data'];
            // returns mutated array
            rowsdata.splice(5, 1);
            //console.log(rowsdata); // returns array of removed items
            for (let data in rowsdata) {
            var td = document.createElement('td');
            //console.log(row["data"][data]);
            td.innerHTML = rowsdata[data];
            newRow.setAttribute('class', 'vertretung');
            newRow.appendChild(td);
            }
            //newRow.innerHTML = "This is a paragraph.";
            //console.log(row.data);
            // Append to another element:
            var plan = document.getElementById('plan0');
            plan.appendChild(newRow);

            if (rowsdata[4] == 'Entfall'  || rowsdata[4].includes('Verlegung nach')) {
            //console.log(row.data[4]);
            newRow.setAttribute('class', 'entfall vertretung');
            }
        }
        }
    }; // 7200000 milliseconds = 2 hours -> time in berlin

    var data = JSON.stringify({ date: date, userkey: subst.key });

    xhr.send(data);
}

function triggerSubstitution() {
  if (Date.now() < subst.expires) {
    var value = document.getElementById('datePicker').value;
    var date = new Date(value).toISOString().split('T')[0].replace(/-/g, '');

    remove('.vertretung');
    getSubstination(date);
  } else {
    substURL();
  }
}

datePicker.onchange = function () {
  triggerSubstitution();
};

const remove = (sel) =>
  document.querySelectorAll(sel).forEach((el) => el.remove());

substURL();