document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('puzzleModeForm');
    const puzzleGridBox = document.getElementById('puzzleGridBox');
    const validateButton = document.getElementById('validateButton');
    const resetButton = document.getElementById('resetButton');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const size = parseInt(document.getElementById('puzzleSize').value);

        if (isNaN(size) || size % 2 === 0 || size < 3 || size > 9) {
            showPopUpMessage('Please enter a valid odd number between 3 and 9.');
            return;
        }

        generateMagicSquare(size);
    });

    validateButton.addEventListener('click', function() {
        const puzzleGrid = document.querySelectorAll('.magic-cell');
        const isValid = validateMagicSquare(puzzleGrid);
        if (isValid) {
            showPopUpMessage('This is a valid magic square!');
        } else {
            showPopUpMessage('This is not a valid magic square.');
        }
    });

    resetButton.addEventListener('click', function() {
        puzzleGridBox.innerHTML = '';
    });

    function generateMagicSquare(size) {
        let magicSquareHTML = '<table class="magic-square">';
        for (let i = 0; i < size; i++) {
            magicSquareHTML += '<tr>';
            for (let j = 0; j < size; j++) {
                magicSquareHTML += `<td><input type="text" id="cell-${i}-${j}" class="magic-cell" maxlength="1"></td>`;
            }
            magicSquareHTML += '</tr>';
        }
        magicSquareHTML += '</table>';

        let sumText = '';
        if (size === 3) {
            sumText = 'Sum of rows and columns of 3x3 magic square is 15';
        } else if (size === 5) {
            sumText = 'Sum of rows and columns of 5x5 magic square is 65';
        } else if (size === 7) {
            sumText = 'Sum of rows and columns of 7x7 magic square is 175';
        }

        puzzleGridBox.innerHTML = `<div>${sumText}</div>` + magicSquareHTML;
    }

    function validateMagicSquare(puzzleGrid) {
        const size = Math.sqrt(puzzleGrid.length);
        const rowSums = new Array(size).fill(0);
        const colSums = new Array(size).fill(0);

        for (let i = 0; i < puzzleGrid.length; i++) {
            const value = parseInt(puzzleGrid[i].value);
            if (isNaN(value) || value < 1 || value > 9) {
                return false;
            }

            const rowIndex = Math.floor(i / size);
            const colIndex = i % size;
            rowSums[rowIndex] += value;
            colSums[colIndex] += value;
        }

        const targetSum = rowSums[0]; // Assuming the first row sum as the target sum
        for (let i = 0; i < size; i++) {
            if (rowSums[i] !== targetSum || colSums[i] !== targetSum) {
                return false;
            }
        }

        return true;
    }

    function showPopUpMessage(message) {
        alert(message);
    }
});
