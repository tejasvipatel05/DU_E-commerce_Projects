const Order = require("../model/Order");
const Return = require("../model/Return");

const getAllReturnProduct = async (req, res) => {
    try {
        const returnProduct = await ReturnProduct.find();
        if (!returnProduct) {
            res.status(404).json({ message: "No return available!" });
        }
        res.status(200).json(returnProduct);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getReturnById = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        
        const returnRequest = await ReturnProduct.findById(req.params.id).populate("order_id");
        
        if (!returnRequest) {
            return res.status(404).json({ message: "Return request not found." });
        }
        
        if (returnRequest.user_id.toString() !== user_id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. You can't access this return request." });
        }
        
        res.status(200).json(returnRequest);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const getUserReturns = async (req, res) => {
    try {
        const user_id = req.user.user_id; 
        const role = req.user.role;

        let returnRequests;
        
        if (role === "admin") {
            returnRequests = await ReturnProduct.find().populate("order_id");
        } else {
            returnRequests = await ReturnProduct.find()
                .populate({
                    path: "order_id",
                    match: { user_id: user_id },
                })
                .exec();
            
            returnRequests = returnRequests.filter((request) => request.order_id !== null);
        }

        if (!returnRequests || returnRequests.length === 0) {
            return res.status(404).json({ message: "No return requests found." });
        }

        res.status(200).json(returnRequests);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const createReturnRequest = async (req, res) => {
    try {
        const { order_id, return_reason } = req.body;
        const user_id = req.user.user_id;

        const order = await Order.findById(order_id);
        if (!order || order.is_deleted === true) {
            return res.status(404).json({ message: "Order not found." });
        }

        if (order.user_id.toString() !== user_id) {
            return res.status(403).json({ message: "You are not authorized to return this order." });
        }

        const deliveryDate = order.updated_at;
        const currentDate = new Date();
        const timeDifference = (currentDate - deliveryDate) / (1000 * 60 * 60 * 24); 
        
        if (timeDifference > 7) {
            return res.status(400).json({ message: "Return period expired. Returns are only allowed within 7 days of delivery." });
        }

        const existingReturn = await ReturnProduct.findOne({ order_id });
        if (existingReturn) {
            return res.status(400).json({ message: "Return request already exists for this order." });
        }

        const newReturn = new ReturnProduct({
            order_id,
            user_id,
            return_reason,
            return_status: "Pending"
        });

        await newReturn.save();
        res.status(201).json({ message: "Return request submitted successfully.", returnRequest: newReturn });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const updateReturnRequest = async (req, res) => {
    try {
        const { return_id } = req.params;
        const { return_status } = req.body;

        const returnRequest = await ReturnProduct.findById(return_id);
        if (!returnRequest) {
            return res.status(404).json({ message: "Return request not found." });
        }

        returnRequest.return_status = return_status;
        returnRequest.processed_date = new Date();
        await returnRequest.save();

        res.status(200).json({ message: "Return request updated successfully.", returnRequest });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createReturnRequest, getUserReturns, getReturnById, updateReturnRequest, getAllReturnProduct }