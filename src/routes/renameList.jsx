import React from "react"
import { Form, redirect } from "react-router-dom"

const FORM_DATA_NAME = 'name'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const renameListAction = async ({ request, params }) => {
	const { id: listId } = params
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
	return (
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
	)
}

export default RenameList