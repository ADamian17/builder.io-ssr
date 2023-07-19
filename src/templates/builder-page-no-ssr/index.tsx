import * as React from "react"
import { type PageProps, Link } from "gatsby"
import { BuilderComponent, builder } from "@builder.io/react"

builder.init(process.env.BUILDER_API_KEY!);

const BuilderPageNoSsr: React.FC<PageProps<_, { urlPath: string }>> = ({ pageContext }) => {
  const [builderContent, setBuilderContent] = React.useState(null)

  React.useEffect(() => {
    builder.get('page-no-ssr', { url: pageContext?.urlPath as string })
      .promise().then(setBuilderContent)
  }, [])

  return (
    <>
      <nav>
        <ul style={{ display: "flex", gap: 24 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blogs">blogs</Link></li>
          <li><Link to="/contact">Contacts</Link></li>
        </ul>
      </nav>

      <BuilderComponent
        content={builderContent!}
        model="page"
      />
    </>
  )
}

export default BuilderPageNoSsr;