const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json()); // для обработки JSON

const mongoUrl = process.env.MONGO_URL || 'mongodb://myUser:myPassword@mongodb:27017/testdb?authSource=admin';
let db;

// Функция для подключения к MongoDB
async function initDb() {
  try {
    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
    db = client.db();
    console.log('Подключение к MongoDB успешно');
  } catch (err) {
    console.error('Ошибка подключения к MongoDB', err);
  }
}

initDb();

// Эндпоинт для проверки работы backend
app.get('/api', async (req, res) => {
  try {
    const collections = await db.listCollections().toArray();
    res.send(`Backend работает. Коллекций в БД: ${collections.length}`);
  } catch (err) {
    console.error('Ошибка при запросе к БД:', err);
    res.status(500).send('Ошибка доступа к базе данных');
  }
});

// Получение всех элементов из коллекции "items"
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.collection('items').find().toArray();
    res.json(items);
  } catch (err) {
    console.error('Ошибка при получении элементов:', err);
    res.status(500).send('Ошибка при получении элементов');
  }
});

// Добавление нового элемента в коллекцию "items"
app.post('/api/items', async (req, res) => {
  try {
    const newItem = req.body;
    if (!newItem.name) {
      return res.status(400).json({ error: 'Поле "name" обязательно' });
    }
    const result = await db.collection('items').insertOne(newItem);
    res.status(201).json(result.ops ? result.ops[0] : newItem);
  } catch (err) {
    console.error('Ошибка при добавлении элемента:', err);
    res.status(500).send('Ошибка при добавлении элемента');
  }
});

// Эндпоинт для проверки живучести
app.get('/health', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend слушает на порту ${PORT}`);
});
