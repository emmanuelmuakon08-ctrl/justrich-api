const express = require('express');
const app = express();

app.use(express.json());
const express = require('express');
const app = express();

app.use(express.json());

// 🔐 API KEY SECURITY (ADD HERE)
const API_KEY = "justrich123";

app.use((req, res, next) => {
    const key = req.headers['x-api-key'];

    if (key !== API_KEY) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    next();
});

// TEMP DATABASE
let orders = [];
let id = 1;

// HOME
app.get('/', (req, res) => {
    res.send('JustRich API is LIVE 🚀');
});

// CREATE ORDER
app.post('/api/order', (req, res) => {
    const { network, number, bundle } = req.body;

    const newOrder = {
        id: id++,
        network,
        number,
        bundle,
        status: "processing",
        date: new Date()
    };

    orders.push(newOrder);

    res.json({
        success: true,
        order: newOrder
    });
});

// GET ORDER STATUS
app.get('/api/order/:id', (req, res) => {
    const order = orders.find(o => o.id == req.params.id);

    if (!order) {
        return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
