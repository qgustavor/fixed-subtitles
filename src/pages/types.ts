// The `pageContext` that are available in both on the server-side and browser-side
export type PageContext = {
  Page: any
  pageProps?: any
  routeParams?: any
  documentProps?: {
    title?: string
    description?: string
  }
}
