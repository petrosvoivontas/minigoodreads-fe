import React from 'react'
import { Form, Link, redirect, useLoaderData, useParams } from 'react-router-dom'
import Book from '../components/Book'

export const loader = async ({ params }) => {
	const { id: listId } = params
	console.log(`loading books for list ${listId}`)
	const token = localStorage.getItem('accessToken')
	const response = await fetch(`http://localhost:8081/api/lists/${listId}/books`, {
		headers: {
			Authorization: `basic ${token}`,
		},
	})
	const books = await response.json()
	return books.data
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
