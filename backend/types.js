const { z } = require('zod')

const signUpBody = z.object({
	username: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string(),
}) 

const signInBody = z.object({
	username: z.string().email(),
	password: z.string()
})

const updateBody = z.object({
	password: z.string().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
})


const transferBody = z.object({
	to: z.string(),
	amount: z.number()
})
module.exports = {
	signUpBody,
	signInBody,
	updateBody,
	transferBody
}
