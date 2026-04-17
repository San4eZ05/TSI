import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Данные объявлений
let products = [
  { 
    id: 1, 
    name: "iPhone 14 Pro", 
    price: 89990, 
    description: "Отличный смартфон в идеальном состоянии. 256GB, фиолетовый." 
  },
  { 
    id: 2, 
    name: "Ноутбук ASUS ROG Strix G16", 
    price: 129990, 
    description: "Игровой ноутбук, Intel Core i7, RTX 3060, 16GB RAM, 1TB SSD." 
  },
  { 
    id: 3, 
    name: "Велосипед Merida Big Nine", 
    price: 45990, 
    description: "Горный велосипед, алюминиевая рама, 27 скоростей." 
  }
];

// Данные пользователей (в реальном проекте используйте БД)
let users = [
  {
    id: 1,
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+79991234567",
    password: "admin123",
    role: "admin"
  },
  {
    id: 2,
    firstName: "Александр",
    lastName: "",
    email: "user@example.com",
    phone: "+79997654321",
    password: "user123",
    role: "user"
  }
];

// Middleware для проверки авторизации
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: "Требуется авторизация" });
  }
  
  // В реальном проекте используйте JWT
  const user = users.find(u => u.id === parseInt(token));
  
  if (!user) {
    return res.status(403).json({ error: "Недействительный токен" });
  }
  
  req.user = user;
  next();
};

// ============ AUTH ENDPOINTS ============

// Регистрация
app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword, role } = req.body;
  
  // Валидация
  if (!firstName?.trim()) {
    return res.status(400).json({ error: "Имя обязательно" });
  }
  
  if (firstName.trim().length < 2) {
    return res.status(400).json({ error: "Имя должно содержать минимум 2 символа" });
  }
  
  if (!lastName?.trim()) {
    return res.status(400).json({ error: "Фамилия обязательна" });
  }
  
  if (lastName.trim().length < 2) {
    return res.status(400).json({ error: "Фамилия должна содержать минимум 2 символа" });
  }
  
  if (!email?.trim()) {
    return res.status(400).json({ error: "Email обязателен" });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Некорректный формат email" });
  }
  
  // Проверка уникальности email
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Пользователь с таким email уже существует" });
  }
  
  if (!phone?.trim()) {
    return res.status(400).json({ error: "Телефон обязателен" });
  }
  
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return res.status(400).json({ error: "Некорректный формат телефона" });
  }
  
  if (!password) {
    return res.status(400).json({ error: "Пароль обязателен" });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: "Пароль должен содержать минимум 6 символов" });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Пароли не совпадают" });
  }
  
  // Создание пользователя
  const newUser = {
    id: users.length + 1,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    password: password,
    role: role || "user"
  };
  
  users.push(newUser);
  
  // Возвращаем данные без пароля
  const { password: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    message: "Регистрация успешна",
    user: userWithoutPassword,
    token: newUser.id.toString() // В реальном проекте используйте JWT
  });
});

// Логин
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email?.trim()) {
    return res.status(400).json({ error: "Email обязателен" });
  }
  
  if (!password) {
    return res.status(400).json({ error: "Пароль обязателен" });
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: "Неверный email или пароль" });
  }
  
  // Возвращаем данные без пароля
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    message: "Вход выполнен успешно",
    user: userWithoutPassword,
    token: user.id.toString() // В реальном проекте используйте JWT
  });
});

// Получение текущего пользователя
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const { password: _, ...userWithoutPassword } = req.user;
  res.json(userWithoutPassword);
});

// Получение всех пользователей (только для админа)
app.get('/api/auth/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Доступ запрещен. Требуются права администратора" });
  }
  
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json(usersWithoutPasswords);
});

// ============ PRODUCTS ENDPOINTS ============

// GET - получить все объявления
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET - получить одно объявление
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: "Объявление не найдено" });
  }
  
  res.json(product);
});

// POST - добавить объявление (только для авторизованных)
app.post('/api/products', authenticateToken, (req, res) => {
  const { name, price, description } = req.body;
  
  if (!name?.trim()) {
    return res.status(400).json({ error: "Название товара обязательно" });
  }
  
  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber) || priceNumber <= 0) {
    return res.status(400).json({ error: "Введите корректную цену" });
  }
  
  if (!description?.trim()) {
    return res.status(400).json({ error: "Описание обязательно" });
  }
  
  const newProduct = {
    id: Date.now(),
    name: name.trim(),
    price: priceNumber,
    description: description.trim(),
    userId: req.user.id,
    userName: `${req.user.firstName} ${req.user.lastName}`
  };
  
  products = [newProduct, ...products];
  res.status(201).json(newProduct);
});

// PUT - обновить объявление
app.put('/api/products/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: "Объявление не найдено" });
  }
  
  // Проверка прав (только автор или админ)
  if (products[productIndex].userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Вы можете редактировать только свои объявления" });
  }
  
  if (!name?.trim()) {
    return res.status(400).json({ error: "Название товара обязательно" });
  }
  
  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber) || priceNumber <= 0) {
    return res.status(400).json({ error: "Введите корректную цену" });
  }
  
  if (!description?.trim()) {
    return res.status(400).json({ error: "Описание обязательно" });
  }
  
  const updatedProduct = {
    ...products[productIndex],
    name: name.trim(),
    price: priceNumber,
    description: description.trim()
  };
  
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE - удалить объявление
app.delete('/api/products/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: "Объявление не найдено" });
  }
  
  // Проверка прав (только автор или админ)
  if (products[productIndex].userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Вы можете удалять только свои объявления" });
  }
  
  products = products.filter(p => p.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`✅ Сервер запущен на http://localhost:${port}`);
  console.log(`📦 API доступен: http://localhost:${port}/api/products`);
  console.log(`🔐 Auth API: http://localhost:${port}/api/auth`);
});