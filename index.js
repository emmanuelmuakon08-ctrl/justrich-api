const express = require('express');
const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('JustRich API is LIVE 🚀');
});

// Order endpoint
app.post('/api/order', (req, res) => {
    const { network, number, bundle } = req.body;

    res.json({
        status: "success",
        message: `Order placed for ${network}`,
        data: { number, bundle }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
