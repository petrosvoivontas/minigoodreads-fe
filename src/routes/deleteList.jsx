import React from 'react'
import { Form, Link, Navigate, redirect, useParams } from 'react-router-dom'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const deleteListAction = async ({ params }) => {
	const { id: listId } = params

	// Only user-created lists can be deleted
	if (listId < 10) {
		return redirect(`/lists/${listId}`)
	}

	const token = localStorage.getItem('accessToken')
	await fetch(`http://localhost:8081/api/lists/${listId}`, {
		method: 'delete',
		headers: {
			authorization: `basic ${token}`
		}
	})
	return redirect('/')
}

const DeleteList = () => {
	const { id: listId } = useParams()

	return (
		<div>
			{/* Only user-created lists can be deleted */}
			{listId < 10 && (
				<Navigate to={`/lists/${listId}`} />
			)}
			<p>Are you sure you want to delete this list?</p>
			<Form method='post'>
				<button type='submit'>Yes</button>
			</Form>
			<Link to={`/lists/${listId}`}>
				<button>Cancel</button>
			</Link>
		</div>
	)
}

export default DeleteList
