import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import Form from '../../components/form'
import Comment from '../../components/comments'
import { DateTime } from 'luxon'

export default function Post({ post }) {
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

  const content = useHydrate(post, {
    components: mdxComponents
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

  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold dark:text-highlight">
          {post.frontMatter.title}
        </h1>
        <p className="mt-2 dark:text-gray-400">{post.frontMatter.excerpt}</p>
        <hr className="my-4" />

        <div className="prose dark:text-gray-400">{content}</div>
      </article>

      <Form onSubmit={onSubmit} setText={setText} text={text} />
      <Comment comments={comments} />
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths('post'),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const post = await getMdxNode('post', context)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}
