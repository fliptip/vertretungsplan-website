//console.clear();

var millisecondsdate = Date.now();
var datePicker = document.getElementById('datePicker');
var value = document.getElementById('datePicker').value;

var userkey;
function getUserkey() {
  if (localStorage.getItem('userkey') === null) {
    var inputuserkey = prompt('Benutzername / Zugangscode eingeben!');
    inputuserkey.replace(' ', '');

    localStorage.setItem('userkey', inputuserkey);
    userkey = inputuserkey;
    return userkey;
  } else {
    userkey = localStorage.getItem('userkey');
    return userkey;
  }
}
getUserkey();

var url;
function substURL() {
  if (url === undefined) {
    if (document.cookie.split(';')[0].search('url') == -1) {
      //getUserkey();
      getSubstinationURL();
      console.log('no url cookie');
    } else {
      var cookie = `{"${document.cookie.split(';')[0].replace('=', '": "')}"}`;
      console.log('read cookie');
      var json = JSON.parse(cookie);
      //return cookie["url"];
      url = json['url'];
      console.log(url);
      substURL();
    }
  } else {
    console.log(`variable "url" already declare: ${url}`);
    datePicker.value = new Date(millisecondsdate).toISOString().slice(0, 10);
    //datePicker.onchange;
    triggerSubstitution();
  }
}

var geturl = 'https://webuntis.fliptip.workers.dev/';
var url;
async function getSubstinationURL() {
  const response = await fetch(geturl, {
    headers: {
      userkey: userkey,
      'content-type': 'application/json',
    },
    method: 'GET',
  });
  if (response.ok) {
    url = await response.text();
    console.log('chang: ' + url);
    let expires = new Date(Date.now() + 300000).toUTCString();
    document.cookie = `url=${url}; expires=${expires}`;
    substURL();
    //return url;
  }
}

//var url = getSubstinationURL().then();

//substURL();

//console.log("url: " + url);
function getSubstination(date) {
  var xhr = new XMLHttpRequest();
  //var url = "url";
  xhr.open('POST', url, true);
  //xhr.setRequestHeader('Content-Type', 'application/json');
  //xhr.setRequestHeader('userkey', userkey);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      //document.getElementById("app").innerHTML = xhr.response;
      console.log(json);
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
        console.log(rowsdata); // returns array of removed items
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

        if (rowsdata[4] == 'Entfall') {
          //console.log(row.data[4]);
          newRow.setAttribute('class', 'entfall vertretung');
        }
      }
    }
  }; // 7200000 milliseconds = 2 hours -> time in berlin

  var data = JSON.stringify({ date: date, userkey: userkey });

  xhr.send(data);
}

function triggerSubstitution() {
  if (userkey != null) {
    var value = document.getElementById('datePicker').value;
    var date = new Date(value).toISOString().split('T')[0].replace(/-/g, '');

    remove('.vertretung');
    getSubstination(date);
  } else {
    getUserkey();
  }
}

datePicker.onchange = function () {
  triggerSubstitution();
};

const remove = (sel) =>
  document.querySelectorAll(sel).forEach((el) => el.remove());

substURL();
