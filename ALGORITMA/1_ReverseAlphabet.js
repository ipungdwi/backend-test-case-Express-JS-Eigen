function reverseAlphabet(str) {
    // Pisahkan antara huruf dan angka
    let letters = str.slice(0, -1); // Mengambil bagian huruf
    let number = str.slice(-1); // Mengambil bagian angka

    // Balikkan urutan huruf
    let reversedLetters = letters.split('').reverse().join('');

    // Gabungkan kembali huruf yang sudah dibalik dengan angka
    return reversedLetters + number;
}

let input = "NEGIE1";
let result = reverseAlphabet(input);
console.log(result); // Output: EIGEN1