
$(document).ready(function(){
  $("#surveySubmit").on("click", function(e){
    e.preventDefault();
    //First validate that there is an entry for each value
    $('#specialMessage').text("");
    var characterQuestionArray = [];
    var yourName = $('#yourName').val();
    var yourURL = $('#yourURL').val();
    
   if(yourName === '' || yourURL === ''){
    $('#specialMessage').text("Please complete your name and provide a photo link!");
    return;  
   }
     
   for( var i = 1; i <= 10; i++){
     var qValue = $('input[name=question' + i +']:checked').val(); 
     if(typeof(qValue) == 'undefined') {
       $('#specialMessage').text("Please complete all questions!");
       return;
     }
     else{
       characterQuestionArray.push(parseInt(qValue));
     }
   }
    //let's sum all values in the array
   var characterArraySum = characterQuestionArray.reduce(function(accumulator, value){
     return accumulator + value;
   });

    //create a new object
    var yourObject = 
    {
      "name":yourName,
      "photo":yourURL,
      "scores":characterQuestionArray
    }

    //Now, lets create a new array of objects
    var cartoonObjectArray;
    getCharacterData(yourObject);

    //Now let's push the new object
    $.post("/api/friends", yourObject,
        function(data) {
          //Received a response,  
          if (data) {
            console.log("Your Character Successfully pushed!");

          }
          // Response failed
          else {
            alert("Unsuccesful post");
          }
        });
     

  });

  $("#tryAgainButton").on("click", function(e){
    e.preventDefault();
    $('#topMatch h4').text("");
      $('#topMatch').css("background",'url("") no-repeat center' );
      $('#alternativeOne h4').text("");
      $('#alternativeOne').css("background",'url("") no-repeat center' );
      $('#alternativeTwo h4').text("");
      $('#alternativeTwo').css("background",'url("") no-repeat center' );

      $('.surveyBackground').show(2000);
      $('.favoriteCharacters').hide;
  });
});


function getCharacterData(theObject) {
  var temp =  $.ajax({ url:"/api/friends", method: "GET" })
    .then(function(friendData) {
      var compArray = [];     //Array of Comparison Objects
        
      //First find sum of your object
      var characterArraySum = theObject.scores.reduce(function(accumulator, value){
        return accumulator + value;
      });

      //For each cartoon object find the scores and subtract the sum
      for(var i = 0; i < friendData.length; i++){
        var cartoonArraySum = friendData[i].scores.reduce(function(accumulator, value){
          return accumulator + value;
      });
            
      compArray.push({index: i, difference: Math.abs(cartoonArraySum - characterArraySum)});
    }
    
    //Now sort the array in descending order
    compArray.sort(function(a,b){
      return a.difference - b.difference;
    });
     
    //Now the array is sorted, choose the top 3 to fill the results with 
    $('#topMatch h4').text(friendData[compArray[0].index].name);
    $('#topMatch').css("background",'url(' + friendData[compArray[0].index].photo + ') no-repeat center' );
    $('#alternativeOne h4').text(friendData[compArray[1].index].name);
    $('#alternativeOne').css("background",'url(' + friendData[compArray[1].index].photo + ') no-repeat center' );
    $('#alternativeTwo h4').text(friendData[compArray[2].index].name);
    $('#alternativeTwo').css("background",'url(' + friendData[compArray[2].index].photo + ') no-repeat center' );

    //Now clear input
    for( var i = 1; i <= 10; i++){
      $('input[name=question' + i +']').prop('checked', false);
    }
    $('.surveyBackground').hide();
    $('.favoriteCharacters').show(1000);
    $('#yourName').text("");
    $('#yourURL').text("");

    //Now let's add the current user to the characterObject

         
         
    });

    
}
 