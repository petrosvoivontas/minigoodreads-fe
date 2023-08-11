import { redirect } from 'react-router-dom'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const addBookToListAction = async ({ request }) => {
	const formData = await request.formData()
	const listId = formData.get('listId')
	const bookId = formData.get('bookId')
	const bookTitle = formData.get('bookTitle')
	const bookAuthor = formData.get('bookAuthor')
	const coverImageUrl = formData.get('coverImageUrl')
	const pageCount = formData.get('pageCount')
	const token = localStorage.getItem('accessToken')
	await fetch(`http://localhost:8081/api/lists/${listId}/books`, {
		method: 'POST',
		headers: {
			Authorization: `basic ${token}`,
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			bookId,
			bookTitle,
			bookAuthor,
			coverImageUrl,
			pageCount,
		}),
	})
	return redirect(`/lists/${listId}`)
}
