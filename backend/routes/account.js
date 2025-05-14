const { Router } = require('express')
const authMiddleware = require('../authMiddleware')
const { Account } = require('../db')
const { transferBody } = require('../types')
const mongoose = require('mongoose')
const router = Router()

router.get('/balance', authMiddleware, async (req, res) => {
	const account = await Account.findOne({
		userId: req.userId
	})

	if (!account) {
		return res.status(411).json({
			message: "User doesn't exists"
		})
	}

	res.status(200).json({
		balance: account.balance / 100
	})
})

router.post('/transfer', authMiddleware, async (req, res) => {
	const { to, amount } = req.body
	const { success } = transferBody.safeParse({
		to,
		amount
	})

	if (!success) {
		return res.status(411).json({
			message: "Incorrect inputs"
		})
	}

	const session = await mongoose.startSession()

	try {

		await session.startTransaction()

		const account = await Account.findOne({
			userId: req.userId
		}).session(session)

		if (account.balance < amount) {
			await session.abortTransaction()
			return res.status(400).json({
				message: "Insufficient balance"
			})
		}

		const toAccount = await Account.findOne({
			userId: to
		}).session(session)

		if (!toAccount) {
			await session.abortTransaction()
			return res.status(400).json({
				message: "Invalid account"
			})
		}

		await Account.updateOne({
			userId: req.userId
		}, {
			$inc: {
				balance: -amount
			}
		}).session(session)

		await Account.updateOne({
			userId: to
		}, {
			$inc: {
				balance: amount
			}
		}).session(session)


		await session.commitTransaction()

		res.status(200).json({
			message: "Transfer successful"
		})
	} catch (error) {
		await session.abortTransaction()
		return res.status(400).json({
			message: "Something went wrong",
			error: error.message

		})
	} finally {
		await session.endSession()
	}
})
module.exports = router
