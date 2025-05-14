const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yash-r-gorde:74RK8xqAuKm0jn9M@cohort-2-cluster.7hhk3ms.mongodb.net/self_paytm')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        minlength: 5,
        maxlength: 254 
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128,
        validate: {
            validator: function (v) {
                return /[A-Za-z]/.test(v) && /[0-9]/.test(v);
            },
            message: 'Password must contain at least one letter and one number.'
        }
    }
});


const accountSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	balance: {
		type: Number,
		default: 0,
		validate: {
			validator: Number.isFinite,
			message: "Balance must be a valid number"
		}
	}
})

const Account = mongoose.model('Account', accountSchema)
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    	Account
}
