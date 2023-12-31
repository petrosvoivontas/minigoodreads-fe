import React from 'react'
import { Form, Link, NavLink, Outlet, redirect, useLoaderData } from 'react-router-dom'
import { isAdmin } from '../lib/auth'
import { baseUrl } from '../lib/api'

export const listsLoader = async () => {
	if (isAdmin()) {
		return []
	}
	const token = localStorage.getItem('accessToken')
	if (token === null) {
		return []
	}
	try {
		const response = await fetch(`${baseUrl}/api/lists`, {
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
	localStorage.clear()
	return redirect('/')
}

const Root = () => {
	const lists = useLoaderData()
	const isLoggedIn = localStorage.getItem('accessToken') !== null
	const userIsAdmin = isAdmin()
	return (
		<>
			<div id="sidebar">
				<h1>minigoodreads</h1>
				<div>
					{userIsAdmin ? (
						<>
							<Link to={'/addAdmin'}>
								<button>New admin</button>
							</Link>
							<Form method='post'>
								<button type='submit'>Logout</button>
							</Form>
						</>
					) : isLoggedIn ? (
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
					<NavLink
						to={'/'}
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
						Home
					</NavLink>
					{userIsAdmin && (
						<NavLink
							to={'/users'}
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
							Users
						</NavLink>
					)}
					{!userIsAdmin && (
						<NavLink
							to={'/search'}
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
							Search
						</NavLink>
					)}
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
