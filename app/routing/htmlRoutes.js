// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  
  app.get("*.js", function(req, res) {
    var jsParam = req.params[0];
    console.log(jsParam);
    res.sendFile(path.join(__dirname, "../public/resources/js/" + jsParam + ".js" ));
  });

  app.get("*.css", function(req, res) {
    var cssParam = req.params[0];
     
    res.sendFile(path.join(__dirname, "../public/resources/css/" + cssParam + ".css" ));
  });
 
  app.get("*.jpg", function(req, res) {
    var imageParam = req.params[0];
      
    res.sendFile(path.join(__dirname, "../public/resources/images/" + imageParam + ".jpg" ));
  });

  app.get("*.png", function(req, res) {
    var imageParam = req.params[0];
    console.log(imageParam); 
    res.sendFile(path.join(__dirname, "../public/resources/images/" + imageParam + ".png" ));
  });



  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
