import { Schema, model } from 'mongoose'

interface IBook {
	title: string
	description?: string
	authors?: string
	favorite: boolean
	fileCover?: string
	fileName?: string
	fileBook?: string
}

const bookSchema = new Schema<IBook>({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	authors: {
		type: String
	},
	favorite: {
		type: Boolean,
		default: false
	},
	fileCover: {
		type: String
	},
	fileName: {
		type: String
	},
	fileBook: {
		type: String
	}
})

export default model<IBook>('Books', bookSchema)
