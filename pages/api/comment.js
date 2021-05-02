import { nanoid } from 'nanoid'
import Redis from 'ioredis'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url, userToken, text } = req.body
    res.status(200).json({ name: 'mes' })

    const userResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }
    )

    const user = await userResponse.json()

    const comment = {
      id: nanoid(),
      createAt: Date.now(),
      text,
      user: {
        name: user.name,
        picture: user.picture
      }
    }

    // redis connection
    let redis = new Redis(process.env.REDIS_URL)

    // redis write
    redis.lpush(url, JSON.stringify(comment))

    // redis quit
    redis.quit()

    // response
    res.status(200).json(comment)
  }

  if (req.status === 'GET') {
    const { url } = req.query

    let reid = new Redis(process.env.REDIS_URL)
    const comments = await redis.lrange(url, 0, -1)
    redis.quit()

    const data = comments.map((e) => JSON.parse(e))

    res.status(200).json(data)
  }
}
