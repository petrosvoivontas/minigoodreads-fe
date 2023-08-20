const backendHostname = process.env.REACT_APP_BACKEND_HOST
const backendPort = process.env.REACT_APP_BACKEND_PORT

export const baseUrl = `http://${backendHostname}:${backendPort}`
