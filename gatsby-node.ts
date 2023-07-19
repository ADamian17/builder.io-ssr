import path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import { builder } from '@builder.io/react';

builder.init(process.env.GATSBY_BUILDER_API_KEY!);

// Create blog pages dynamically
export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;

  const pageTemplate = path.resolve(`src/templates/builder-page/index.tsx`);
  const pageNoSsrTemplate = path.resolve(
    `src/templates/builder-page-no-ssr/index.tsx`
  );

  const pagesSsr = await builder.getAll('page', {
    // We only need the URL field
    fields: 'data.url',
    options: { noTargeting: true },
  });

  const pagesNoSsr = await builder.getAll('page-no-ssr', {
    // We only need the URL field
    fields: 'data.url',
    options: { noTargeting: true },
  });

  pagesSsr.forEach((page) => {
    createPage({
      path: page?.data?.url,
      component: pageTemplate,
      context: {
        urlPath: page?.data?.url,
      },
    });
  });

  pagesNoSsr.forEach((page) => {
    createPage({
      path: page?.data?.url,
      component: pageNoSsrTemplate,
      context: {
        urlPath: page?.data?.url,
      },
    });
  });
};
