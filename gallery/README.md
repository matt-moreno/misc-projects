# The Scrimba archive

A local gallery for the nine original projects in `misc-projects/`.

From the repository root, run:

```sh
npm install
npm start
```

Open **http://127.0.0.1:4173**. Stop the servers with Ctrl+C. Requires Node.js 18 or later. If one of the ports is busy, use `PORT=4193 npm start` and open the address printed in the terminal.

The gallery includes live thumbnails, search, category filters, a full-width/phone viewer, direct access to the early website’s extra exercises, and links to open each project in its own tab. The phone option changes the available width; it does not emulate a mobile browser or fix old layouts.

## Preservation

All archive code is in `gallery/`, `scripts/`, and the root package files. Nothing inside `misc-projects/` is rewritten. Static projects are served directly from their original folders. The two React projects are compiled in memory using the root dependencies, and their entry HTML is adapted only in the HTTP response. No installation or build output is written into an original project.

The gallery listens on the selected port; each project uses a separate loopback port immediately above it (4174–4182 by default). This preserves root-relative paths and isolates browser storage and CSS. Only gallery files and the individual project folders are served, with hidden files, parent traversal, and out-of-folder symlinks blocked. All servers bind to 127.0.0.1 and are local to this computer.

Original behavior and limitations remain, including unfinished exercises, missing assets, external image links, fonts, and the movie API. The color generator has placeholder controls; the blackjack exercise also has no game script. The business card references a missing original Vite favicon. Some travel images may no longer load. These are preserved rather than repaired.

Project metadata and extra page links are listed in `gallery/projects.mjs`. Restart the server after changing that catalog or a React source file. Static project files are read on each request.

Run `npm run check` for syntax checks of the archive server and interface.
