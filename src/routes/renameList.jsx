import React from "react"
import { Form, Navigate, redirect, useParams, useRouteLoaderData } from "react-router-dom"
import { listRenameEvent } from "../lib/events"
import { baseUrl } from "../lib/api"

const FORM_DATA_OLD_NAME = 'oldName'
const FORM_DATA_NAME = 'name'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const renameListAction = async ({ request, params }) => {
	const { id: listId } = params

	// Only user-created lists can be renamed
	if (listId < 10) {
		return redirect(`/lists/${listId}`)
	}

	const formData = await request.formData()
	const oldName = formData.get(FORM_DATA_OLD_NAME)
	const newName = formData.get(FORM_DATA_NAME)
	const token = localStorage.getItem('accessToken')
	await fetch(`${baseUrl}/api/lists/${listId}`, {
		// PATCH is written in uppercase because the preflight CORS request
		// returns a list of allowed methods in uppercase
		method: 'PATCH',
		headers: {
			authorization: `basic ${token}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({ name: newName })
	})

	// post event
	await listRenameEvent(oldName, newName)

	return redirect(`/lists/${listId}`)
}

const RenameList = () => {
	const { id: listId } = useParams()
	const lists = useRouteLoaderData('root')
	const { name: oldName } = lists.find(list => `${list.listId}` === listId)
	return (
		<>
			{/* Only user-created lists can be renamed */}
			{listId < 10 && (
				<Navigate to={`/lists/${listId}`} />
			)}
			<Form method="post" id="contact-form">
			<p>
			  <span>New name</span>
			  <input
				placeholder="New name"
				aria-label="New books list name"
				type="text"
				name={FORM_DATA_NAME}
			  />
			  <input hidden name={FORM_DATA_OLD_NAME} value={oldName} />
			</p>
			<p>
			  <button type="submit">Rename</button>
			</p>
	  	</Form>
	  </>
	)
}

export default RenameList