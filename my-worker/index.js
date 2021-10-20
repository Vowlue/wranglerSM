addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const path = request.url.split("/").at(-1)
  if (path === "posts") {
    if (request.method === "POST") {
      const { headers } = request
      const contentType = headers.get("content-type") || ""
      if (!(contentType && contentType.includes("application/json")))
        return new Response("Request content type must be JSON.") 
      const jsonBody = await request.json()
      if (!(jsonBody["title"] && jsonBody["username"] && jsonBody["content"]))
        return new Response("Request JSON must contain title, username and content fields.")
      try {
        await KV_2.put(`${jsonBody['title']}.${jsonBody['username']}`, jsonBody['content'])
        return new Response("Success.", {status: 200})
      }
      catch (err) {
        return new Response(`Error occurred while creating your post: ${err}`, {status: 500})
      }
        
    }
    else if (request.method === "GET") {
      try {
        const getPosts = await KV_2.list()
        const posts = []
        for (const key of getPosts.keys) {
          const content = await KV_2.get(key['name'])
          const [title, name] = key['name'].split('.')
          posts.push({
            username: name,
            title: title,
            content: content
          })
        }
        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        }
        return new Response(JSON.stringify(posts), { headers })
      }
      catch (err) {
        return new Response(`Error occurred while listing posts: ${err}`, {status: 500})
      }
    }
    return new Response("This route does not exist.")
  }
  return new Response("This route does not exist.")
}
