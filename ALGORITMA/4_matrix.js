const readline = require('readline');

// Setup interface untuk membaca input dari terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let matrix = [];
let n;

// Fungsi untuk menghitung perbedaan antara diagonal utama dan sekunder
function diagonalDifference(matrix) {
    let primaryDiagonal = 0;
    let secondaryDiagonal = 0;

    for (let i = 0; i < n; i++) {
        primaryDiagonal += matrix[i][i]; // Diagonal utama
        secondaryDiagonal += matrix[i][n - 1 - i]; // Diagonal sekunder
    }

    return Math.abs(primaryDiagonal - secondaryDiagonal); // Mengembalikan selisih
}

// Input ukuran matriks (n x n)
rl.question('Masukkan ukuran matriks NxN: ', (size) => {
    n = parseInt(size);
    console.log(`Masukkan elemen-elemen matriks ${n}x${n} baris demi baris, pisahkan dengan spasi:`);

    // Membaca setiap baris dari matriks
    let rowCount = 0;
    rl.on('line', (line) => {
        const row = line.split(' ').map(Number); // Pisahkan angka-angka berdasarkan spasi
        matrix.push(row); // Tambahkan baris ke matriks
        rowCount++;

        // Jika sudah mencapai jumlah baris yang diinginkan, lakukan perhitungan
        if (rowCount === n) {
            console.log('Matriks:');
            console.log(matrix);
            console.log('Selisih diagonal:', diagonalDifference(matrix));
            rl.close(); // Tutup input
        }
    });
});
