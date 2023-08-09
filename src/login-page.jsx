import React from 'react'
import { redirect, useFetcher } from 'react-router-dom'

export const action = async ({ request }) => {
	const formData = await request.formData()
	const username = formData.get('username')
	const password = formData.get('password')
	console.log(username, password)
	const token = btoa(`${username}:${password}`)
	try {
		const response = await fetch('http://localhost:8081/api/auth/login', {
			headers: {
				authorization: `Basic ${token}`,
			},
		})
		if (response.ok) {
			const jsonResponse = await response.json()
			console.log(jsonResponse)
			localStorage.setItem('accessToken', token)
			return redirect('/')
		}
	} catch {}
}

const Login = () => {
	const fetcher = useFetcher()
	const loading = fetcher.state === 'submitting'
	return (
		<fetcher.Form method="post" id="contact-form">
			<label>
				<span>Username</span>
				<input placeholder="Username" type="text" name="username" />
			</label>
			<label>
				<span>Password</span>
				<input placeholder="Password" type="password" name="password" />
			</label>
			<p>
				<button type="submit" disabled={loading}>
					Login
				</button>
			</p>
		</fetcher.Form>
	)
}

export default Login
