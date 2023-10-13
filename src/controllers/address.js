const address = require("../models/address");
const UserAddress = require("../models/address");


exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  const { address } = req.body;

  if (address) {
    if (address._id) {
      UserAddress.findOneAndUpdate(
        { user: req.user._id, "address._id": address._id },
        {
          $set: {
            "address.$": address,
          },
        }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    } else {
      UserAddress.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            address: address,
          },
        },
        { new: true, upsert: true }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    }
  } else {
    res.status(400).json({ error: "Params address required" });
  }
};

exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.user._id }).exec((error, userAddress) => {
    if (error) return res.status(400).json({ error });
    if (userAddress) {
      res.status(200).json({ userAddress });
    }
  });
};
exports.getSelectedAddressById= async (req, res) => {
  try {
    const addressId = req.params._id;
    console.log(addressId)
    
    // Assuming you have a "category" field in your product model
    // const product = await Product.findById(productId);
    // const category = product.category;

    // // Find similar products with the same category (excluding the current product)
    // const similarProducts = await Product.find({
    //   category,
    //   _id: { $ne: productId }, // Exclude the current product
    // }).limit(5); // Limit the number of similar products returned

    // res.json({ similarProducts });
  } catch (error) {
    console.error('Error fetching similar products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};