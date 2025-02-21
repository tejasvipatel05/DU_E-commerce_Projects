const { Category } = require('../model/Category');

//GET all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching categories', error });
    }
};

//GET category by id
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching category', error });
    }
};

//Create category
const createCategory = async (req, res) => {
    try {
        const {categoryData} = req.body;
        const category_name = categoryData.category_name;

        if (!category_name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ category_name });

        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // If an image file is uploaded, store the binary data along with its MIME type.
        if (req.file) {
            categoryData.category_img = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        // Create new category
        const newCategory = await Category.create({ categoryData });

        res.status(201).json({ message: "New category created successfully", category: newCategory });
    } catch (error) {
        console.error("Error creating category:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//Update category
const updateCategory = async (req, res) => {
    try {
        const updateData = req.body;
        if (req.file) {
            updateData.category_img = {
              data: req.file.buffer,
              contentType: req.file.mimetype
            };
          }

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Delete category
const deleteCategory = async (req, res) => {
    try {
        const deletedcategory = await Category.findById(req.params.id);

        if (!deletedcategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        await Category.findByIdAndDelete(deletedcategory);
        res.json({ message: "Category deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {getAllCategories,getCategoryById,createCategory,updateCategory,deleteCategory}