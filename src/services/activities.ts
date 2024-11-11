const baseUrl = '/api/activities'

export const fetchActivities = async () => {
    const response = await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json()
}