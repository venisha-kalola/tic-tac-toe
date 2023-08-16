let box = document.querySelectorAll(".box");
let players = [document.querySelector(".p1"), document.querySelector(".p2")];
let playerInfo = document.querySelector(".player");
let XO = document.querySelector(".weapon");
let changeable = document.querySelector(".changeable");
let score = document.querySelector(".score");
let declare = document.querySelector(".js-chance");
let radio = document.querySelector(".radio-opts");

let initial = declare.innerHTML;
let chance = "X";
let winX = false;
let draw = true;
let winY = false;
let win=0;
let lose=0;
let draws=0;
let computer = false;
let arrX = [];
let boxes = Array.from({ length: 9 }, (_, i) => document.querySelector(`.box${i + 1}`));

players.forEach((player, index) => {
     player.addEventListener("click", () => {
        computer = index === 0;
        playerInfo.innerHTML = computer ? `Player Vs Computer` : `Player 1 Vs Player 2`;
        radio.innerHTML = computer ? `Level : 
             <label>
             <input type="radio" name="option" value="option1" id="option1">Beginner
            </label>
            <label>
            <input type="radio" name="option" value="option2" id="option2"> Pro
            </label>
            `
             : "";
        XO.innerHTML = computer ? `You : "X" &nbsp;&nbsp;&nbsp;  Computer : "O"` : `Player 1 : "X" &nbsp;&nbsp;&nbsp;  Player 2 : "O"`;
    });
});


box.forEach(function (box, index) {
    box.addEventListener("click", function (e) {
        if (winX || winY) {
            return;
        }
        if (box.innerHTML === "") {
            box.innerHTML = chance;
            arrX.push(box.dataset.num);
            chance = chance === "O" ? "X" : "O";
            changeable.innerHTML = chance;
        }
        checkWin();
        if (chance === "O" && count <= 3) {
            if (computer) {
               compMove();
            }
        }
        
    });
});

const winCombinations = [
    [0, 4, 8], [2, 4, 6], // Diagonals
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8] // Columns
   
];


let count = 0;
let number=0;
let ss=0;
function compMove() {
    if(winX || winY){
        return;
    }
    
    if (count > 3) {
        return;
    }
    let same=false;
    
    if (document.querySelector("#option2").checked) {
        for (const combination of winCombinations) {
            const [a, b, c] = combination;
        if(boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML!="" ){
            if(boxes[c].innerHTML===""){
                number=c+1;
                count++;
                computerMove();
                return;
            }
        }
        if(boxes[b].innerHTML === boxes[c].innerHTML && boxes[b].innerHTML!="" ){
            if(boxes[a].innerHTML===""){
                number=a+1;
                count++;
                computerMove();
                return;
            }
        }
        if(boxes[a].innerHTML === boxes[c].innerHTML && boxes[a].innerHTML!="" ){
            if(boxes[b].innerHTML===""){
                number=b+1;
                count++;
                computerMove();
                return;
            }
        }
    }
    ss=1;
    }

    if(!document.querySelector("#option2").checked || ss===1){
        ss=0;
        number = Math.floor(Math.random() * 9) + 1;
        for (let i = 0; i < 9; i++) {
            if (arrX[i] == number) {
                same = true;
            }
        } 
        if (same) {
            compMove();
        } else {
            count++;
           computerMove();
        }
    }
}

function computerMove(){
    boxes[number - 1].innerHTML = "O";
    chance = "X";
    changeable.innerHTML = chance;
    arrX.push(number.toString());
    checkWin();
}


function checkWin() {
    
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML && boxes[a].innerHTML !== "") {
            boxes[a].classList.add("winner");
            boxes[b].classList.add("winner");
            boxes[c].classList.add("winner");
            if(boxes[a].innerHTML === "O"){
                winY = true;
                draw=false;
                lose+=1;
                draws+=1;
                declare.innerHTML=`It's A Win for O 🥳`;
                declare.classList.add("border");
            }
            else if (boxes[a].innerHTML === "X") {
                winX = true;
                draw=false;
                win+=1;
              draws+=1;
              declare.innerHTML=`It's A Win for X 🥳`;
              declare.classList.add("border");
            } 
        }
    }
     if(!draw){
    draws-=1;
    }
    if(arrX.length==9 && winX==false && winY==false){
        declare.innerHTML=`It's A Draw 🙃`;
        declare.classList.add("border");
        draws+=1;
     }
     
    score.innerHTML = computer ? `Wins : ${win} , &nbsp; Lose : ${lose} , &nbsp; Draws : ${draws}` 
        : `<p>Player 1 :- 
         Wins : ${win} &nbsp;&nbsp;&nbsp;
        Player 2 :- 
        Wins : ${lose}  &nbsp;&nbsp;&nbsp;
        Draws : ${draws}
        `;
}


let newGame = document.querySelector(".newGame");
newGame.addEventListener("click",function(){
   reseting();
})
let reset = document.querySelector(".reset");
reset.addEventListener("click",function(){
   location.reload();
})

function reseting(){
    chance = "X";
    winX = false;
    draw = true;
    winY = false;
    arrX = [];
    count=0;
    boxes = Array.from({ length: 9 }, (_, i) => document.querySelector(`.box${i + 1}`));
    box.forEach(function (box) {
            box.innerHTML = "";
            box.classList.remove("winner");
        });
        declare.innerHTML=initial;
        declare.classList.remove("border");
}

  


