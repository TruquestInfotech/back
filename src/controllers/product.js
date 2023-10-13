const { default: mongoose } = require('mongoose')
const Product = require('../models/product')
const slugify = require('slugify')
const Category = require('../models/category')

exports.createProduct = (req, res) => {
  //res.status(200).json({file:req.file, body:req.body})
  const { name, description, category, createdBy, quantity, height, width, type, weight, goldWeight, gold, makingCharges, gst, total, totalWeight, productCode, productWeight, totalNoOfDiamonds, diamond, stoneColour, stoneWeight, stone, price } = req.body
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map(file => {
      return {
        img: `/public/${file.filename}`
      }
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    height,
    width,
    type,
    gold,
    makingCharges,
    gst,
    weight,
    goldWeight,
    price,
    total,
    totalWeight,
    productCode,
    productWeight,
    totalNoOfDiamonds,
    diamond,
    stoneColour,
    stoneWeight,
    stone,
    quantity,
    description,
    category,
    productPictures,
    createdBy: req.user._id,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product })
    }
  })

};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select('_id')
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error })
      }

      if (category) {
        Product.find({ category: category._id })
          .exec((error, products) => {
            if (error) {
              return res.status(400).json({ error })
            }
            if (products.length > 0) {

              res.status(200).json({
                products,
                productsByPrice: {
                  under10k: products.filter(product => product.price <= 10000),
                  under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                  under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                  under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                  under40k: products.filter(product => product.price > 30000 && product.price <= 40000),
                  under50k: products.filter(product => product.price > 40000 && product.price <= 50000),
                  under60k: products.filter(product => product.price > 50000 && product.price <= 60000),
                  under70k: products.filter(product => product.price > 60000 && product.price <= 70000),
                  under80k: products.filter(product => product.price > 70000)
                }
              });
            }

          })
      }

    });

}


exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
  
};

exports.getSimilarProducts= async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log(process.env.API)
    // Assuming you have a "category" field in your product model
    const product = await Product.findById(productId);
    const category = product.category;

    // Find similar products with the same category (excluding the current product)
    const similarProducts = await Product.find({
      category,
      _id: { $ne: productId }, // Exclude the current product
    }).limit(5); // Limit the number of similar products returned

    res.json({ similarProducts });
  } catch (error) {
    console.error('Error fetching similar products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};