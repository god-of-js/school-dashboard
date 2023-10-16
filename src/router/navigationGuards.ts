export function userIsLoggedIn() {
    return !!localStorage.getItem('uid')
}