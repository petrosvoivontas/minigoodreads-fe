import React from 'react'
import { useLoaderData } from 'react-router-dom'

export const loader = async ({ params }) => {
	const { id: listId } = params
	return [
		{
			bookId: 'bookId',
			coverImageUrl: null,
			bookTitle: 'bookTitle',
			bookAuthor: 'bookAuthor',
			insertTs: 1690743791050,
		},
	]
}

const BooksInList = () => {
	const books = useLoaderData()
	return (
		<>
			{books.length ? (
				<ul>
					{books.map(book => (
						<li key={book.bookId}>
							<label>Book name</label>
							<p>{book.bookTitle}</p>
						</li>
					))}
				</ul>
			) : (
				<></>
			)}
		</>
	)
}

export default BooksInList
