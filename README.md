# @adaptive-ds/generate-image-list

> Stop manually typing image dimensions. Let your build do it for you.

Ever added a new image to your project, then had to manually open it in an image editor just to copy-paste its dimensions into your code? Yeah, we hated that too.

This tool automatically scans a directory of images and generates a typed TypeScript file with all the metadata you need.

## Features

- **Auto-detect dimensions** — Extracts width and height from any image
- **Type-safe output** — Generates TypeScript with full type inference
- **Preserves alt text** — Keeps existing alt text when regenerating
- **Sorted output** — Deterministic, sorted keys for clean diffs
- **Multi-format support** — jpg, png, gif, webp, avif, tiff, svg

## Installation

```bash
bun add @adaptive-ds/generate-image-list
```

## Usage

```typescript
import { generateImageList } from "@adaptive-ds/generate-image-list"

await generateImageList(
  "./images",           // directory to scan
  existingImages,       // existing image map (to preserve alt text)
  "./generated.ts",    // output file path
  "@/types"            // path to import ImageType from
)
```

This generates a file like:

```typescript
import type { ImageType from "@/types" }
// Auto-generated, manual changes will be lost
export const imageList = {
  hero_banner: {
    path: "hero-banner.png",
    width: 1920,
    height: 1080,
    alt: "hero banner",
    mimeType: "image/png",
  },
  logo: {
    path: "logo.svg",
    width: 200,
    height: 50,
    alt: "logo",
    mimeType: "image/svg+xml",
  },
} as const satisfies Record<string, ImageType>
```

## API

### `generateImageList(imageDirectory, existingImages, outputPath, imageTypeImportPath)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `imageDirectory` | `string` | Path to scan for images |
| `existingImages` | `Record<string, ImageType>` | Existing map to preserve alt text |
| `outputPath` | `string` | Where to write the generated file |
| `imageTypeImportPath` | `string` | Import path for the `ImageType` type |

### `ImageType`

```typescript
interface ImageType {
  path: string
  width: number
  height: number
  alt: string
  mimeType?: string
}
```

## Use with your existing images

If you already have an image list, pass it as the second argument to preserve alt text:

```typescript
import { generateImageList } from "@adaptive-ds/generate-image-list"
import { imageList as existingImages } from "./generated"

await generateImageList(
  "./images",
  existingImages,
  "./generated.ts",
  "@/types"
)
```

## License

MIT
