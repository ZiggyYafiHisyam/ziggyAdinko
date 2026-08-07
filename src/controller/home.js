const HomeModels = require('../models/home');

//buat DB kalo udah ada data
const getHome = async (req, res) => {
    try {
        const [data] = await HomeModels.getHome();
        res.json({
            message: 'Welcome to Adinko Home Page by Zeke',
            data: data
        });
    }    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//buat sementara mastiin routing bisa
// res.json({
//         message: 'Welcome to Adinko Home Page by Zeke',
//         data: null
//     });
// }
module.exports = { getHome };