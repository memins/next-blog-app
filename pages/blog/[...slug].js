import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import Form from '../../components/form'
import Comment from '../../components/comments'
import useComment from '../../hooks/useComment'

export default function Post({ post }) {
  const [comments, onSubmit, text, setText] = useComment()

  const content = useHydrate(post, {
    components: mdxComponents
  })

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
