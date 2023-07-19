import * as React from "react"
import { type PageProps, type GetServerData, Link } from "gatsby"
import { BuilderComponent, builder } from "@builder.io/react"

builder.init(process.env.BUILDER_API_KEY!);

const BuilderPage: React.FC<PageProps<_, _, _, { content: any }>> = ({ serverData }) => {
  return (
    <>
      <nav>
        <ul style={{ display: "flex", gap: 24 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blogs">blogs</Link></li>
          <li><Link to="/contact">Contacts</Link></li>
          <li><Link to="/page-no-ssr">/Page No Ssr</Link></li>
        </ul>
      </nav>

      <BuilderComponent
        content={serverData?.content}
        model="page"
      />
    </>
  )
}

export default BuilderPage

export const getServerData: GetServerData<{
  content: any
}> = async (context) => {
  const content = await builder.get('page', { url: context.pageContext?.urlPath as string }).promise();

  if (!content) return {
    status: 404
  }

  return {
    status: 200,
    props: { content }
  }
}