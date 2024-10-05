const readline = require('readline');

// Setup interface untuk membaca input dari terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fungsi untuk mencari kata terpanjang
function longest(sentence) {
    let words = sentence.split(' '); // Memecah kalimat menjadi array kata
    let longestWord = ''; // Menyimpan kata terpanjang

    // Loop untuk mencari kata terpanjang
    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    // Mengembalikan kata terpanjang beserta jumlah karakternya
    return `${longestWord}: ${longestWord.length} character`;
}

// Input
rl.question('Masukkan sebuah kalimat: ', (sentence) => {
    console.log(longest(sentence)); // Menampilkan hasil kata terpanjang
    rl.close(); // Menutup interface
});