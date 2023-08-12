import React from 'react'
import { useLoaderData } from 'react-router-dom'

import { getEventTitle } from './lib/events'

/**
 * @type {import('react-router-dom').LoaderFunction}
 */
export const eventsLoader = () => {
	const events = [
		{
			eventName: 'list_create',
			eventParams: {
				listId: 10,
				listName: 'Wishlist',
			},
			insertAt: 1691856790274,
		},
		{
			eventName: 'list_delete',
			eventParams: {
				listId: 10,
				listName: 'Wishlist',
			},
			insertAt: 1691856947007,
		},
		{
			eventName: 'list_delete',
			eventParams: {
				listId: 10,
				listName: 'Wishlist',
			},
			insertAt: 1691856947778,
		},
		{
			eventName: 'list_create',
			eventParams: {
				listId: 10,
				listName: 'Wishlist',
			},
			insertAt: 1691857577360,
		},
		{
			eventName: 'list_rename',
			eventParams: {
				listOldName: 'Wishlist',
				listNewName: 'My Wishlist',
			},
			insertAt: 1691857954033,
		},
		{
			eventName: 'book_in_list_add',
			eventParams: {
				bookTitle: 'Einstein',
				listName: 'My Wishlist',
			},
			insertAt: 1691858334639,
		},
		{
			eventName: 'reading_progress_update',
			eventParams: {
				bookTitle: 'Einstein',
				currentPage: 30,
				totalPages: 704,
			},
			insertAt: 1691858584413,
		},
	]
	return events.sort((a, b) => a.insertAt < b.insertAt)
}

export default function Index() {
	const events = useLoaderData()
	return (
		<div>
			<h1>Home</h1>
			{events &&
				events.map(event => (
					<p>
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
