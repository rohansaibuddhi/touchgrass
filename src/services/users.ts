const baseUrl = '/api/users'

export const fetchUser = async () => {
    const response = await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Failed to fetch activities')
    }
    return response.json()
}