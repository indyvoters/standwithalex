import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { getUrgentBand } from '@/functions/urgentBand'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  loader: async () => {
    return { urgentBand: await getUrgentBand() }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content: 'Alex Cabrera for Lieutenant Governor of Illinois. Join the mission for 5% of the vote to reclaim independent leadership, lift burdens, and protect God-given rights through the Independence Party.',
      },
      {
        title: 'Alex Cabrera | Lieutenant Governor for Illinois',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Alex Cabrera for Lieutenant Governor',
      },
      {
        property: 'og:title',
        content: 'Alex Cabrera | Lieutenant Governor for Illinois',
      },
      {
        property: 'og:description',
        content: 'Alex Cabrera for Lieutenant Governor of Illinois. Join the mission for 5% of the vote to reclaim independent leadership, lift burdens, and protect God-given rights through the Independence Party.',
      },
      {
        property: 'og:image',
        content: 'https://standwithalex.com/fb-meta.jpg',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:url',
        content: 'https://standwithalex.com',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Alex Cabrera | Lieutenant Governor for Illinois',
      },
      {
        name: 'twitter:description',
        content: 'Alex Cabrera for Lieutenant Governor of Illinois. Join the mission for 5% of the vote to reclaim independent leadership, lift burdens, and protect God-given rights through the Independence Party.',
      },
      {
        name: 'twitter:image',
        content: 'https://standwithalex.com/meta-img.jpg',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-96x96.png',
        sizes: '96x96',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: () => <div className="p-20 text-center text-2xl font-bold">Page Not Found</div>,
})

function RootDocument({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7ZV6S3VW2P"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-7ZV6S3VW2P');
            `,
          }}
        />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </head>
      <body>

        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
