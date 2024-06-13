let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true;
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetgame = () => {
    turn =true;
 enableBoxes();
 msgcontainer.classList.add("hide");
  // Remove "x" and "o" classes from all boxes

  boxes.forEach(box => {
    box.classList.remove("x", "o");
});
}

boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
        if (turn) {
            e.target.innerText = "X";
            e.target.classList.add("o"); // Add X class
            turn = false;
        } else {
            e.target.innerText = "O";
            e.target.classList.add("x"); // Add X class
            turn = true;
        }
        e.target.disabled = true;
        checkWinner();
    });
});

const disableBoxes=() => {
    for (let box of boxes) {
        box.disabled= true;
    }
}

const enableBoxes=() => {
    for (let box of boxes) {
        box.disabled= false;
        box.innerText="";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is: ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    let draw = true;
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner:", pos1Val);
                showWinner(pos1Val);
                return; // If we find a winner, no need to check for draw
            }
        }
    }

    // Check for draw
    for (let box of boxes) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }

    // If it's a draw
    if (draw) {
        console.log("It's a draw!");
        showDraw();
    }
};


newGameBtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click",resetgame);
