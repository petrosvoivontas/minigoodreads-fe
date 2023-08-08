import React from 'react'
import { Form, redirect } from 'react-router-dom'

export const action = async ({ request }) => {
	const formData = await request.formData()
	const username = formData.get('username')
	const password = formData.get('password')
	console.log(username, password)
	const token = btoa(`${username}:${password}`)
	const response = await fetch('http://localhost:8081/api/auth/login', {
		headers: {
			authorization: `Basic ${token}`,
		},
	})
	const jsonResponse = await response.json()
	console.log(jsonResponse)
	return redirect('/')
}

const Login = () => {
	return (
		<Form method="post">
			<input placeholder="Username" type="text" name="username" />
			<input placeholder="Password" type="password" name="password" />
			<button type="submit">Login</button>
		</Form>
	)
}

export default Login
