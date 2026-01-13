const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await (await Product.find({}))
  .sort('name')
  .select('name price');
  res.status(200).json({ products, nbHits: products.length });  
};


const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  
  let result = Product.find(queryObject);
  if (sort) {
    const sortFields = sort.split(',').join(' ');
    result = result.sort(sortFields);
  } else {
    result = result.sort('createdAt');
  }

  if (numericFilters) {
    const operatorMap = {
      gte: '$gte',
      gt: '$gt',
      lte: '$lte',
      lt: '$lt',
    };
    const regEx = /\b(gte|gt|lte|lt)\b/g;
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('|');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });  
};

module.exports = { getAllProductsStatic, getAllProducts };