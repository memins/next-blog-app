import { nanoid } from 'nanoid'

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
    res.json(comment)
  }

  if (req.status === 'GET') {
    res.status(200).json({ name: 'John Doe' })
  }
}
