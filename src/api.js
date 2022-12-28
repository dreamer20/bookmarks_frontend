const rootUrl = 'http://localhost:8000'

export const api = {
    async getToken(username, password) {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)
        return await fetch(
            `${rootUrl}/login`,
            { body: params, method: 'POST' })
    },
    async registerUser(username, password, password2) {
        const params = {
            username: username,
            password: password,
            password2: password2
        }
        console.log(params)
        const headers = {
            'Content-type': 'application/json'
        }
        return await fetch(
            `${rootUrl}/register`,
            { body: JSON.stringify(params), method: 'POST', headers: headers }
        )
    },
    async addBookmark(url, token) {
        const params = {
            url: url
        }
        const headers = {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        return await fetch(
            `${rootUrl}/bookmarks/add`,
            { body: JSON.stringify(params), method: 'POST', headers: headers }
        )
    },
    async getBookmarks(token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        return await fetch(
            `${rootUrl}/bookmarks`,
            { method: 'GET', headers: headers }
        )
    },
    async deleteBookmark(token, bookmark_id) {
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        return await fetch(
            `${rootUrl}/bookmarks/${bookmark_id}`,
            { method: 'DELETE', headers: headers }
        )
    },
    async updateBookmark(token, bookmark) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
        return await fetch(
            `${rootUrl}/bookmarks/`,
            { method: 'PUT', body: JSON.stringify(bookmark), headers: headers }
        )
    }
}