import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function () {
  const { getAccessTokenSilently } = useAuth0()
  const [text, setText] = useState('')
  const [url, setUrl] = useState(null)
  const [comments, setComments] = useState([])

  const fetchComment = async () => {
    const query = new URLSearchParams({ url })
    const newURL = `/api/comment?${query.toString()}`
    const response = await fetch(newURL, {
      method: 'GET'
    })
    const data = await repsonse.json()
    setComments(data)
  }

  useEffect(() => {
    if (!url) return fetchComment()
  }, [URL])

  useEffect(() => {
    const url = window.location.origin + window.location.pathname
    setUrl(url)
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    const userToken = await getAccessTokenSilently()

    const repsonse = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ text, userToken, url: 'http://' }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    fetchComment()
    setText('')
  }

  return [comments, onSubmit, text, setText]
}
