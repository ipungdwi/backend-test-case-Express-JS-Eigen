/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/books/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       403:
 *         description: Cannot borrow more than 2 books or member is penalized
 *       404:
 *         description: Book not available
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/books/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: This book was not borrowed by the member
 *       500:
 *         description: Internal server error
 */
