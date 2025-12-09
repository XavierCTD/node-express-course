const express = require('express');
const path = require('path');
const { products } = require("./data");
const app = express();

const production = [
  { id: 1, name: 'john' },
  { id: 2, name: 'peter' },
  { id: 3, name: 'susan' },
  { id: 4, name: 'anna' },
  { id: 5, name: 'emma' },
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1/products', (req, res) => {
    const newProducts = products.map((product) => {
      const { id, name, image, price, desc } = product
      return { id, name, image, price, desc }
    })

    res.json(newProducts)
});

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = production.find((p) => p.id === idToFind);

    if(!product) {
        return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
});

app.get('/api/v1/test', (req, res) => {
    res.status(200).json({ message: "It worked!"});
});

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
        return res.status(200).json({ sucess: true, data: [] })
    }
    res.status(200).json(sortedProducts)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404:</h1> <br/> <p>Page not found.<p>');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});