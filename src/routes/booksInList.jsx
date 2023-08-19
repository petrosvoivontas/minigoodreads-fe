import React from 'react'
import { Form, Link, redirect, useLoaderData, useParams } from 'react-router-dom'
import Book from '../components/Book'
import UpdateReadingProgress from './updateReadingProgress'

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
	if (listId !== '1') {
		return books.data.map(book => ({ ...book, bookAuthors: book.bookAuthor }))
	}
	/**
	 * @type {Promise<Response>[]}
	 */
	const readingProgressPromises = books.data.map(async book => {
		try {
			return await fetch(`http://localhost:8081/api/progress/${book.bookId}`, {
				headers: {
					Authorization: `basic ${token}`,
				},
			})
		} catch {
			return new Response({
				data: {
					currentPage: null
				}
			}, {
				headers: {
					'content-type': 'application/json'
				}
			})
		}
	})

	/**
	 * @type {PromiseFulfilledResult<Response>[]}
	 */
	const readingProgressResponses = await Promise.allSettled(readingProgressPromises)

	/**
	 * @type {PromiseFulfilledResult<any>[]}
	 */
	const readingProgressArray = await Promise.allSettled(readingProgressResponses.map(result => result.value.json()))

	return books.data.map((book, i) => {
		console.log(book, readingProgressArray[i])
		return { 
			...book,
			bookAuthors: book.bookAuthor,
			currentPage: readingProgressArray[i].value?.data?.currentPage
		}
	})
}

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const removeBookFromListAction = async ({ params, request }) => {
	const { id: listId, bookId } = params
	console.log(`removing book ${bookId} from list ${listId}`)
	const token = localStorage.getItem('accessToken')
	await fetch(`http://localhost:8081/api/lists/${listId}/books/${bookId}`, {
		method: request.method,
		headers: {
			Authorization: `basic ${token}`,
		},
	})
	return redirect(`/lists/${listId}`)
}

const BooksInList = () => {
	const books = useLoaderData()
	const { id: listId } = useParams()
	const isCurrentlyReadingList = listId === '1'
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
					{books.sort((a, b) => a.insertTs < b.insertTs).map((book, i) => (
						<div key={i} style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
							<Book book={book} key={book.bookId} showCurrentPage={isCurrentlyReadingList} currentPage={book.currentPage} />
							{isCurrentlyReadingList && <UpdateReadingProgress bookId={book.bookId} bookName={book.bookTitle} pageCount={book.pageCount} />}
						</div>
					))}
				</ul>
			) : (
				<></>
			)}
		</>
	)
}

export default BooksInList
