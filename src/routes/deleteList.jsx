import React from 'react'
import { Form, Link, Navigate, redirect, useParams, useRouteLoaderData } from 'react-router-dom'
import { listDeleteEvent } from '../lib/events'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const deleteListAction = async ({ params, request }) => {
	const { id: listId } = params
	const formData = await request.formData()
	const listName = formData.get('listName')

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

	// post event
	await listDeleteEvent(listId, listName)

	return redirect('/')
}

const DeleteList = () => {
	const { id: listId } = useParams()
	const lists = useRouteLoaderData('root')
	const { name: listName } = lists.find(list => `${list.listId}` === listId)

	return (
		<div>
			{/* Only user-created lists can be deleted */}
			{listId < 10 && (
				<Navigate to={`/lists/${listId}`} />
			)}
			<p>Are you sure you want to delete this list?</p>
			<Form method='post'>
				<input hidden name='listName' value={listName} />
				<button type='submit'>Yes</button>
			</Form>
			<Link to={`/lists/${listId}`}>
				<button>Cancel</button>
			</Link>
		</div>
	)
}

export default DeleteList
