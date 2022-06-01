setNumberOfAccidents();
setNumberOfInjuries();
setNumberOfSeriousInjuries();
setNumberOfFatalities();

function setNumberOfAccidents() {
  document.getElementById("number-of-accidents").innerHTML = "Loading...";
  d3.json("cssr/numberOfAccidents").then(function(data) {
      document.getElementById("number-of-accidents").innerHTML = parseInt(data["number_of_accidents"]).toLocaleString();
    })
    .catch(function(error) {
      console.log(error);
      // Do some error handling.
    });
}

function setNumberOfInjuries() {
  document.getElementById("number-of-injuries").innerHTML = "Loading...";
  d3.json("cssr/numberOfInjuries").then(function(data) {
      document.getElementById("number-of-injuries").innerHTML = parseInt(data["number_of_injuries"]).toLocaleString();
    })
    .catch(function(error) {
      console.log(error);
      // Do some error handling.
    });
}

function setNumberOfSeriousInjuries() {
  document.getElementById("number-of-serious-injuries").innerHTML = "Loading...";
  d3.json("cssr/numberOfSeriousInjuries").then(function(data) {
      document.getElementById("number-of-serious-injuries").innerHTML = parseInt(data["number_of_serious_injuries"]).toLocaleString();
    })
    .catch(function(error) {
      console.log(error);
      // Do some error handling.
    });
}

function setNumberOfFatalities() {
  document.getElementById("number-of-fatalities").innerHTML = "Loading...";
  d3.json("cssr/numberOfFatalities").then(function(data) {
      document.getElementById("number-of-fatalities").innerHTML = parseInt(data["number_of_fatalities"]).toLocaleString();
    })
    .catch(function(error) {
      console.log(error);
      // Do some error handling.
    });
}