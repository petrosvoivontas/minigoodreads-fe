import React from 'react'
import { redirect, Form, useNavigation } from 'react-router-dom'
import { baseUrl } from '../lib/api'

const FORM_DATA_USERNAME = 'username'
const FORM_DATA_PASSWORD = 'password'
const FORM_DATA_AUTH_TYPE = 'auth-type'
const AUTH_TYPE_LOGIN = 'login'
const AUTH_TYPE_REGISTER = 'register'

const storeCredentials = (username, password) => {
	const token = btoa(`${username}:${password}`)
	localStorage.setItem('accessToken', token)
}

const storeRoles = (roles) => {
	localStorage.setItem('roles', JSON.stringify(roles))
}

const login = async (username, password) => {
	console.log('baseUrl', baseUrl)
	const token = btoa(`${username}:${password}`)
	const response = await fetch(`${baseUrl}/api/auth/login`, {
		headers: {
			authorization: `Basic ${token}`,
		},
	})
	if (response.ok) {
		const jsonResponse = await response.json()
		console.log(jsonResponse)
		storeCredentials(username, password)
		storeRoles(jsonResponse.data.roles)
	}
}

const register = async (username, password) => {
	await fetch(`${baseUrl}/api/auth/register`, {
		method: 'post',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	})
	storeCredentials(username, password)
}

/**
 * @type {import('react-router-dom').ActionFunction}
 */
export const action = async ({ request }) => {
	const formData = await request.formData()
	const username = formData.get(FORM_DATA_USERNAME)
	const password = formData.get(FORM_DATA_PASSWORD)
	const authType = formData.get(FORM_DATA_AUTH_TYPE)
	switch (authType) {
		case AUTH_TYPE_LOGIN:
			await login(username, password)
			break
		case AUTH_TYPE_REGISTER:
			await register(username, password)
			break
		default:
			break
	}
	return redirect('/')
}

const Login = () => {
	const navigation = useNavigation()
	const loading = navigation.state === 'submitting' || navigation.state === 'loading'

	return (
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
				<button type="submit" disabled={loading} name={FORM_DATA_AUTH_TYPE} value={AUTH_TYPE_LOGIN}>
					Login
				</button>
				<button type="submit" disabled={loading} name={FORM_DATA_AUTH_TYPE} value={AUTH_TYPE_REGISTER}>
					Signup
				</button>
			</p>
		</Form>
	)
}

export default Login
