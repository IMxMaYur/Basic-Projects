// Function to generate the magic square
function generateMagicSquare(size, startRow, startCol) {
    var magicSquare = [];
    for (var i = 0; i < size; i++) {
        magicSquare[i] = [];
        for (var j = 0; j < size; j++) {
            magicSquare[i][j] = 0;
        }
    }
    
    var i = startRow - 1;
    var j = startCol - 1;
    
    for (var num = 1; num <= size * size; ) {
        if (i === -1 && j === size) {
            j = size - 2;
            i = 0;
        } else {
            if (j === size) {
                j = 0;
            }
            if (i < 0) {
                i = size - 1;
            }
        }
        if (magicSquare[i][j] !== 0) {
            j -= 2;
            i++;
            continue;
        } else {
            magicSquare[i][j] = num++;
        }
        j++;
        i--;
    }
    
    return magicSquare;
}

// Function to display the magic square on the webpage
function displayMagicSquare(square) {
    var container = document.getElementById('magicSquareContainer');
    container.innerHTML = '';
    
    for (var i = 0; i < square.length; i++) {
        for (var j = 0; j < square[i].length; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = square[i][j];
            container.appendChild(cell);
        }
        container.appendChild(document.createElement('br'));
    }
}

// Function to handle form submission
document.getElementById('magicSquareForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var size = parseInt(document.getElementById('size').value);
    var startRow = parseInt(document.getElementById('startRow').value);
    var startCol = parseInt(document.getElementById('startCol').value);
    
    // Generate magic square
    var magicSquare = generateMagicSquare(size, startRow, startCol);
    
    // Display magic square
    displayMagicSquare(magicSquare);
});
// Function to generate the magic square
function generateMagicSquare(size, startRow, startCol) {
    var magicSquare = [];
    for (var i = 0; i < size; i++) {
        magicSquare[i] = [];
        for (var j = 0; j < size; j++) {
            magicSquare[i][j] = 0;
        }
    }
    
    var i = startRow - 1;
    var j = startCol - 1;
    
    for (var num = 1; num <= size * size; ) {
        if (i === -1 && j === size) {
            j = size - 2;
            i = 0;
        } else {
            if (j === size) {
                j = 0;
            }
            if (i < 0) {
                i = size - 1;
            }
        }
        if (magicSquare[i][j] !== 0) {
            j -= 2;
            i++;
            continue;
        } else {
            magicSquare[i][j] = num++;
        }
        j++;
        i--;
    }
    
    return magicSquare;
}

// Function to display the magic square on the webpage
function displayMagicSquare(square) {
    var container = document.getElementById('magicSquareContainer');
    container.innerHTML = '';
    
    for (var i = 0; i < square.length; i++) {
        for (var j = 0; j < square[i].length; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = square[i][j];
            container.appendChild(cell);
        }
        container.appendChild(document.createElement('br'));
    }
}

// Function to handle form submission
document.getElementById('magicSquareForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var size = parseInt(document.getElementById('size').value);
    var startRow = parseInt(document.getElementById('startRow').value);
    var startCol = parseInt(document.getElementById('startCol').value);
    
    // Generate magic square
    var magicSquare = generateMagicSquare(size, startRow, startCol);
    
    // Display magic square
    displayMagicSquare(magicSquare);
});
