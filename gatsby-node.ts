import path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';

builder.init(process.env.BUILDER_API_KEY!);

// Create blog pages dynamically
export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;

  const pageTemplate = path.resolve(`src/templates/builder-page/index.tsx`);

  const pages = await builder.getAll('page', {
    // We only need the URL field
    fields: 'data.url',
    options: { noTargeting: true },
  });

  pages.forEach((page) => {
    createPage({
      path: page?.data?.url,
      component: pageTemplate,
      context: {
        urlPath: page?.data?.url,
      },
    });
  });
};
