import * as React from 'react';
import type { WrapPageElementBrowserArgs } from 'gatsby';
import { builder } from "@builder.io/react"

builder.init(process.env.BUILDER_API_KEY!);

const PageWrapper = ({ element, props }: WrapPageElementBrowserArgs) => {
  return <div {...props}>{element}</div>
}

export default PageWrapper