import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'

export default function Post({ post }) {
  console.log(post)

  const content = useHydrate(post, {
    components: mdxComponents
  })

  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold dark:text-highlight">
          {post.frontMatter.title}
        </h1>
        <p className="dark:text-gray-400 mt-2">{post.frontMatter.excerpt}</p>
        <hr className="my-4" />
        <div className="dark:text-gray-400">{content}</div>
      </article>
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
