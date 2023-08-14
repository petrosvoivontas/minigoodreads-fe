import React from 'react'
import { useLoaderData } from 'react-router-dom'

import { getEventTitle } from './lib/events'
import { isAdmin } from './lib/auth'

/**
 * @type {import('react-router-dom').LoaderFunction}
 */
export const eventsLoader = async () => {
	if (isAdmin()) {
		return []
	}
	const accessToken = localStorage.getItem('accessToken')
	if (accessToken === null) {
		return []
	}
	const response = await fetch('http://localhost:8081/api/event', {
		headers: {
			authorization: `basic ${accessToken}`,
		},
	})
	const jsonResponse = await response.json()
	return jsonResponse.data.sort((a, b) => a.insertAt < b.insertAt)
}

export default function Index() {
	const events = useLoaderData()
	return (
		<div>
			<h1>Home</h1>
			{events &&
				events.map((event, i) => (
					<p key={i}>
						{getEventTitle(
							event.eventName,
							event.eventParams,
							event.insertAt
						)}
					</p>
				))}
		</div>
	)
}
