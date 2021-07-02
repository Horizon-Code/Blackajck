


$(document).ready(function(){
    var dealer = $('#dealer');
    var message = $('#message');
    var dogecoinValue = $('#dogecoinValue');
    var output = $('#output');
    var player = $('#player');
    var pValue = $('#pValue');
    var dValue = $('#dValue');
    var start = $('#start');
    var dogecoins = $('#dogecoins');
    var bet = $('#bet');
    var maxbet = $('#maxbet');
    var myactions = $('#myactions');
    var cover = $('#cover');
    var btndeal = $('#btndeal');
  });
  
  
      var colors=['spades', 'hearts', 'clubs', 'diams'];
     var values=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
     var pool= [];
     var cards = [];
     var dealerCards = [];
     var playerCards = [];
     var cardCount = 0;
     var mydogecoins = 100;
     var endplay=false;
     var rewards = 1;
  
    function maxbet(){
      bet.value = mydogecoins;
  
    }
     
  
  
  //First step is create our own deck!!
     
  //1.Loop through the colors and conver the first letter to capital
    for(c in colors){
      var color = colors[c][0].toUpperCase();
  //2. Chose wich color and save it
      var pickColor = (color == "S" || color == "C") ? "black" : "red";
       for(v in values){  
  //3. Add value numbers to the cards
       var cardValue = (v>9) ? 10 : parseInt(v)+1;
  //4. Save all info needed from every card and generate card prototype
       var card = {
         color: color,
         icon: colors[c],
         pickColor: pickColor,
         cardRaw: values[v],
         cardValue: cardValue,
       }
  //5. Save in cards every card. 
       cards.push(card)
      }
     }
  
  
  //We have now our own deck!!
  
  
  // When Start button is clicked:
   function Start(){
     shuffleDeck(cards);
     dealNew();
    start.style.display="none";
    dogecoins.innerHTML= mydogecoins;
    
    }
  ///////////////Shuffle///////////////
  //param is passed wich are our cards, our deck.
  //Random number is assigned to j
  //The card [i] is asigned to temp- the card [j] is asigned to the card [i]
  //The card[i] asigned in temp is asigned in the card[j]
  //So the cards change from one to the other until all deck is 
  function shuffleDeck(arr){
     for(var i = arr.length - 1; i>0;i--){
       var j = Math.floor(Math.random() * (i+1));
       var temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp;
     }
     return arr;
    }
  
  
  /////////////dealNew()//////////////
  
   function  dealNew(){
    playerCards = [];
    dealerCards = [];
    dValue.innerHTML = ".....";
    //Actualize dogecoins 
    //Change message
    //Disabled some buttons
    //Call deal()
  
    var betValue = bet.value;
    mydogecoins = mydogecoins-betValue;
    dogecoins.style.display= mydogecoins;
    message.innerHTML = "Your bet is:"+betValue+"dogecoins<br>Go for it!";
    bet.disbaled= true;
    maxbet.disabled= true;
    deal();
    btndeal.style.visibility = 'hidden';
    
  }
  
  
  function deal(){
  
  
    for(x = 0; x< 2;x++){
  
      //Push the card "cardCount" position in the array dealerCards
      dealerCards.push(cards[cardCount]);
      //Get the id and display what cardOutput return***explained below***
      dealer.innerHTML += cardOutput(cardCount,x)
      //condition where the first gets covered with css
      if(x==0){
        dealer.innerHTML += '<div id="cover" style="left:100px;"></div>'
      }
      //After all is dealed. Next card...And repeat with player
      cardCount++;
      playerCards.push(cards[cardCount]);
      player.innerHTML += cardOutput(cardCount,x);
      cardCount++;
    }
    pValue.innerHTML = checkTotal(playerCards);
    
   }
  
  
   //cardOutput will give us the card,packaged with css and the postion of the card.
   //cardOutput received de card postion and the x, wich is important to place the card in the right 
   //postion"hpos"", for dealer and player
   //N will give us wich card it is
   //icon will give us the suit and then cardRaw the value of that card
   function cardOutput(n,x){
    var hpos = (x > 0) ? x * 60 + 100 : 100;
    return '<div class="icard '+ cards[n].icon +' " style="left:'+hpos+'px; "><div class="top-card color">'
             + cards[n].cardRaw +' <br></div> <div class="content-card color"></div><div class="bottom-card color">'
             + cards[n].cardRaw +
            '<br></div> </div>';
        }
    
  
  //////Cards are given....and now?
  //cardAction selects wich function we call next,depends wich button is clicked, wich will be the param(a) 
   function cardAction(a){
     console.log(a);
     switch(a){
       case "hit":
       playCard();
       break;
       case "hold":
       playEnd();
       break;
       case "double":
       playCard();
       playEnd();
     }
   }
  
  
  //player continues....
   function playCard(){
      playerCards.push(cards[cardCount]);
      player.innerHTML += cardOutput(cardCount,(playerCards.length-1));
      cardCount++;
  //value is updated with function checkTotal***explained bellow
      var actualValue = checkTotal(playerCards);
      pValue.innerHTML = actualValue;
  //Condition that checks if player passed 21
  //and call the end function
      if(actualValue>21){
        message.innerHTML = "NEXT TIME...";
        playEnd();
      }
   }
  
  
  /////checkTotal////
   function checkTotal(a){
     var actualValue = 0;
     var ace = false;
     for(var i in a){
      //If there is an ace>>add 10
       if(a[i].cardRaw == 'A' && !ace){
         ace= true;
         actualValue = actualValue + 10;
       }
       //Sum every cardvalue and update it in actualValue
       actualValue = a[i].cardValue + actualValue;
     }
     //In case the value is more than 21 and also exist an ace, we take the extra 10 added
    if(ace && actualValue>21){
      actualValue = actualValue - 10;
    }
    return actualValue;
   }
  
  
  ////////Player hold.....
   function playEnd(){
     endplay = true;
     //uncover dealer card
     cover.style.display = "none";
     myactions.style.display = "none";
     btndeal.style.visibility = 'visible';
     maxbet.disabled = false;
     bet.disabled = false;
     maxbet.disabled = false;
     //time to check dealer value with same function than player
     var dealerValue = checkTotal(dealerCards);
     dValue.innerHTML = dealerValue;
  
     //dealer logic
     while(dealerValue<17){
       dealerCards.push(cards[cardCount]);
       dealer.innerHTML += cardOutput(cardCount,(dealerCards.length-1));
       cardCount++;
       dealerValue = checkTotal(dealerCards);
       dValue.innerHTML = dealerValue;
     }
  
     //who won????
     //game logic
     var playerValue = checkTotal(playerCards);
     if(playerValue === 21 && playerCard.length === 2){
       message.innerHTML = "BLACKJACK!!! YOU WON!!!";
       rewards = 1.5;
     }
     var valueBet =
      parseInt(bet.value)*rewards;
     if((playerValue < 22 && dealerValue < playerValue)||
       (dealerValue > 21 && playerValue < 22)){
        message.innerHTML += '<span style="color:green;">YOU WON'+valueBet+'$</span>';
        mydogecoins = mydogecoins + (valueBet * 2);
     }
     else if(dealerValue <= 21 && playerValue < dealerValue || playerValue > 21){
       message.innerHTML += '<span style="color:red;">YOU LOST ' +valueBet+'$</span>';
     }
     else if(dealerValue == playerValue){
       message.innerHTML += '<span style="color:purple;">NOBODY LOSE!</span>';
       mydogecoins = mydogecoins + valueBet
      }
      //pValue.innerHTML = dealerValue;
      dogecoinValue.innerHTML = mydogecoins;
   }
  