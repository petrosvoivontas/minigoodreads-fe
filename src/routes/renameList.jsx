import React from "react"
import { Form, Navigate, redirect, useParams } from "react-router-dom"

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
	const newName = formData.get(FORM_DATA_NAME)
	const token = localStorage.getItem('accessToken')
	await fetch(`http://localhost:8081/api/lists/${listId}`, {
		// PATCH is written in uppercase because the preflight CORS request
		// returns a list of allowed methods in uppercase
		method: 'PATCH',
		headers: {
			authorization: `basic ${token}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({ name: newName })
	})
	return redirect(`/lists/${listId}`)
}

const RenameList = () => {
	const { id: listId } = useParams()
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
			</p>
			<p>
			  <button type="submit">Rename</button>
			</p>
	  	</Form>
	  </>
	)
}

export default RenameList