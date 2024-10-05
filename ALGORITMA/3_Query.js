const readline = require('readline');

// Setup interface untuk membaca input dari terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fungsi untuk menghitung jumlah kemunculan kata dalam INPUT berdasarkan QUERY
function countWords(input, query) {
    let result = [];

    // Looping untuk setiap kata dalam QUERY
    for (let q of query) {
        // Hitung kemunculan kata q dalam INPUT
        let count = input.filter(word => word === q).length;
        // Masukkan hasil ke dalam array result
        result.push(count);
    }

    return result;
}

// Input
rl.question('Masukkan array INPUT (pisahkan dengan koma, misalnya: xc,dz,bbb,dz): ', (inputStr) => {
    const INPUT = inputStr.split(',');

    rl.question('Masukkan array QUERY (pisahkan dengan koma, misalnya: bbb,ac,dz): ', (queryStr) => {
        const QUERY = queryStr.split(',');

        // Tampilkan hasil
        console.log(countWords(INPUT, QUERY));
        
        rl.close(); // Menutup interface
    });
});
