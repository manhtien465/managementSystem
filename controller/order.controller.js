const { number } = require("joi");
const Orders = require("../schema/Orders.schema")
const Product = require("../schema/Products.schema");
const Model = require("../schema/Model.schema")

module.exports = {
    /**
     * 
     * @param {cart:["cart1",cart[2],cart[3]],address,phone ,userId,item} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkout: async (req, res, next) => {
        const { productId, modelId, number, address, phoneNumber, attributes } = req.body
        let totalPrice = 0
        const existproduct = await Product.findById(productId)
        if (!existproduct) {
            res.status(404).json({ msg: "product not found" })
        }

        if (number > existproduct.quantity) {
            res.status(400).json({ msg: "number product too large and greater than stock" })
        }
        if (modelId) {
            const existmodel = await Model.findById(modelId)
            if (!existmodel) {
                res.status(404).json({ msg: "model of product not found" })
            }
            if (existproduct.discount > 0) {
                totalPrice = number * (existmodel.price - (existmodel.price / 100 * existproduct.discount))
            }
        } else {
            if (existproduct.discount > 0) {
                totalPrice = number * (existproduct.price - (existproduct.price / 100 * existproduct.discount))
            }
        }


        const newOrder = new Orders(({
            productId,
            modelId,
            attributes,
            number,
            address,
            totalPrice: totalPrice,
            phoneNumber
        }))
        await newOrder.save()
        return res.json(newOrder)
    },
    /**
     * @url 
     * @param {status,limit,page,sort} req 
     * @param {} res 
     * @param {*} next 
     */
    getAllOrders: async (req, res, next) => {

        res.json(res.advancedResults)
    },
    /**
     * 
     * @param {userId,limit,page,sort} req 
     * @param {*} res 
     * @param {*} next 
     */
    getInforOrdersOfUser: async (req, res, next) => {
        res.json(res.advancedResults)
    },
    deleteOrder: async (req, res, next) => {
        const { id } = req.body;

        const order = await Orders.findById(id)
        if (!order) {
            return res.json({ msg: "order not found" })
        }
        await order.remove()
        return res.json({ msg: "successful" })

    },
    ChangeStatusOrder: async (req, res, next) => {
        const { id, status } = req.body

        const orderUpdate = await Orders.findByIdAndUpdate(id, { status }, {
            new: true,
            runValidators: true,
            useFindAndModify: false

        })
        if (!orderUpdate) {
            return res.json({ msg: "not found" })
        }
        if (status == "SHIPPING") {
            const updateProduct = await Product.findByIdAndUpdate({
                $inc: { sold: orderUpdate.number }
            }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
            )
        }

        res.json({ msg: "success", order: orderUpdate })
    },

}