import * as React from "react"
import type { PageProps, GetServerData } from "gatsby"
import { BuilderComponent, builder } from "@builder.io/react"

builder.init(process.env.BUILDER_API_KEY!);

const BuilderPage: React.FC<PageProps<_, _, _, { content: any }>> = ({ serverData }) => {
  return (
    <BuilderComponent
      content={serverData?.content}
      model="page"
    />
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