const roles = {
    admin: ['getAllUsers', 'getUserById', 'updateUser', 'deleteUser', 'getAllCategories', 'getCategoryById', 'createCategory', 'updateCategory', 'deleteCategory'],
    seller: ['createProduct', 'updateProduct'],
    customer: ['viewProducts', 'buyProduct']
};

module.exports = roles;