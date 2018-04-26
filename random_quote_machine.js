var main = function() {
  
  

    var colors = ["#ED2007", "#EDAB07", "#ECF30A", "#69F30A", "#0AF3E8", "#0A69F3", "#DE0AF3", "#F30ADE"];
      
      var quotes = [
        "If you have nothing, are you a nillionaire?",
        "Turning up the volume is like zooming in, but with sound.",
        "If I eat myself, will I get twice as big, or disappear completely?",
        "Out of my mind. Back in five minutes",
        "I’m not a complete idiot — Some parts are missing."
      ];
      var tweetQuote;
      
      //begin
      //when btn-1 is click, perform following
      $(".btn-1").click(function(){
        var $this = $(this);
        debugger;
      $this[0].innerText  ='loading...';
        setTimeout(function() {
          //begin loop
      
      for(var i = 0; i < quotes.length; i++){
        var randQuote = Math.floor(Math.random() * (quotes.length - 1) + 1);  
        tweetQuote = quotes[randQuote];
            $('#quote')[0].innerText = quotes[randQuote];            
        }

      
      for(var j = 0; j < colors.length; j++){
         var randColor = Math.floor((Math.random() * colors[j].length-1));
        
        switch(randColor){
          case 0:                                       document.body.style.backgroundColor = "#ED2007";
            $this.css('background-color', '#ED2007');
           break;
            
          case 1:
            document.body.style.backgroundColor = "#EDAB07";
  

    $this.css('background-color', '#EDAB07');
                break;
            
          case 2:
            document.body.style.backgroundColor ="#ECF30A";
         $this.css('background-color', '#ECF30A');
            break;
            
          case 3:
            document.body.style.backgroundColor = "#69F30A";
         $this.css('background-color', '#69F30A');

            break;
            
          case 4:
            document.body.style.backgroundColor ="#0AF3E8";
          $this.css('background-color', '#0AF3E8');
            break;
            
          case 5:
            document.body.style.backgroundColor = "#0A69F3";
            $this.css('background-color', '#0A69F3');
            break;
            
          case 6: 
            document.body.style.backgroundColor = "#DE0AF3";
            $this.css('background-color', '#DE0AF3');
            break;
            
          case 7:
            document.body.style.backgroundColor="#F30ADE";
            $this.css('background-color', '#F30ADE');
            break;
            
          default:
            document.body.style.backgroundColor="#00ccff";
            $this.css('background-color', '#00ccff');
 
        }
    }
       $this[0].innerText = 'New Quote';
  

     }, 2000);
    });
      //end
      
      //when tumblr btn is click, perform following
      $(".fa-tumblr-square").click(function(){
        location.href = "https://www.tumblr.com/";
      });
      
      //when twitter btn is click, perform following
      $(".fa-twitter-square").click(function(){
        var URL = 'https://twitter.com/intent/tweet?text=' + tweetQuote;
        window.open(URL);
      });
      
    };
    
    $(document).ready(main);
