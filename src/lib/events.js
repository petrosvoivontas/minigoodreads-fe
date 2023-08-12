const EVENT_LIST_CREATE = 'list_create'
const EVENT_LIST_DELETE = 'list_delete'
const EVENT_LIST_RENAME = 'list_rename'
const EVENT_BOOK_IN_LIST_ADD = 'book_in_list_add'
const EVENT_BOOK_IN_LIST_REMOVE = 'book_in_list_remove'
const EVENT_READING_PROGRESS_UPDATE = 'reading_progress_update'

/**
 * @typedef {('list_create' | 'list_delete' | 'list_rename' | 'book_in_list_add' | 'book_in_list_remove' | 'reading_progress_update')} EventName
 * @typedef {('listId' | 'listName' | 'listOldName' | 'listNewName' | 'bookTitle' | 'currentPage' | 'totalPages')} EventParamKey
 * @typedef {Record<EventParamKey, string>} EventParams
 */

/**
 * @param {number} time
 * @returns {string}
 */
const formatDate = time => {
	const formatter = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
	return formatter.format(time)
}

//#region getEventTitle
/**
 *
 * @param {EventName} eventName
 * @param {EventParams} eventParams
 * @param {number} time
 * @returns {string}
 */
export const getEventTitle = (eventName, eventParams, time) => {
	switch (eventName) {
		case EVENT_LIST_CREATE:
			return eventTitleForListCreate(eventParams, time)
		case EVENT_LIST_DELETE:
			return eventTitleForListDelete(eventParams, time)
		case EVENT_LIST_RENAME:
			return eventTitleForListRename(eventParams, time)
		case EVENT_BOOK_IN_LIST_ADD:
			return eventTitleForAddBookToList(eventParams, time)
		case EVENT_BOOK_IN_LIST_REMOVE:
			return eventTitleForRemoveBookFromList(eventParams, time)
		case EVENT_READING_PROGRESS_UPDATE:
			return eventTitleForUpdateReadingProgress(eventParams, time)
		default:
			break
	}
}

/**
 * @param {EventName} eventName
 * @param {EventParams} eventParams
 * @param {number} time
 * @returns {string}
 */
const eventTitleForListCreate = (eventParams, time) => {
	const listName = eventParams['listName']
	return `You created a list named "${listName}" at ${formatDate(time)}`
}

/**
 * @param {EventParams} eventParams
 * @param {number} time
 * @returns {string}
 */
const eventTitleForListDelete = (eventParams, time) => {
	const listName = eventParams['listName']
	return `You deleted a list named "${listName}" at ${formatDate(time)}`
}

/**
 * @param {EventParams} eventParams
 * @param {number} time
 * @returns {string}
 */
const eventTitleForListRename = (eventParams, time) => {
	const oldName = eventParams['listOldName']
	const newName = eventParams['listNewName']
	return `${oldName} renamed to ${newName} at ${formatDate(time)}`
}

/**
 * @param {EventParams} eventParams
 * @param {number} time
 * @returns {string}
 */
const eventTitleForAddBookToList = (eventParams, time) => {
	const bookName = eventParams['bookTitle']
	const listName = eventParams['listName']
	return `${bookName} added to ${listName} at ${formatDate(time)}`
}

/**
 * @param {EventParams} eventParams
 * @param {number} time
 * @returns {string}
 */
const eventTitleForRemoveBookFromList = (eventParams, time) => {
	const bookName = eventParams['bookTitle']
	const listName = eventParams['listName']
	return `${bookName} removed from list ${listName} at ${formatDate(time)}`
}

/**
 * @param {EventParams} eventParams
 * @param {number} time
 * @returns {string}
 */
const eventTitleForUpdateReadingProgress = (eventParams, time) => {
	const bookTitle = eventParams['bookTitle']
	const currentPage = eventParams['currentPage']
	const totalPages = eventParams['totalPages']
	return `You reached page ${currentPage} in "${bookTitle}" at ${formatDate(
		time
	)}. "${bookTitle}" has ${totalPages} pages in total`
}
//#endregion

//#region post events
/**
 *
 * @param {EventName} eventName
 * @param {EventParams} eventParams
 */
const postEvent = async (eventName, eventParams) => {
	const accessToken = localStorage.getItem('accessToken')
	await fetch('http://localhost:8081/api/event', {
		method: 'post',
		headers: {
			authorization: `basic ${accessToken}`,
			'content-type': 'application/json',
		},
		body: JSON.stringify({ eventName, eventParams }),
	})
}

export const listCreateEvent = async (listId, listName) => {
	await postEvent('list_create', {
		listName,
		listId,
	})
}

export const listDeleteEvent = async (listId, listName) => {
	await postEvent('list_delete', {
		listName,
		listId,
	})
}
//#endregion
