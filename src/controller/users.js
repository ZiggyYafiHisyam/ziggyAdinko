const UsersModels = require('../models/users');

// READ (GET) - Ambil Data dari DB
const getAllUsers = async (req, res) => {
    try {
        const [data] = await UsersModels.getAllUsers();
        res.json({
            message: 'User Data has been retrieved',
            data: data
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving user data',
            serverMessage: error,
        });
    }
    
}

// CREATE (POST) - Input Data baru ke DB
const createNewUser = async (req, res) => {
    const { body } = req;
    if (!body.name || !body.email) {
        return res.status(400).json({
            message: 'Data requiredment not fulfilled, please fill name and email',
            data: null
        });
    }
    try {
        await UsersModels.createNewUser(body);
        res.status(201).json({
            message: 'New User has been created',
            data: body
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving user data',
            serverMessage: error,
        });
    }
}

// UPDATE (PATCH) - Update Data di DB
const updateUser = async (req, res) => {
    const { idUser } = req.params;
    const { body } = req;
    try {
        await UsersModels.updateUser(idUser, body);
        res.json({
            message: 'User Data has been updated, idUser:' + idUser,
            data: {
                id: idUser,
                ...body
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating user data',
            serverMessage: error,
        });
    }
    console.log("Updated User Data:", idUser);
    res.json({
        message: 'User Data has been updated, idUser:' + idUser,
        data: req.body
    });
}

// DELETE (DELETE) - Hapus Data di DB
const deleteUser = (req, res) => {
    const { idUser } = req.params;
    try {
        UsersModels.deleteUser(idUser);
        res.json({
            message: 'User Data has been deleted',
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete user data',
            serverMessage: error,
        });
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}