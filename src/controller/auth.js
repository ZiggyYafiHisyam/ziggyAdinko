const UserModels = require('../models/user');
const { verifyPassword } = require('../utils/security');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password wajib diisi.' });
    }

    try {
        const user = await UserModels.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Username atau password salah.' });
        }

        const isValid = verifyPassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Username atau password salah.' });
        }

        const sessionUser = {
            id: user.id_user,
            username: user.username,
            name: user.name,
            role: user.role
        };

        // Create session and set cookie
        req.login(sessionUser);

        return res.json({
            message: 'Login berhasil!',
            user: sessionUser
        });
    } catch (error) {
        console.error('Auth login error:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server saat login.', serverMessage: error.message });
    }
};

const logout = async (req, res) => {
    req.logout();
    return res.json({ message: 'Logout berhasil.' });
};

const me = async (req, res) => {
    if (req.user) {
        return res.json({
            authenticated: true,
            user: req.user
        });
    }
    return res.status(401).json({
        authenticated: false,
        message: 'Belum login.'
    });
};

module.exports = {
    login,
    logout,
    me
};
