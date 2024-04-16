import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useMemo } from "react";
export async function loader() {
  const convexUrl = process.env["CONVEX_URL"];
  if (!convexUrl) {
    throw new Error("CONVEX_URL environment variable is required");
  }
  return json({
    ENV: {
      CONVEX_URL: convexUrl,
    },
  });
}
export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();
  const convex = useMemo(
    () => new ConvexReactClient(loaderData.ENV.CONVEX_URL),
    [loaderData.ENV.CONVEX_URL]
  );
  return (
    <ConvexProvider client={convex}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ConvexProvider>
  );
}

export default function App() {
  return <Outlet />;
}
