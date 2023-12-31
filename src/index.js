import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import RootIndex, { eventsLoader } from './RootIndex'
import Root, { listsLoader, logoutAction } from './routes/root'
import ErrorPage from './error-page'
import Login, { action as loginAction } from './routes/login'
import BooksInList, {
	loader as booksInListLoader,
	removeBookFromListAction,
} from './routes/booksInList'
import CreateList, { createListAction } from './routes/createList'
import RenameList, { renameListAction } from './routes/renameList'
import DeleteList, { deleteListAction } from './routes/deleteList'
import Search, { loader as booksSearchLoader } from './routes/search'
import { addBookToListAction } from './routes/addBookToList'
import { updateReadingProgressAction } from './routes/updateReadingProgress'
import UsersList, { changeStatusAction, usersLoader } from './routes/users'
import AddAdmin, { addAdminAction } from './routes/addAdmin'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: listsLoader,
		action: logoutAction,
		id: 'root',
		children: [
			{
				index: true,
				element: <RootIndex />,
				loader: eventsLoader,
			},
			{
				path: '/search',
				element: <Search />,
				loader: booksSearchLoader,
			},
			{
				path: '/lists/create',
				element: <CreateList />,
				action: createListAction,
			},
			{
				path: '/lists/:id',
				element: <BooksInList />,
				loader: booksInListLoader,
				children: [
					{
						path: 'books/:bookId/delete',
						action: removeBookFromListAction,
					},
				],
			},
			{
				path: '/lists/:id/edit',
				element: <RenameList />,
				action: renameListAction,
			},
			{
				path: '/lists/:id/delete',
				element: <DeleteList />,
				action: deleteListAction,
			},
			{
				path: '/add-to-list',
				action: addBookToListAction,
			},
			{
				path: '/progress',
				action: updateReadingProgressAction,
			},
			{
				path: '/users',
				element: <UsersList />,
				loader: usersLoader,
				action: changeStatusAction,
			},
			{
				path: 'addAdmin',
				element: <AddAdmin />,
				action: addAdminAction,
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
