const {Category} = require('../model/Category');

//GET all categories
const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//GET category by id
const getCategoryById =  async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    }catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Create category
const createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        if(newCategory) return res.status(400).json({ message: "Category already exists" });
        res.json({ message: "New Category created successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Update category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Delete category
const deleteCategory = async (req, res) => {
    try {
        // Check if the logged-in user is an admin
        if (req.category.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Only admins can delete categories." });
        }

        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await Category.findByIdAndDelete(categoryId);
        res.json({ message: "Category deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
