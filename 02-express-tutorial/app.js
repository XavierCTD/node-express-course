const express = require('express');
const path = require('path');
const peopleRouter = require("./routes/people");
const { products } = require("./data");
const app = express();
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toLocaleString()}`);
    next();
};


app.use(logger);

// Middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Router(s)

app.use("/api/v1/people", peopleRouter)

// Products Endpoints

app.get('/api/v1/products', (req, res) => {
    const newProducts = products.map((product) => {
      const { id, name, image, price, desc } = product
      return { id, name, image, price, desc }
    })

    res.json(newProducts)
});

app.get('/api/v1/test', (req, res) => {
    res.status(200).json({ message: "It worked!"});
});

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);

    if(!product) {
        return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
});


// Query example
app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        });    
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json(sortedProducts)
});


// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all
app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404:</h1><br /><p>Page not found.<p>');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});