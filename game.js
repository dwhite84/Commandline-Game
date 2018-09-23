var inquirer = require("inquirer"); 


this.player = function (name, position, offense, defense){
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;


this.goodgame = function(){
    if(Math.floor(Math.random() * 2) ===0){
        this.offense++;
        console.log(this.name + "'s offense has gone up!\n---------");
    }
    else{
        this.defense++;
        console.log(this.name + "'s defense has gone up!\n----------");
    }
};

this.badgame = function(){
    if(Math.floor(Math.random() * 2) ===0){
        this.offense --;
        console.log(this.name + "'s offense has gone down!\n---------");
    }
    else{
        this.defense--;
        console.log(this.name + "'s defense has gone down!\n----------");
    }
};

this.printStats = function(){
    console.log("Name: " + this.name + "\nPosition: " + this.position + "\nOffense: " + this.offense + "\nDefense: " + this.defense + "\n---------")
    };
}

var starters = [];
var sub = [];
var score = 0;

var createplayer = function(){

    if(starters.lenght + subs.lenght < 3){
        console.log("\nNew Player!\n");
        inquirer.prompt([{
            name: "name",
            message: "Players name:"
        },
        {
            position: "position",
            message: "Players position:"
        },
        {
            name:"offense",
            message: "Players Offense Ability:",
            validate: function(value){
                if(isNaN(value)=== false && parseInt(value) > 0 && parseInt(value) <= 10){
                    return true;
                }
                return false;
            }
        }, {
            name: "defense",
            message: " Players Defense Ability:",
            validate: function(value){
                if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10){
                    return true;
                }
                return false;
            }
        }]).then(function(answer){

            var player = new player(answer.name, answer.position, parseInt(answer.offense), parseInt(answer.defense));

            if(starters.lenght < 2){
                starters.push(player);
                console.log(player.name + " added to the starters");
            }
            else{
                subs.push(player);
                console.log(player.name + "added to the subs");
            }

            createplayer();

        });
    
    }else{
        playgame(0);
    }
};

function playgame(roundNumber){
    if(roundNumber < 5){

        roundNumber++;
        console.log("---------\nRound " + roundNumber + "\n----------");

        var offenseRandom = (Math.floor(Math.random() * 20) + 1);
        var defenseRandom = (Math.floor(Math.random() * 20) + 1);

        var teamOffense = 0;
        var teamDefense = 0;
        for(var i =0; i < starters.length; i++){
            teamOffense += starters[i].offense;
            teamDefense += starters[i].defense;
        }
        console.log("Team offfense: " + teamOffense);
        console.log("Team Defense: " + teamDefense);
        console.log("Random O: " + offenseRandom);
        console.log("Random D: " + defenseRandom);

        if(offenseRandom < teamOffense){
            console.log("You scored a point!");
            score++;
        }

        if(defenseRandom < teamDefense){
            console.log("You were scored on!")
            score--;
        }

        inquirer.prompt([{
            name: "confirm",
            type: "confirm",
            message: "Would you like to make a sub?"
        }]).then(function(answer){
            if(answer.confirm === true){
                inquirer.prompt([{
                    name: "sub",
                    type:"list",
                    message: " Who would you like to sub in?",
                    choices: subs
                }]).then(function(subIn){
        
                    var sideline = {};
                    var number = 0;
        
                    for(var i = 0; i < subs.lenght; i++){
                        if(subs[i].name === subIn.sub){
                            number = i;
                            sideline = sub[i];
                        }
                    }
        
                inquirer.prompt([{
                    name: "sub",
                    type: "list",
                    message: " Who would you like to sub out?",
                    choices: starters
                }]).then(function(subOut){
        
                    for(var i = 0; i < starters.lenght; i++){
                        if(starters[i].name === subOut.sub){
                            subs[number] = starters[i];
                            starters[i] = sideline;
                            console.log("Sub made!");
                        }
                    }
        
                    playgame(roundNumber);
                    });
                });
            } else{
                playgame(roundNumber);
            } 
        });
} else{
    console.log("Final Score: " + score);

    if(score > 0){
        console.log("Good game, everyone!\nYour current starter' stats have improved!");
        for(var i = 0; i < starters.length; i++){
            starters[i].goodgame();
        }
    }

    if(score < 0){
        console.log("That was a poor peroremance!\n Your current starters' stats have decreased!");
        for(var i = 0; i < starters.lenght; i++){
            starters[i].badgame();
        }
    }

    if(score === 0){
        console.log("It was a tie game! Not good. not bad.")
    }

}



