import React from "react"
import { Form } from "react-router-dom"

const Book = ({ book }) => {
	const { bookId, coverImageUrl, bookTitle, bookAuthor } = book
	return (
		<div id="contact">
			{coverImageUrl && (
				<div>
					<img src={coverImageUrl} alt="book cover" />
				</div>
			)}
			<div>
				<h1>{bookTitle}</h1>

				<p>{bookAuthor}</p>
			</div>
			<div>
				<Form action={`books/${bookId}/delete`} method="post">
					<button type="submit">Remove</button>
				</Form>
			</div>
		</div>
	)
}

export default Book