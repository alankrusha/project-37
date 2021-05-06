class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow");
    fill("black");
    textSize(30);
    text ("Results!!", 350, 30);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      var displayPos = 250;
      fill("blue");
      textSize(20);
      text("Note : Contestant who answered correct is highlighted in green colour!", 130, 230);
      for(var plr in allContestants){
        var correctAns = "1";
        if(correctAns === allContestants[plr].answer)
        fill("green");
        else
        fill("red");
        displayPos += 30;
        textSize(20);
        text(allContestants[plr].name + " : " + allContestants[plr].answer, 130, displayPos);
      } 
    } 
  }

}
