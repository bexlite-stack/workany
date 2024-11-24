export const TemplateBase = ({ children }: Html.PropsWithChildren) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <script src="https://unpkg.com/alpinejs" defer></script>
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>
        <script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/disable-element.js"></script>
        <link rel="stylesheet" href="/public/globals.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" rel="stylesheet"></link>
        <link rel="icon" type="image/png" href="/public/favico.ico" />
        <title>workany. - Find better workplace</title>
      </head>
      <body>
        <main class="min-h-screen flex flex-col justify-between">
          <div>{children}</div>
          <div class="p-8 border-t flex justify-between items-center">
            <div>
              This site is a demo of bexlite techstack.{" "}
              <a href="https://bexlite.dev" class="font-bold" target="_blank">
                bexlite.dev
              </a>
            </div>
            <div>All images credited to respected authors</div>
          </div>
        </main>
      </body>
    </html>
  );
};
