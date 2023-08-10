import React from 'react'
import { Form, Link, NavLink, Outlet, redirect, useLoaderData } from 'react-router-dom'

export const listsLoader = async () => {
	const token = localStorage.getItem('accessToken')
	if (token === null) {
		return []
	}
	try {
		const response = await fetch('http://localhost:8081/api/lists', {
			headers: {
				authorization: `basic ${token}`
			}
		})
		const jsonResponse = await response.json()
		return jsonResponse.data
	} catch {
		return []
	}
}

export const logoutAction = () => {
	localStorage.removeItem('accessToken')
	return redirect('/')
}

const Root = () => {
	const lists = useLoaderData()
	const isLoggedIn = localStorage.getItem('accessToken') !== null
	return (
		<>
			<div id="sidebar">
				<h1>minigoodreads</h1>
				<div>
					<form id="search-form" role="search">
						<input
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
						/>
						<div id="search-spinner" aria-hidden hidden={true} />
						<div className="sr-only" aria-live="polite"></div>
					</form>
					{isLoggedIn ? (
						<>
							<Link to={'/lists/create'}>
								<button>New</button>
							</Link>
							<Form method='post'>
								<button type='submit'>Logout</button>
							</Form>
						</>
					) : (
						<Link to={'/login'}>
							<button>Login</button>
						</Link>
					)}
				</div>
				<nav>
					{lists.length ? (
						<ul>
							{lists.map(list => (
								<li key={list.listId}>
									<NavLink
										to={`/lists/${list.listId}`}
										className={({
											isActive,
											isPending,
										}) => {
											return isActive
												? 'active'
												: isPending
												? 'pending'
												: ''
										}}
									>
										{list.name}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No lists</i>
						</p>
					)}
				</nav>
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	)
}

export default Root
