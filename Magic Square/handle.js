document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('magicSquareForm');
    const magicSquareContainer = document.getElementById('magicSquareContainer');
    const resetButton = document.getElementById('resetButton');
    const MAX_SIZE = 999; // Maximum size limit

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const size = parseInt(document.getElementById('size').value);
        const startRow = parseInt(document.getElementById('startRow').value);
        const startCol = parseInt(document.getElementById('startCol').value);

        if (isNaN(size) || isNaN(startRow) || isNaN(startCol)) {
            showPopUpMessage('Please enter valid numbers for size, start row, and start column.');
            return;
        }

        if (size < 3) {
            showPopUpMessage('Please enter a size greater than or equal to 3.');
            return;
        }

        if (size > MAX_SIZE) {
            showPopUpMessage('Size exceeds the maximum limit of 999.');
            return;
        }

        if (startRow < 0 || startRow >= size || startCol < 0 || startCol >= size) {
            showPopUpMessage('Invalid starting row or column. Please enter values within the range.');
            return;
        }

        generateMagicSquare(size, startRow, startCol);
    });

    resetButton.addEventListener('click', function() {
        magicSquareContainer.innerHTML = '';
    });

    function generateMagicSquare(size, startRow, startCol) {
        if (size % 2 === 0) {
            showPopUpMessage('Please enter an odd number for the size.');
            return;
        }

        const magicSquare = generateMagicSquareIncremental(size, startRow, startCol);

        renderMagicSquare(magicSquare);
    }

    function generateMagicSquareIncremental(size, startRow, startCol) {
        const magicSquare = [];
        let num = 1;
        let row = startRow;
        let col = startCol;
        for (let i = 0; i < size; i++) {
            magicSquare[i] = [];
            for (let j = 0; j < size; j++) {
                magicSquare[i][j] = 0;
            }
        }
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
        return magicSquare;
    }

    function renderMagicSquare(magicSquare) {
        let magicSquareHTML = '<table class="magic-square">';
        let rowSums = [];
        let colSums = new Array(magicSquare.length).fill(0);
        for (let i = 0; i < magicSquare.length; i++) {
            magicSquareHTML += '<tr>';
            let sum = 0;
            for (let j = 0; j < magicSquare.length; j++) {
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
