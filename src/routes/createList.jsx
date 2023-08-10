import React from "react"
import { Form, redirect } from "react-router-dom"

const FORM_DATA_NAME = 'name'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const createListAction = async ({ request }) => {
	const formData = await request.formData()
	const listName = formData.get(FORM_DATA_NAME)
	const token = localStorage.getItem('accessToken')
	const response = await fetch('http://localhost:8081/api/lists', {
		method: 'post',
		headers: {
			authorization: `basic ${token}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({ name: listName })
	})
	const jsonResponse = await response.json()
	const { listId } = jsonResponse.data
	return redirect(`/lists/${listId}`)
}

const CreateList = () => {
	return (
		<Form method="post" id="contact-form">
		  <p>
			<span>New Books list</span>
			<input
			  placeholder="Name"
			  aria-label="Books list name"
			  type="text"
			  name={FORM_DATA_NAME}
			/>
		  </p>
		  <p>
			<button type="submit">Create</button>
		  </p>
		</Form>
	  )
}

export default CreateList