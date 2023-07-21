import * as React from "react"
import { graphql, type PageProps } from "gatsby"
import { BuilderComponent, builder } from "@builder.io/react"
import MainLayout from "../../layouts/MainLayout.index";

builder.init(process.env.GATSBY_BUILDER_API_KEY!);

type PageContextType = {
  allBuilderModels: any
}

const BuilderPageNoSsr: React.FC<PageProps<PageContextType>> = ({ data }) => {
  const models = data?.allBuilderModels;
  const page = models.onePageNoSsr?.content;

  return (
    <MainLayout>
      <BuilderComponent
        content={page}
        model="page-no-ssr"
      />
    </MainLayout>
  )
}

export default BuilderPageNoSsr;

export const pageQuery = graphql`
  query ($path: String!) {
    allBuilderModels {
      onePageNoSsr(target: { urlPath: $path }) {
        content
      }
    }
  }
`;