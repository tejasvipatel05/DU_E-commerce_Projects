const {Order} = require('../model/Order');


//Customer GET All own orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .populate('products.product_id')
      .populate('products.seller_id');
      if (!orders) {
        return res.json({ message: 'Order is empty', order: null });
      }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

//GET order by ID
const getOrderByIdForCustomer = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user_id: req.user._id })
      .populate('products.product_id')
      .populate('products.seller_id');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

//Create new order
const createOrder = async (req, res) => {
  try {
    // Ensure the order is created for the authenticated customer.
    const orderData = {
      ...req.body,
      user_id: req.user._id
    };

    // You might want to calculate totalAmount here based on products
    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

//Update Order
const updateOrderForCustomer = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user_id: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Optional: only allow update if order is in a cancellable state
    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'Order cannot be updated at this stage' });
    }

    // For example, allowing the customer to cancel the order.
    Object.assign(order, req.body);
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

//Cancel/Delete Order
const deleteOrderForCustomer = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user_id: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Optional: check if order can be cancelled
    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
    }
    
    await order.remove();
    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order', error });
  }
};

//seller GET ALL order for own products
const getOrdersForSeller = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const orders = await Order.find({ 'products.seller_id': sellerId })
      .populate('products.product_id')
      .populate('products.seller_id');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seller orders', error });
  }
};

//GET details of specific order
const getOrderByIdForSeller = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const order = await Order.findOne({ 
      _id: req.params.orderId, 
      'products.seller_id': sellerId 
    })
      .populate('products.product_id')
      .populate('products.seller_id');
    if (!order) return res.status(404).json({ message: 'Order not found or unauthorized' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order for seller', error });
  }
};

//GET ALL Order
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('products.product_id')
      .populate('products.seller_id');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all orders', error });
  }
};

//GET order by ID
const getOrderByIdForAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('products.product_id')
      .populate('products.seller_id');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

//Update Order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId, 
      req.body, 
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

//Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await order.remove();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};

module.exports = {getMyOrders, updateOrder, deleteOrder, getAllOrders, getOrderByIdForCustomer, getOrderByIdForAdmin, getOrderByIdForSeller, getOrdersForSeller, createOrder, updateOrderForCustomer, deleteOrderForCustomer}