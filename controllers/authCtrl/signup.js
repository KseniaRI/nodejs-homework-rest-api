const { Conflict } = require('http-errors');
const { User } = require('../../models');

const signup = async (req, res, next) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict('Email in use');
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.save();
    
    res.status(201).json({
        status: "created",
        code: "201",
        data: {
            user: {
                email,
                subscription,
            }
        }
    })
}

module.exports = signup;