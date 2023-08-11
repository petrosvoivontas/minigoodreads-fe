import React from "react"
import { Form } from "react-router-dom"

const Book = ({ book }) => {
	const { bookId, coverImageUrl, bookTitle, bookAuthors, pageCount } = book
	return (
		<div id="contact">
			{coverImageUrl && (
				<div>
					<img src={coverImageUrl} alt="book cover" />
				</div>
			)}
			<div>
				<h1>{bookTitle}</h1>

				<p>{bookAuthors}</p>

				<p>Number of pages: {pageCount}</p>
			</div>
			<div>
				<Form action={`books/${bookId}/delete`} method="delete">
					<button type="submit">Remove</button>
				</Form>
			</div>
		</div>
	)
}

export default Book