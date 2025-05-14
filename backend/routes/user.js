const { Router } = require('express')
const { signUpBody, signInBody, updateBody } = require('../types')
const { User, Account } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')
const authMiddleware = require('../authMiddleware')

const router = Router()

router.get('/me', authMiddleware, async (req, res) => {
	const user = await User.findOne({ _id: req.userId });

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	const account = await Account.findOne({ userId: req.userId });

	if (!account) {
		return res.status(404).json({ message: "Account not found" });
	}

	const { balance } = account;
	
	res.status(200).json({
		user: {
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			_id: user._id,
			balance
		}
	});
});


router.post('/signup', async (req, res) => {
	const body = req.body
	const { success } = signUpBody.safeParse(body)
	if (!success) {
		return res.status(411).json({
			message: "Email already taken / Incorrect inputs"
		})
	}

	if (await User.findOne({
		username: req.body.username
	})) {
		return res.status(411).json({
			message: "Email already taken / Incorrect inputs"
		})
	}

	req.body.password = await bcrypt.hash(req.body.password, 10)

	const user = await User.create(req.body)

	const userId = user._id

	await Account.create({
		userId,
		balance: Math.floor((1 + Math.random() * 100000) * 100)
	})

	const token = jwt.sign({
		userId
	}, JWT_SECRET)

	res.status(200).json({
		message: "User created successfully",
		token: token
	})
})

router.post('/signin', async (req, res) => {
	const body = req.body
	const { success } = signInBody.safeParse(body)

	if (!success) {
		return res.status(411).json({
			message: "Error while logging in"
		})
	}

	const user = await User.findOne({
		username: req.body.username
	})

	if (!user) {
		return res.status(411).json({
			message: "User not found"
		})
	}

	const isValidPassword = await bcrypt.compare(req.body.password, user.password)

	if (!isValidPassword) {
		return res.status(411).json({
			message: "Incorrect password"
		})
	}

	const token = jwt.sign({
		userId: user._id
	}, JWT_SECRET)


	res.status(200).json({
		token
	})
})

router.put('/', authMiddleware, async (req, res) => {
	const body = req.body
	const { success } = updateBody.safeParse(body)
	if (!success) {
		return res.status(411).json({
			message: "Error while updating information"
		})
	}

	await User.updateOne({
		_id: req.userId
	}, req.body)

	res.status(200).json({
		message: "Updated successfully"
	})
})


router.get('/bulk', authMiddleware, async (req, res) => {
	const filter = req.query.filter || ""

	const users = await User.find({
		$or: [{
			firstName: {
				"$regex": filter
			}
		}, {
			lastName: {
				"$regex": filter
			}
		}]
	})

	res.status(200).json({
		users: (users.filter(user => user._id != req.userId)).map((user) => ({
			_id: user._id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
		}))
	})
})


module.exports = router
