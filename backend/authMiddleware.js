const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./config')

function authMiddleware(req, res, next) {
	const authorization = req.headers.authorization

	if(!authorization || !authorization.startsWith('Bearer ')) {
		return res.status(411).json({
			message: "Error while logging in"
		})
	}

	const token = authorization.split(' ')[1]

	try{
		const {userId} = jwt.verify(token, JWT_SECRET)
		if(userId) {
			req.userId = userId
			next()
		} else {
			return res.status(411).json({
				message: "Error while logging in"
			})
		}

	} catch(err){
		return res.status(411).json({
			message: "Error while logging in"
		})
	}
}

module.exports = authMiddleware
