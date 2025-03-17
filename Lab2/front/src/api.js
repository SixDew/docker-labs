export async function sendCount(count, userId){
const response = await fetch(`${serverUrl}/${userId}?count=${count}`, {
    method: 'PUT',
    headers:{
        'Content-Type':'application/json'
    },
})
}

export async function LoginById(userId){
    const response = await fetch(`${serverUrl}/${userId}`)
    return response
}

export async function CreateUser(userId) {
    const response = await fetch(`${serverUrl}/${userId}`, {
        method: 'POST'
    })
    return response
}

const serverUrl = '/api'