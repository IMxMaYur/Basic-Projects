document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('magicSquareForm');
    const magicSquareContainer = document.getElementById('magicSquareContainer');
    const resetButton = document.getElementById('resetButton');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        generateMagicSquare();
    });

    resetButton.addEventListener('click', function(){
        magicSquareContainer.innerHTML = '';
    });

    function generateMagicSquare() {
        const size = parseInt(document.getElementById('size').value);
        const startRow = parseInt(document.getElementById('startRow').value);
        const startCol = parseInt(document.getElementById('startCol').value);

        if (isNaN(size) || isNaN(startRow) || isNaN(startCol) || startRow < 0 || startRow >= size || startCol < 0 || startCol >= size) {
            showPopUpMessage('Please enter valid numbers for size, start row, and start column.');
            return;
        }

        if (size % 2 == 0) {
            showPopUpMessage('Please enter an odd number for the size.')
            return;
        }

        const magicSquare = [];
        for (let i = 0; i < size; i++) {
            magicSquare[i] = [];
            for (let j = 0; j < size; j++) {
                magicSquare[i][j] = 0;
            }
        }

        let num = 1;
        let row = startRow;
        let col = startCol;
        for (let i = 0; i < size * size; i++) {
            magicSquare[row][col] = num;
            num++;
            row--;
            col++;
            if (row < 0) {
                row = size - 1;
            }
            if (col === size) {
                col = 0;
            }
            if (magicSquare[row][col] !== 0) {
                row = (row + 2) % size;
                col = (col - 1) % size;
                if (col === -1) {
                    col = size - 1;
                }
            }
        }

        let magicSquareHTML = '<table class="magic-square">';
        let rowSums = [];
        let colSums = new Array(size).fill(0);
        for (let i = 0; i < size; i++) {
            magicSquareHTML += '<tr>';
            let sum = 0;
            for (let j = 0; j < size; j++) {
                magicSquareHTML += `<td>${magicSquare[i][j]}</td>`;
                sum += magicSquare[i][j];
                colSums[j] += magicSquare[i][j];
            }
            rowSums.push(sum);
            magicSquareHTML += `<td class="sum">= ${sum}</td>`;
            magicSquareHTML += '</tr>';
        }
        magicSquareHTML += '<tr>';
        for (let sum of colSums) {
            magicSquareHTML += `<td class="sum">= ${sum}</td>`;
        }
        magicSquareHTML += '<td class="empty"></td></tr>';
        magicSquareHTML += '</table>';

        magicSquareContainer.innerHTML = magicSquareHTML;
    }

    function showPopUpMessage(message) {
        alert(message);
    }
});
