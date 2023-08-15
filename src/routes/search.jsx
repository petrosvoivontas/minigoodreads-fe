import React, { useEffect } from 'react'
import { Form, useLoaderData, useSubmit, useNavigation, useRouteLoaderData } from 'react-router-dom'
import Book from '../components/Book'

/**
 * @type {import('react-router-dom').LoaderFunction'}
 */
export const loader = async ({ request }) => {
	const url = new URL(request.url)
	const q = url.searchParams.get('q')
	if (q === null || q.trim() === '') {
		return { q: null, books: [] }
	}
	const searchParams = new URLSearchParams({
		q,
		key: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY,
		fields: 'kind,items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks,volumeInfo/pageCount)'
	})
	const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${searchParams}`)
	const jsonResponse = await response.json()
	const books = jsonResponse.items.map((item) => {
		const book = {
			bookId: item.id,
			bookTitle: item.volumeInfo.title,
			bookAuthors: item.volumeInfo.authors?.join(', '),
			coverImageUrl: item.volumeInfo.imageLinks?.thumbnail,
			pageCount: item.volumeInfo.pageCount,
		}
		return book
	})
	return { q, books }
}

const Search = () => {
	const { q, books } = useLoaderData()
	const lists = useRouteLoaderData('root')
	const submit = useSubmit()
	const navigation = useNavigation()
	const isLoggedIn = localStorage.getItem('accessToken')

	const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

	useEffect(() => {
		document.getElementById('q').value = q
	}, [q]);

	return (
		<div>
			<Form id="search-form" role="search">
				<input
					id="q"
					className={searching ? "loading" : ""}
					aria-label="Search contacts"
					placeholder="Search"
					type="search"
					name="q"
					defaultValue={q}
					onChange={(event) => {
						const isFirstSearch = q == null;
						submit(event.currentTarget.form, {
						  replace: !isFirstSearch,
						})
					}}
				/>
				<div id="search-spinner" aria-hidden hidden={!searching} />
				<div className="sr-only" aria-live="polite"></div>
			</Form>
			{books.length > 0 && (
				<ul id="search-results">
					{books.map(book => (
						<div key={book.id} style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'top'
						}}>
							<Book book={book} />
							{lists && isLoggedIn && (
								<div style={{
									display: 'flex',
									alignItems: 'center',
									columnGap: '1rem',
								}}>
									<label htmlFor="lists">Add to list:</label>
									<Form action='/add-to-list' method='post' id='add-to-list'>
										<select name='listId'>
											{lists.map(list => (
												<option key={list.listId} value={list.listId}>{list.name}</option>
											))}
										</select>
										<input hidden readOnly name='bookId' value={book.bookId} />
										<input hidden readOnly name='bookTitle' value={book.bookTitle} />
										<input hidden readOnly name='bookAuthor' value={book.bookAuthors} />
										<input hidden readOnly name='coverImageUrl' value={book.coverImageUrl} />
										<input hidden readOnly name='pageCount' value={book.pageCount} />
										<button type='submit'>Add</button>
									</Form>
								</div>
							)}
						</div>
					))}
				</ul>
			)}
		</div>
	)
}

export default Search