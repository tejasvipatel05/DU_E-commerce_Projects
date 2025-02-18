const Payment = require("../model/Payment");
const Order = require("../model/Order");

//Cash on Delivery (COD) Payment
const createCODPayment = async (req, res) => {
    try {
        const { order_id } = req.body;

        // Fetch the order
        const order = await Order.findById(order_id);
        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        // Create payment details for COD
        const payment = new Payment({
            payment_method: "COD",
            amount: order.total_amount,
            payment_status: "Pending",  // COD payment is always pending until delivery
        });

        await payment.save();

        // Link payment_id to the order
        order.payment_id = payment._id;
        await order.save();

        res.status(200).json({
            message: "COD payment created successfully.",
            payment_id: payment._id,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};