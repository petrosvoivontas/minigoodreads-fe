import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import RootIndex from './RootIndex'
import Root, { listsLoader } from './Root'
import ErrorPage from './ErrorPage'
import Login, { action as loginAction } from './Login'
import BooksInList, { loader as booksInListLoader } from './BooksInList'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: listsLoader,
		children: [
			{ index: true, element: <RootIndex /> },
			{
				path: '/lists/:id',
				element: <BooksInList />,
				loader: booksInListLoader,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
		action: loginAction,
		errorElement: <div>Oops! There was an error</div>,
	},
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
