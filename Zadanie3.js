let sudoku = [
    [7, 0, 4, 8, 0, 0, 3, 0, 1],
    [8, 2, 0, 5, 0, 0, 0, 4, 0],
    [0, 0, 9, 4, 3, 0, 5, 0, 0],
    [3, 1, 0, 0, 0, 0, 8, 0, 7],
    [0, 8, 0, 0, 0, 0, 0, 1, 0],
    [9, 0, 7, 0, 0, 0, 0, 3, 2],
    [0, 0, 6, 0, 1, 5, 4, 0, 0],
    [0, 7, 0, 0, 0, 9, 0, 6, 5],
    [5, 0, 8, 0, 0, 2, 1, 0, 3]
];

function resolveSudoku(sudoku) {
    let forbiddenNUmObj = {}; //obiekt z liczbami których nie możemy  uzyć
    let notAllowedNumbers; //dalej to bedzie tablica z numerami których nie można juz wykorzystać
    let emptyBoxes = 81; // zera w sudoku, wykonywany, póki są zera

    while (emptyBoxes != 0) {
        emptyBoxes = 0; //resetujemy, na końcu gdy nadal bedzie zero dodajemy +1
        for (let line = 0; line < sudoku.length; line++) {
            for (let column = 0; column < sudoku.length; column++) {
                if (sudoku[line][column] === 0) {
                    forbiddenNUmObj = {};
                    //Przy każdej iteracji resetuje obiekt(do danego pola)
                    for (let i = 0; i < 9; i++) {
                        if (sudoku[line][i] > 0) {
                            forbiddenNUmObj[sudoku[line][i]] = true;
                        }
                        if (sudoku[i][column] > 0) {
                            forbiddenNUmObj[sudoku[i][column]] = true;
                        }
                        //Powyższe ifs wskazują jakie liczby już były w linii i kolumnie, a poniższy tworzy boxy i w nich sprawdza jakie sa liczby
                    }
                    for (
                        let lineBox = Math.floor(line / 3) * 3;
                        lineBox < Math.floor(line / 3) * 3 + 3;
                        lineBox++
                    ) {
                        for (
                            let columnBox = Math.floor(column / 3) * 3;
                            columnBox < Math.floor(column / 3) * 3 + 3;
                            columnBox++
                        ) {
                            if (sudoku[lineBox][columnBox]) {
                                forbiddenNUmObj[sudoku[lineBox][columnBox]] = true;
                            }
                        }
                    }
                    notAllowedNumbers = Object.keys(forbiddenNUmObj);
                    if (notAllowedNumbers.length === 8) {
                        for (let i = 1; i < 10; i++) {
                            if (notAllowedNumbers.indexOf(i.toString()) == -1) { //sprawdzam czy liczba wystepuje w naszym arr
                                sudoku[line][column] = i;
                            }
                        }
                    } else {
                        emptyBoxes++;
                    }

                }
            }
        }
    }
    return sudoku;
}

let mySudoku = resolveSudoku(sudoku);
mySudoku.forEach(row => console.log(row));
// console.log(mySudoku)

