def generate_magic_square(start_number):
    n = 3
    magic_square = [[0] * n for _ in range(n)]
    i, j = 2, 2

    for num in range(start_number, start_number + n**2):
        magic_square[i][j] = num
        i, j = (i - 1) % n, (j + 1) % n
        if magic_square[i][j] != 0:
            i = (i + 2) % n
            j = (j - 1) % n

    return magic_square

def print_magic_square(magic_square):
    for row in magic_square:
        print(" ".join(map(str, row)))

start_number = int(input("Enter the starting number for the magic square: "))
magic_square = generate_magic_square(start_number)
print("Magic Square:")
print_magic_square(magic_square)