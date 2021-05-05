/** Supported theme options. */
export interface ThemeOptions {
  /** Set this flag to true if gatsby-plugin-mdx is already configured for your site.  */
  mdxOtherwiseConfigured: boolean;
}

/** Options can include unsupported theme options that are passed into templates. */
export type Options = { [key: string]: any };
