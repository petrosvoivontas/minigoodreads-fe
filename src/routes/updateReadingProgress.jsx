import React from 'react'
import { Form, redirect } from 'react-router-dom'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const updateReadingProgressAction = async ({ request }) => {
	const formData = await request.formData()
	const bookId = formData.get('bookId')
	const progress = formData.get('progress')
	const token = localStorage.getItem('accessToken')
	await fetch(`http://localhost:8081/api/progress/${bookId}`, {
		method: request.method,
		headers: {
			Authorization: `basic ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ currentPage: progress }),
	})
	return redirect('/lists/1')
}

const UpdateReadingProgress = ({ bookId, pageCount }) => {
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
			<button type='submit'>Save</button>
		</Form>
	)
}

export default UpdateReadingProgress