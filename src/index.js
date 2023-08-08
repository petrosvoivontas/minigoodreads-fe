import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
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
	},
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
