const readline = require('readline');

// Setup interface untuk membaca input dari terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fungsi untuk membalikkan urutan huruf dengan angka tetap di akhir
function reverseAlphabet(str) {
    let letters = str.slice(0, -1); // Mengambil bagian huruf
    let number = str.slice(-1); // Mengambil bagian angka

    let reversedLetters = letters.split('').reverse().join(''); // Membalikkan huruf

    return reversedLetters + number; // Menggabungkan hasil
}

// Input
rl.question('Masukkan string dengan format huruf dan angka di akhir: ', (input) => {
    let result = reverseAlphabet(input);
    console.log('Hasilnya:', result); // Menampilkan hasil ke terminal
    rl.close(); // Menutup interface
});