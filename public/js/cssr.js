function getAgeCounts() {
    console.log("got to age counts");
    d3.json("cssr/ageCounts").then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
        // Do some error handling.
      });
}