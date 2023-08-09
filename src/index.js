import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import RootIndex from './RootIndex'
import Root, { listsLoader } from './routes/root'
import ErrorPage from './error-page'
import Login, { action as loginAction } from './login-page'
import BooksInList, { loader as booksInListLoader } from './routes/booksInList'

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
