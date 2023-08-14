import React from "react";
import { Form, useLoaderData } from "react-router-dom";

/**
 * @typedef {{ username: string; enabled: boolean }} User
 */

/**
 * @type {import('react-router-dom'.LoaderFunction)}
 * @returns {User[]}
 */
export const usersLoader = async () => {
	const token = localStorage.getItem('accessToken')
	const response = await fetch('http://localhost:8081/api/auth/users', {
		headers: {
			authorization: `basic ${token}`
		}
	})
	const jsonResponse = await response.json()
	return jsonResponse.data.map(obj => ({
		username: obj.username,
		enabled: obj.enabled
	}))
}

/**
 * @type {import('react-router-dom'.ActionFunction)}
 */
export const changeStatusAction = async ({ request }) => {
	const token = localStorage.getItem('accessToken')
	const formData = await request.formData()
	const username = formData.get('username')
	console.log(username)
	await fetch(`http://localhost:8081/api/auth/${username}`, {
		method: request.method,
		headers: {
			authorization: `basic ${token}`,
			'content-type': 'application/json'
		}
	})
	return null
}

/**
 * 
 * @param {User}
 * @returns 
 */
const User = ({ username, enabled }) => {
	return (
		<div style={{
			display: 'flex',
			width: '100%',
			justifyContent: 'space-between'
		}}>
			<p>{username}</p>
			<Form method="PATCH">
				<input hidden readOnly name="username" value={username} />
				<button type="submit">{enabled ? 'Disable' : 'Enable'}</button>
			</Form>
		</div>
	)
}

const UsersList = () => {
	const users = useLoaderData()
	return (
		<div>
			<h1>Users</h1>
			{users && users.map((user, i) => <User key={i} {...user} />)}
		</div>
	)
}

export default UsersList