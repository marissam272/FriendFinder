// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var siteFriends = require("../data/friendsData.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(siteFriends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

console.log("making sure this works first");
var goodFriend;
var userBio = req.body;
var userScore = userBio.scores;


console.log(`userScore outside of loop: ${userScore}`);

var bestMatch = {
    name: "",
    photo: "",
    friendDiff: 10000000
}


siteFriends.forEach(function(element, j) {

    var totalScore = 0;
    var difference = 0;
    console.log(`inside ${element.name}'s loop ******${j}*******`);
    console.log(`element.name: ${element.name}: element.scores:${element.scores} with a j index of ${j}`);
    console.log(`******************************************`);
    
    //looping within the siteFriends Loop--------------------
    element.scores.forEach(function(list, l) {
        //caching variable to get absolute value diffence
       difference = Math.abs(userScore[l] - list);
        console.log(`orbit userScore[l]: ${userScore[l]} - ${list} (list): ${userScore[l] - list}`);
        totalScore += difference;
        
        // console.log(`-------------`);
        // console.log(`compatibility score (lower number is better): ${totalScore}`);
    })
    console.log(`totalScore (lower number is better): ${totalScore}`);
    
    if (totalScore < bestMatch.friendDiff) {
        console.log(`say hello to your new friend ${element.name} ${element.photo}`);
        bestMatch.name = element.name;
        bestMatch.photo = element.photo;
        bestMatch.friendDiff = totalScore;
        console.log(`best Match name: ${bestMatch.name}`);
        console.log(`best Match difference: ${bestMatch.friendDiff}`);
        
    }
    //     console.log(`no friends for you`);
    // };

});
//had to after all the logic was performed
siteFriends.push(userBio);
//res responds to the fronte end wit hteh besMatch object
res.json(bestMatch);

}); 

};