console.log("app.js loaded top")

var millisecondsdate = Date.now();
var datePicker = document.getElementById('datePicker');
var value = document.getElementById('datePicker').value;

datePicker.value = new Date(millisecondsdate).toISOString().slice(0, 10);

// first get substination call
function substURL() {
  console.log('substURL() ' + document.readyState + ' ' + subst.url + " " + subst.expires);
  if (subst.url === undefined || Date.now() > subst.expires) {
    //console.log('undefined ' + subst.url);
    console.log(`app.js substurl get substitutionURL ${subst.url} ${subst.key}`)
    getSubstinationURL();
  } else {
    triggerSubstitution();
  }
}

function getSubstination(date) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', subst.url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      //console.log("substitution loaded")
      statusText(`Stand: ${json['payload']['lastUpdate']}`);
      substinationLoaded();
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
      } //else { console.log("substitution not loaded") };
    };

    var data = JSON.stringify({ date: date, userkey: subst.key });

    xhr.send(data);
}

function triggerSubstitution() {
  remove('.vertretung');
  document.getElementById("refreshData").style.visibility = "visible";
  if (Date.now() < subst.expires) {
    var value = document.getElementById('datePicker').value;
    var date = new Date(value).toISOString().split('T')[0].replace(/-/g, '');

    getSubstination(date);
  } else {
    substURL();
  }
}

getSubstinationURL().then(() => {substURL()});

function substinationLoaded() {
  document.getElementById("refreshData").style.visibility = "hidden";
}

function statusText(status) {
  document.getElementById('lastUpdate').innerHTML = status
}

datePicker.addEventListener('change', triggerSubstitution);


function remove(sel) {
  document.querySelectorAll(sel).forEach((el) => el.remove());
}