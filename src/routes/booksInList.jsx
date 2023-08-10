import React from 'react'
import { Form, Link, redirect, useLoaderData, useParams } from 'react-router-dom'
import Book from '../components/Book'

export const loader = async ({ params }) => {
	const { id: listId } = params
	return [
		{
			bookId: 'bookId',
			coverImageUrl: 'http://books.google.com/books/content?id=d2WZDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			bookTitle: 'bookTitle',
			bookAuthor: 'bookAuthor',
			insertTs: 1690743791050,
		},
	]
}

export const removeBookFromListAction = async ({ params }) => {
	const { id: listId, bookId } = params
	console.log(`removing book ${bookId} from list ${listId}`)
	const token = localStorage.getItem('accessToken')
	await fetch(`http://localhost:8081/api/lists/${listId}/books/${bookId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `basic ${token}`,
		},
	})
	return redirect(`/lists/${listId}`)
}

const BooksInList = () => {
	const books = useLoaderData()
	const { id: listId } = useParams()
	return (
		<>
			{listId >= 10 && (
				<>
					<Link to={`/lists/${listId}/edit`}>
						<button>Rename</button>
					</Link>
					<Form action={`/lists/${listId}/delete`}>
						<button type='submit'>Delete</button>
					</Form>
				</>
			)}
			{books.length ? (
				<ul>
					{books.map(book => (
						<Book book={book} key={book.bookId} />
					))}
				</ul>
			) : (
				<></>
			)}
		</>
	)
}

export default BooksInList
