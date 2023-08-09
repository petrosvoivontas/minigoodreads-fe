import React from 'react'
import { Form, Link, NavLink, Outlet, redirect, useLoaderData } from 'react-router-dom'

export const listsLoader = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([
				{
					resourceId: '19c6aca9-9101-49ae-8b27-8f93127af4af',
					listId: 0,
					name: 'Want to read',
				},
				{
					resourceId: 'edf4977d-1eb2-475c-8a2c-af6243d94c3f',
					listId: 1,
					name: 'Currently reading',
				},
				{
					resourceId: '9c83c19c-8543-4669-a8d3-ded55ca07710',
					listId: 2,
					name: 'Read',
				},
			])
		}, 2000)
	})

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
						<Form method='post'>
							<button type='submit'>Logout</button>
						</Form>
					) : (
						<button>
							<Link to={'/login'}>Login</Link>
						</button>
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
