document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('puzzleModeForm');
    const puzzleGridBox = document.getElementById('puzzleGridBox');
    const validateButton = document.getElementById('validateButton');
    const resetButton = document.getElementById('resetButton');
    let sumsContainer = null; // Variable to hold the sums container

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const size = parseInt(document.getElementById('puzzleSize').value);

        if (isNaN(size)) {
            showPopUpMessage('Please select a valid size.');
            return;
        }

        if (size % 2 === 0) {
            showPopUpMessage('Please select an odd number for the size.');
            return;
        }

        generatePuzzleGrid(size);
    });

    validateButton.addEventListener('click', function() {
        const puzzleGrid = puzzleGridBox.querySelectorAll('input');
        const isValid = validatePuzzle(puzzleGrid);
        if (isValid) {
            showPopUpMessage('Validation successful! Puzzle is correct.');
        } else {
            showPopUpMessage('Validation failed! Please check the numbers in the puzzle.');
        }
    });

    resetButton.addEventListener('click', function() {
        puzzleGridBox.innerHTML = '';
        if (sumsContainer) {
            // Remove sums container if it exists
            puzzleGridBox.removeChild(sumsContainer);
            sumsContainer = null; // Reset the variable
        }
    });

    function generatePuzzleGrid(size) {
        let puzzleHTML = '';
        for (let i = 0; i < size; i++) {
            puzzleHTML += '<div class="puzzle-row">';
            for (let j = 0; j < size; j++) {
                const index = i * size + j;
                puzzleHTML += `<input type="number" class="puzzle-cell" id="cell-${index}" min="1" max="9" required>`;
            }
            puzzleHTML += '</div>';
        }
        puzzleGridBox.innerHTML = puzzleHTML;
        renderSums(size);
    }

    function validatePuzzle(puzzleGrid) {
        const sums = Array.from({ length: Math.sqrt(puzzleGrid.length) }, () => 0);
        for (let i = 0; i < puzzleGrid.length; i++) {
            const value = parseInt(puzzleGrid[i].value);
            if (isNaN(value) || value < 1 || value > 9) {
                return false;
            }
            const rowIndex = Math.floor(i / Math.sqrt(puzzleGrid.length));
            sums[rowIndex] += value;
        }
        for (let sum of sums) {
            if (sum !== sums[0]) {
                return false;
            }
        }
        return true;
    }

    function renderSums(size) {
        // Create the sums container
        sumsContainer = document.createElement('div');
        sumsContainer.classList.add('sums-container');
        const rowSum = size * (size * size + 1) / 2;
        for (let i = 0; i < size; i++) {
            const sumElement = document.createElement('div');
            sumElement.classList.add('sum');
            sumElement.textContent = `= ${rowSum}`;
            sumsContainer.appendChild(sumElement);
        }
        puzzleGridBox.appendChild(sumsContainer);
    }

    function showPopUpMessage(message) {
        alert(message);
    }
});
