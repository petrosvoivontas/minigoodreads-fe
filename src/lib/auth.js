export const isAdmin = () => {
	const roles = localStorage.getItem('roles')
	if (roles !== null) {
		const rolesArray = JSON.parse(roles)
		if (Array.isArray(rolesArray)) {
			return rolesArray.includes('ROLE_ADMIN')
		}
	}
	return false
}
