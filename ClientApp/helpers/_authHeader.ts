export function authHeader() {
	// return auth header with jwt token
	// 	ensure all actions are done client side (prevent prerendering)
	if (typeof window !== 'undefined') {
		let user = JSON.parse(localStorage.getItem('user'));

		if (user && user.token) {
			return { 'Authorization': 'Bearer ' + user.token };
		} else {
			return {};
		}
	}
}