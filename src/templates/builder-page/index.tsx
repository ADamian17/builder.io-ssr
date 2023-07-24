import * as React from "react"
import { type PageProps, type GetServerData, Link, HeadProps } from "gatsby"
import { BuilderComponent, builder } from "@builder.io/react"

builder.init(process.env.GATSBY_BUILDER_API_KEY!);

type ServerDataType = {
  content: any
}

type SeoDataType = {
  seo: {
    title: string,
    description: string,
    index: boolean
  }
}

const BuilderPage: React.FC<PageProps> = ({ serverData }) => {
  return (
    <>
      <nav>
        <ul style={{ display: "flex", gap: 24 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blogs">blogs</Link></li>
          <li><Link to="/contact">Contacts</Link></li>
          <li><Link to="/page-no-ssr">Page No Ssr</Link></li>
        </ul>
      </nav>

      <BuilderComponent
        content={(serverData as ServerDataType)?.content}
        model="page"
      />
    </>
  )
}

export default BuilderPage

export const Head = (context: HeadProps) => {
  const seo = (context.pageContext as SeoDataType)?.seo

  return (
    <>
      <meta
        name="description"
        content={seo.description}
      />
      <meta
        name="robots"
        content={`max-snippet:-1, max-image-preview:large, max-video-preview:-1, ${seo.index ? "index,follow" : "noindex,nofollow"}`}
      />

      <title>{seo.title}</title>
    </>
  )
}

export const getServerData: GetServerData<ServerDataType> = async (context) => {
  const content = await builder.get('page', { url: context.pageContext?.urlPath as string }).promise();

  if (!content) return {
    status: 404
  }

  return {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=10, s-maxage=60, stale-while-revalidate=240',
    },
    props: { content }
  }
}