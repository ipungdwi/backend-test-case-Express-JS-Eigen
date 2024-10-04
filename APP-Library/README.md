# API-APP-Library

## INSTALL DI LOKAL

### Instalasi
1. Pastikan Node.js dan npm terinstal di komputer Anda.
2. Salin repositori ini ke komputer Anda.
3. Buka terminal dan navigasikan ke direktori proyek.
4. Instal dependensi dengan menjalankan perintah `npm install`.
5. Jalankan server dengan perintah `nodemon`.

### Database MySQL
**Download dan Import db_library.sql berikut:**
- [Download db_library.sql](files/db_library.sql)

### Buat File .env
**Buat file .env dengan konten berikut:**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=db_library
```

## 1. Testing via Postman atau Thunder Client

### **Books**
1. Shows all existing books and quantities
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/books`

2. Borrow Books
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/books/borrow`
   - **JSON:**
    ```json
    {
        "memberCode": "M002",
        "bookCode": "SHR-1"
    }
    ```

3. **Return Books**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/books/return`
   - **JSON:**
     ```json
     {
         "memberCode": "M002",
         "bookCode": "SHR-1"
     }
     ```

### **Members**
1. **Shows all existing members**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/members`

## 2. Testing via Swagger Docs

1. Masukkan Link: `http://localhost:5000/api-docs/`
2. Pilih Bagian Yang ingin di Test
3. Klik **Try it out**
