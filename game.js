window.addEventListener('DOMContentLoaded', () =>{
    const block = Array.from(document.querySelectorAll('.block'));
    const PlayerPlaying = document.querySelector('.character')
    const restartButton = document.querySelector('#restart')
    const winner = document.querySelector('.winner')

    let board = ['','','','','','','','',''];
    let CurrentPlayer = 'X';
    let isGameActive = true;

    const PlayerX_Won = 'X';
    const PlayerO_Won = 'O';
    const Tie = 'Tie';

    const Condition_Win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

    function handleResultValidation() {
        let won = false;
        for (let i = 0; i < 7; i++) {
            const winCondition = Condition_Win[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                won = true;
                break;
            }
            
        }
        if(won){
            if (CurrentPlayer === 'X') {
                announce(PlayerX_Won);
            } else {
                announce(PlayerO_Won)
            }
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            announce(Tie);
        }
    }

    const announce = (type) => {
        switch (type) {
            case PlayerO_Won:
                winner.innerHTML = '<span class="playerX">O</span> Won';
                break;
            case PlayerX_Won:
                winner.innerHTML = '<span class="playerX">X</span> Won';
                break;
            case Tie:
                winner.innerText = 'Tie';
                
        }
        winner.classList.remove('hide');
    };

    const isValidAction = (block) => {
        if (block.innerText === 'X' || block.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard = (index) => {
        board[index] = CurrentPlayer;
    }
    const changePlayer = () => {
        PlayerPlaying.classList.remove(`player${CurrentPlayer}`);
        CurrentPlayer = CurrentPlayer === 'X' ? 'O' : 'X';
        PlayerPlaying.innerText = CurrentPlayer;
        PlayerPlaying.classList.add(`player${CurrentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = CurrentPlayer;
            tile.classList.add(`player${CurrentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['','','','','','','','',''];
        isGameActive = true;
        winner.classList.add('hide');

        if (CurrentPlayer === 'O') {
            changePlayer();
        }
        
        block.forEach(block =>{
            block.innerText = '';
            block.classList.remove('playerX');
            block.classList.remove('playerO');
        }
            );

    }
    block.forEach((block,index) =>{
        block.addEventListener('click', () => userAction(block,index));
    });
    
    restartButton.addEventListener('click', resetBoard);


});