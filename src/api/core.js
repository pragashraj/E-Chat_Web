export const POST = (endpoint, requestBody = {}, authorization = null) => {
    const url = createRequestUrl(endpoint)
    const body = createRequestBody(requestBody)
    const headers = createRequestHeader(authorization)

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, { method: "POST", headers, body })
        const data = await response.json()
        if (response.status >= 400) {
          reject(data)
        }
        resolve(data)
      } 
      catch (err) {
        reject(err)
      }
    })
}
  
export const GET = (endpoint, authorization = null) => {
    const url = createRequestUrl(endpoint)
    const headers = createRequestHeader(authorization)

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, { method: "GET", headers })
        const data = await response.json()
        if (response.status >= 400) {
          reject(data)
        }
        resolve(data)
      } 
      catch (err) {
        reject(err)
      }
    })
}
  
export const PUT = (endpoint, requestBody = {}, authorization) => {
    const url = createRequestUrl(endpoint)
    const body = createRequestBody(requestBody)
    const headers = createRequestHeader(authorization)
  
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, { method: "PUT", headers, body })
        const data = await response.json()
        if (response.status >= 400) {
          reject(data)
        }
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
}

export const MULTIPART = (endpoint, formData, authorization) => {
  const url = createRequestUrl(endpoint)

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        url,
        {
          method: 'post',
          body: formData,
          headers: {
            Authorization: `Bearer ${authorization}`
          },
        }
      )
      const data = await response.json()
      if (response.status >= 400) {
        reject(data)
      }
      resolve(data)
    } 
    catch (err) {
      reject(err)
    }
  })
}
  
const createRequestUrl = (endpoint) => {
    return `http://localhost:9000/api/v1.0/${endpoint}`
}
  
const createRequestBody = (requestBody) => {
    return JSON.stringify(requestBody)
}
  
const createRequestHeader = (authorization) => {
    return authorization ? 
    {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authorization}`,
    }
    : 
    {
        "Content-Type": "application/json",
    }
}