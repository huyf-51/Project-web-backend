const Product = require("../models/product")

class ProductController {
    async addProduct(req, res) {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
        else { id = 1; }
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({ success: true, name: req.body.name })
    }

    async removeProduct(req, res) {
        const product = await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({ success: true, name: req.body.name })
    }

    uploadImage(req, res) {
        res.json({
            success: 1,
            image_url: `${process.env.SERVER_URL}/images/${req.file.filename}`
        })
    }

    async editProduct(req, res) {
        const product = await Product.findOne({id: req.params.id})
        console.log('edit product');
        res.send(product)
    }

    updateProduct(req, res) {
        Product.updateOne({id: req.params.id}, req.body)
            .then(() => {
                res.json({success: true})
            })
    }
}

module.exports = new ProductController()