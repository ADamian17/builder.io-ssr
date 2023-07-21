import * as React from "react"
import { type PageProps } from "gatsby"
import { BuilderComponent, builder } from "@builder.io/react"
import MainLayout from "../../layouts/MainLayout.index";

builder.init(process.env.GATSBY_BUILDER_API_KEY!);

type PageContextType = {
  urlPath: string;
}

const BuilderPageNoSsr: React.FC<PageProps> = ({ pageContext }) => {
  const [builderContent, setBuilderContent] = React.useState(null)

  React.useEffect(() => {
    builder
      .get('page-no-ssr', { url: (pageContext as PageContextType)?.urlPath })
      .promise()
      .then(setBuilderContent)
  }, [])

  return (
    <MainLayout>
      <BuilderComponent
        content={builderContent!}
        model="page-no-ssr"
      />
    </MainLayout>
  )
}

export default BuilderPageNoSsr;
