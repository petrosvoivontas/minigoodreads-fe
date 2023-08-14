import React from "react"
import { Form, useActionData, useNavigation } from "react-router-dom"

const FORM_DATA_USERNAME = 'username'
const FORM_DATA_PASSWORD = 'password'

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const addAdminAction = async ({ request }) => {
	const accessToken = localStorage.getItem('accessToken')
	const formData = await request.formData()
	const username = formData.get(FORM_DATA_USERNAME)
	const password = formData.get(FORM_DATA_PASSWORD)
	const response = await fetch('http://localhost:8081/api/auth/admin', {
		method: 'post',
		headers: {
			authorization: `basic ${accessToken}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	})
	const jsonResponse = await response.json()
	if (jsonResponse.errorMessage) {
		return jsonResponse.errorMessage
	}
	return `Successfully created admin "${username}"`
}

const AddAdmin = () => {
	const message = useActionData()
	const navigation = useNavigation()
	const loading = navigation.state === 'submitting' || navigation.state === 'loading'

	return (
		<div>
			{message && <p>{message}</p>}
			<h1>New admin user</h1>
			<Form method="post" id="contact-form">
				<label>
					<span>Username</span>
					<input placeholder="Username" type="text" name={FORM_DATA_USERNAME} required minLength={1} />
				</label>
				<label>
					<span>Password</span>
					<input placeholder="Password" type="password" name={FORM_DATA_PASSWORD} required minLength={1} />
				</label>
				<p>
					<button type="submit" disabled={loading}>
						Register
					</button>
				</p>
			</Form>
		</div>
	)
}

export default AddAdmin