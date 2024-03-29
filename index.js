const express = require("express")
const path = require('path');
const database = require('./database');

// Инициализация базы данных
database.initializeDatabase();

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.get("/", (req, res) => {
    database.getAllProducts((err, products) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при получении товаров из базы данных' });
        }
        res.render('index', { products });
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})