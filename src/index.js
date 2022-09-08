if (localStorage.getItem("username") === null) {
  var inputusername = prompt("Benutzername (Vorname) eingeben!");
  localStorage.setItem("username", inputusername);
} else {
  var username = localStorage.getItem("username");
}

var millisecondsdate = Date.now();
//var datepicker = document.getElementById("datePicker");
//document.getElementById("datePicker").value = new Date(Date.now()).toISOString().split("T")[0];

document.getElementById("datePicker").value = new Date()
  .toISOString()
  .slice(0, 10);

//var url = "https://reqbin.com/echo/post/json";
//var url = "https://webuntis.fliptip.workers.dev/";
var url = "https://vertretungsplan.fliptip.workers.dev/";

// Sending and receiving data in JSON format using POST method
//
var plan = document.getElementById("plan0");
function getSubstination(date) {
  var xhr = new XMLHttpRequest();
  //var url = "url";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("username", username);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      //document.getElementById("app").innerHTML = xhr.response;
      console.log(json);
      var rows = json["payload"]["rows"];
      for (let x in rows) {
        var c = rows[x]["group"];
        let newRow = document.createElement("tr");
        var td = document.createElement("td");
        newRow.appendChild(td);
        td.innerHTML = c;
        var rowsdata = rows[x]["data"];
        // returns mutated array
        rowsdata.splice(5, 1);
        console.log(rowsdata); // returns array of removed items
        for (let data in rowsdata) {
          var td = document.createElement("td");
          //console.log(row["data"][data]);
          td.innerHTML = rowsdata[data];
          newRow.setAttribute("class", "vertretung");
          newRow.appendChild(td);
        }
        //newRow.innerHTML = "This is a paragraph.";
        //console.log(row.data);
        // Append to another element:
        var plan = document.getElementById("plan0");
        plan.appendChild(newRow);

        if (rowsdata[4] == "Entfall") {
          //console.log(row.data[4]);
          newRow.setAttribute("class", "entfall vertretung");
        }
      }
    }
  }; // 7200000 milliseconds = 2 hours -> time in berlin

  var data = JSON.stringify({ date: date });

  xhr.send(data);
}

var date = new Date(millisecondsdate)
  .toISOString()
  .split("T")[0]
  .replace(/-/g, "");

getSubstination(date);

const remove = (sel) =>
  document.querySelectorAll(sel).forEach((el) => el.remove());

document.getElementById("datePicker").onchange = function () {
  var value = document.getElementById("datePicker").value;
  var date = new Date(value).toISOString().split("T")[0].replace(/-/g, "");

  remove(".vertretung");

  getSubstination(date);
};
