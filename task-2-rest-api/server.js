const express = require("express");

const app = express();

const PORT = 3000;

// يسمح للسيرفر بقراءة JSON من الطلبات
app.use(express.json());


// بيانات مؤقتة بدل قاعدة البيانات
let users = [
    {
        id: 1,
        name: "Yaqut",
        email: "engyaqutkhallaf@gmail.com"
    }
];


// GET - جلب كل المستخدمين
app.get("/users", (req, res) => {
    res.status(200).json(users);
});


// GET - جلب مستخدم حسب ID
app.get("/users/:id", (req, res) => {

    const user = users.find(
        user => user.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});


// POST - إضافة مستخدم جديد
app.post("/users", (req, res) => {

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);

    res.status(201).json(newUser);
});


// PUT - تعديل مستخدم
app.put("/users/:id", (req, res) => {

    const user = users.find(
        user => user.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;
    user.email = req.body.email;

    res.json(user);
});


// DELETE - حذف مستخدم
app.delete("/users/:id", (req, res) => {

    const userExists = users.some(
        user => user.id === Number(req.params.id)
    );

    if (!userExists) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users = users.filter(
        user => user.id !== Number(req.params.id)
    );

    res.json({
        message: "User deleted successfully"
    });
});


// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});