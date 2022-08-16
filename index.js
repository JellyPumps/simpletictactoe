window.addEventListener('DOMContentLoaded',()=>{
    const tiles=Array.from(document.querySelectorAll('.tile'));
    const playerDisplay=document.querySelector('.display-player');
    const resetButton=document.querySelector('#reset');
    const announcer=document.querySelector('.announcer');
    //
    let board=['','','','','','','','',''];
    let currP='x';
    let isRun=true;
    //
    const PX_WON='PX_WON';
    const PO_WON='PO_WON';
    const TIE='TIE';
    //
    /*
        Indexes
        [0][1][2]
        [3][4][5]
        [6][7][8]
    */
    //Winning conditions
    const winningConditions=
    [
        //horizontal wins
        [0,1,2],[3,4,5],[6,7,8],
        //vertical wins
        [0,3,6],[1,4,7],[2,5,8],
        //diagonal wins
        [0,4,8],[2,4,6]
    ]
    //
    function handleResultValidation() {
        let roundWon=false;
        for(let i=0;i<=7;i++){
            const winCondition=winningConditions[i];
            const a=board[winCondition[0]];
            const b=board[winCondition[1]];
            const c=board[winCondition[2]];
            if(a===''||b===''||c===''){
                continue;
            }
            if(a===b&&b===c){
                roundWon=true;
                break;
            }
        }
        if(roundWon){
            announce(currP==='x'?PX_WON:PO_WON);
            isRun=false;
            return;
        }
        if(!board.includes('')){
            announce(TIE);
        }
    }
    //
    const announce=(type)=>{
        switch(type){
            case PO_WON:
                announcer.innerHTML='Player <span class="po">O</span> Won';
                break;
            case PX_WON:
                announcer.innerHTML='Player <span class="px">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML='Tie';
        }
        announcer.classList.remove('hide');
    }
    const isValidAction=(tile)=>{
        if(tile.innerText=='x'||tile.innerText==='o'){
            return false;
        }
        return true;
    };
    const updateBoard=(index)=>{
        board[index]=currP;
    }
    const changeP=()=>{
        playerDisplay.classList.remove(`p${currP}`);
        currP=currP==='x'?'o':'x';
        playerDisplay.innerText=currP;
        playerDisplay.classList.add(`p${currP}`);
    }
    const userAction=(tile,index)=>{
        if(isValidAction(tile)&&isRun)
        {
            tile.innerText=currP;
            tile.classList.add(`p${currP}`)
            updateBoard(index);
            handleResultValidation();
            changeP();
        }
    }
    //reset board func
    const resetBoard=()=>{
        board=['','','','','','','','',''];
        isRun=true;
        announcer.classList.add('hide');
        if(currP==='o'){
            changeP();
        }
        tiles.forEach(tile=>{
            tile.innerText='';
            tile.classList.remove('po');
            tile.classList.remove('px');
        });
    }
    //check for clicks on tile
    tiles.forEach((tile,index)=>{
        tile.addEventListener('click',()=>userAction(tile,index));
    });
    //check for clicks on reset
    resetButton.addEventListener('click',resetBoard);
});