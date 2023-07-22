import React from "react"
import { type PageProps, type GetServerData, HeadProps } from "gatsby"
import { BuilderComponent, builder } from "@builder.io/react"
import MainLayout from "../../layouts/MainLayout.index";

builder.init(process.env.GATSBY_BUILDER_API_KEY!);

type ServerDataProps = {
  builderContent: any;
};

type SeoDataProps = {
  seo: {
    title: string;
    description: string;
    index: boolean;
  };
};

const BuilderPage: React.FC<PageProps> = ({ serverData }) => {
  const content = (serverData as ServerDataProps)?.builderContent;

  return (
    <MainLayout>
      <BuilderComponent
        content={content}
        model="page"
      />
    </MainLayout>
  )
}

export default BuilderPage

export const Head = (context: HeadProps) => {
  const seo = (context.pageContext as SeoDataProps)?.seo

  return (
    <>
      <meta
        key="desc"
        name="description"
        content={seo.description}
      />
      <meta
        name="robots"
        key="robots"
        content={`max-snippet:-1, max-image-preview:large, max-video-preview:-1, ${seo.index ? "index,follow" : "noindex,nofollow"}`}
      />

      <title>{seo.title}</title>
    </>
  )
}

export const getServerData: GetServerData<ServerDataProps> = async (context) => {

  const builderContent = await builder.get('page', { url: context.pageContext?.urlPath as string }).promise();
  console.log('loaded', builderContent);

  if (!builderContent) return {
    status: 404
  }

  return {
    status: 200,
    props: {
      builderContent
    }
  }
}