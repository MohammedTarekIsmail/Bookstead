# Bookstead

A personal reading tracker built with React Native and Expo. Search the Open Library
catalogue, scan a physical book's barcode to pull it up instantly, organise what you
find onto shelves, and track progress and ratings as you read.

All book data comes from the [Open Library API](https://openlibrary.org) — no API key
and no account required. Everything you save lives on the device.

## Features

- **Search** — full-text search over Open Library, plus daily / weekly / monthly
  trending carousels that fill the screen before you type anything.
- **Barcode scanner** — point the camera at a book's ISBN barcode and it looks the
  book up and opens its detail screen.
- **Shelves** — every book belongs to at most one shelf: *Want to Read*,
  *Currently Reading*, or *Finished*. Moving a book to *Finished* marks it 100% read.
- **Reading progress** — a 0–100% slider on books that are currently being read.
- **Star ratings** — rate a book once it's finished; the rating survives moving it
  between shelves.
- **Favourites** — a separate list from shelves, surfaced on the profile screen.
- **Profile** — per-shelf and total book counts, plus your favourites.
- **Dark mode** — follows the system appearance by default, overridable in Settings
  and remembered across launches.

## Tech stack

| | |
|---|---|
| Runtime | [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/), React Native 0.81, React 19 |
| Navigation | React Navigation 7 (native stack + bottom tabs) |
| Persistence | `@react-native-async-storage/async-storage` |
| Camera | `expo-camera` |
| Icons | `@expo/vector-icons` (Ionicons) |
| Data source | Open Library REST API |

New Architecture (Fabric/TurboModules) is enabled.

## Getting started

Requires Node.js 20+ and the Expo Go app (or a simulator/emulator) to run on a device.

```bash
npm install
npm start          # Metro + QR code for Expo Go
```

Or launch straight onto a platform:

```bash
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # browser (barcode scanning is unavailable here)
```

There is no `.env` file or configuration step — Open Library needs no credentials, and
the base URLs are hardcoded in [openLibrary.js](src/core/config/openLibrary.js).

The camera permission prompt string lives in [app.json](app.json) under the
`expo-camera` plugin config.

## Architecture

The project follows a feature-first clean architecture. Each feature under
[src/features/](src/features/) is a vertical slice with three layers, and dependencies
only ever point inward — presentation depends on domain, data implements domain, and
domain depends on nothing.

```
src/
├── core/
│   ├── config/       Open Library base URLs
│   ├── constants/    shelf definitions (key, label, icon)
│   ├── di/           injectionContainer.js — single place wiring every dependency
│   └── theme/        light/dark palettes + ThemeContext
├── features/
│   ├── search/       search + trending
│   ├── scanner/      ISBN barcode lookup
│   ├── bookDetail/   descriptions, shelf buttons, progress, rating, favourite
│   ├── shelves/      shelf membership, progress, ratings
│   ├── favourites/   favourites list
│   ├── profile/      reading stats
│   └── settings/     dark mode toggle, about
└── navigation/       RootNavigator (stack) + MainTabs (bottom tabs)
```

Inside a feature:

```
<feature>/
├── data/
│   ├── datasources/   raw I/O — fetch() against Open Library, or AsyncStorage
│   ├── models/        API response shapes, with a static fromJson
│   ├── mappers/       model → domain entity
│   └── repositories/  *RepositoryImpl — the domain contract, implemented
├── domain/
│   └── usecases/      one class per action, constructor-injected repository,
│                      single execute() method
└── presentation/
    ├── hooks/         state + use case calls; screens stay declarative
    ├── components/
    └── screens/
```

A few conventions worth knowing before you change things:

- **Use cases are instantiated once**, at module scope in
  [injectionContainer.js](src/core/di/injectionContainer.js), and imported directly by
  presentation hooks. Swapping a data source (say, AsyncStorage for a backend) means
  editing that one file.
- **The `Book` domain entity** (`{ id, title, authors, coverUrl, publishYear, genres }`)
  is what crosses layer boundaries. API-shaped data never reaches a screen; mappers
  convert it at the data layer edge.
- **AsyncStorage keys** are owned by their data source and nothing else knows them:
  `shelved-books` (`[{ book, shelf, progress, rating }]`), `favourite-books`
  (`[Book]`), and `theme-preference`.
- **Screens build their styles from the theme** via a `createStyles(colors)` function
  at the bottom of the file, called with the palette from `useTheme()`.
- **List-backed screens reload on focus** with `useFocusEffect`, so shelf and profile
  counts stay correct after edits made elsewhere in the app.

## Known limitations

- Data is device-local — there's no sync, backup, or export.
- No test suite yet.
- Open Library results are only as complete as that catalogue; some books have no
  cover, description, or subjects.
