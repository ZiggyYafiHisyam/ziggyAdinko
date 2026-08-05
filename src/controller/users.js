const getAllUsers = (req, res) => {
    res.json({
        message: 'GET all users bisa'
    });
}

const createNewUser = (req, res) => {
    res.json({
        message: 'POST create user bisa'
    });
}

module.exports = {
    getAllUsers,
    createNewUser
}