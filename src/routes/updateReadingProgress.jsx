import React from 'react'
import { Form, redirect } from 'react-router-dom'
import { readingProgressUpdateEvent } from '../lib/events'
import { baseUrl } from '../lib/api'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const updateReadingProgressAction = async ({ request }) => {
	const formData = await request.formData()
	const bookId = formData.get('bookId')
	const bookTitle = formData.get('bookName')
	const progress = formData.get('progress')
	const pageCount = formData.get('pageCount')
	const token = localStorage.getItem('accessToken')
	await fetch(`${baseUrl}/api/progress/${bookId}`, {
		method: request.method,
		headers: {
			Authorization: `basic ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ currentPage: progress }),
	})

	// post event
	await readingProgressUpdateEvent(bookTitle, progress, pageCount)

	return redirect('/lists/1')
}

const UpdateReadingProgress = ({ bookId, bookName, pageCount }) => {
	return (
		<Form action='/progress' method='PATCH'>
			<label htmlFor='progress'>Progress</label>
			<input
				id='progress'
				name='progress'
				type='number'
				min={1}
				max={pageCount}
				required
			/>
			<input hidden name='bookId' value={bookId} />
			<input hidden name='bookName' value={bookName} />
			<input hidden name='pageCount' value={pageCount} />
			<button type='submit'>Save</button>
		</Form>
	)
}

export default UpdateReadingProgress