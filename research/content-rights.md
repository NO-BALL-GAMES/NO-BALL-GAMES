---
// research/content-rights.md
title: Content Rights & Licensing
---

# Content Rights & Licensing Policy

This document outlines copyright, licensing, image rights, and content attribution practices for the Charlie Buster / Grime Art archive site.

## Third-Party Copy Policy

### What We Do NOT Do

- **No full article reproduction:** We do not copy complete articles or large blocks of copyrighted text from external sources.
- **No verbatim content:** We do not reproduce entire sections from other websites, publications, or platforms.
- **No reposting:** This is not a content aggregation site or news feed.

### What We DO Do

- **Paraphrase with attribution:** When summarizing information from sources, we rephrase in our own language and cite the source.
- **Brief quotation:** We use short, direct quotes (typically 1-3 sentences) only when necessary to preserve exact meaning or for emphasis. All quotations are attributed.
- **Link to original:** We link to original sources so readers can access the complete material if desired.

### Examples

#### ✗ What NOT to Do
```
[From external source]
"Charlie Buster is a street artist based in Maidstone, Kent, 
who joined Saatchi Art in 2017. He has worked with Graffiti 
Kings London Collective and is known for his bold, vibrant 
graffiti and mural work."

[On our site - WRONG]
Charlie Buster is a street artist based in Maidstone, Kent, 
who joined Saatchi Art in 2017. He has worked with Graffiti 
Kings London Collective and is known for his bold, vibrant 
graffiti and mural work.
```

#### ✓ What TO Do
```
[Our site - CORRECT]
According to his Saatchi Art profile, Charlie Buster joined 
the platform in 2017 and is based in Maidstone, Kent. He 
trained through apprenticeship with Graffiti Kings London, 
a studio collective rooted in graffiti discipline.
```

## Image Rights Policy

### Artwork & Artist Images

**No hotlinking:** We do not display copyrighted artwork or photographs by pulling them from external websites.

**User-supplied images only:** Any artwork images on this site are:
- Rights-cleared by the artist (Charlie Buster)
- Stored locally in `public/images/supplied/`
- Properly credited and attributed
- Used with explicit permission

### Image Attribution Format

```markdown
Image: [artwork title]
Artist: Charlie Buster
Medium: [medium used]
Year: [year created]
Credit: [photographer/source]
Rights: © Charlie Buster [year]. Used with permission.
```

### Placeholder Images

- Placeholder artwork uses **SVG graphics** generated for development
- Placeholders are clearly labeled as placeholders
- Placeholders will be replaced with real artwork as it becomes available
- Location: `public/images/placeholders/`

### Texture & Background Assets

- **SVGs generated:** Background textures and noise patterns are original SVG creations
- **No stock images:** We do not use stock photography or free image repositories
- **Minimal raster:** Large raster images are avoided for performance reasons

## Attribution Standards

### For Third-Party Sources

When referencing information from external sources:

1. **Include source name** – Article title, publication, platform
2. **Include URL** – Direct link to original source
3. **Include access date** – When the source was verified
4. **Use conditional language** – "According to," "Public profiles state," "Listed as"
5. **Avoid false authority** – Do not present third-party claims as facts unless independently verified

### For Artist-Provided Material

When using statements or information directly from Charlie Buster:

1. **Label as artist-provided** – "According to Charlie Buster's artist-provided account..."
2. **Preserve quotes exactly** – Never paraphrase direct artist statements
3. **Note uncertainty** – If unverified by external sources, say so
4. **Link to official domain** – Reference grimeartist.com as primary source

### For Public Profiles

When using information from public platforms (Saatchi Art, Instagram, Medium):

1. **Cite the platform** – "According to his Saatchi Art profile..."
2. **Note self-presentation** – Acknowledge that profile info is artist-controlled
3. **Provide link** – Direct to public profile
4. **Verify cross-platform** – If possible, confirm through multiple sources

## What Can Be Reused Verbatim

### Artist's Own Words

- Direct quotes from Charlie Buster (with attribution)
- Statements from official artist accounts
- Artist-provided biographical information
- Manifesto and artistic declarations

### Public Domain Material

- Historical facts and dates (once sourced)
- General knowledge information
- Publicly stated positions and statements

### Licensed Content

- Content explicitly licensed under Creative Commons or similar
- (Clearly marked with license type and attribution requirements)

## What Requires Permission

- Copyrighted artwork and photographs
- Substantial excerpts from articles (>3 sentences)
- Interviews or statements from third parties
- Commercial or business content from other organizations
- Social media posts or content (even if public)

## Correction & Update Policy

### Adding New Images

1. Obtain rights-cleared image from artist or licensed source
2. Place in `public/images/supplied/[descriptive-name].[format]`
3. Add to relevant MDX/Astro file with complete attribution
4. Include usage rights statement
5. Update image README in `public/images/`

### Updating Incorrect Information

1. Identify the error and source
2. Update the relevant page/file
3. Add entry to `research/correction-log.md`
4. If third-party source was wrong, note and link to correct source
5. If own error, document the correction

### Adding New Sources

1. Verify the source is legitimate and accessible
2. Add to `src/data/sources.ts`
3. Add to research files with access date and verification status
4. Update `research/claim-register.md` if relevant
5. Update any pages that could use this new source

## License Summary

### Site Code & Design
- **License:** MIT
- **Status:** Open-source, available for reference and reuse
- **Attribution:** "Built with Astro" appreciated but not required

### Written Content
- **Original analysis:** © 2026 NO BALL GAMES Organization
- **Paraphrased from sources:** Attributed to source
- **Direct quotes:** Attributed to author/source
- **Artist statements:** © Charlie Buster, used with permission

### Artist Content & Images
- **Artwork images:** © Charlie Buster, rights reserved
- **Artist statements:** © Charlie Buster, rights reserved
- **Usage:** Contact grimeartist.com for licensing

### Texture & Design Assets
- **SVGs:** Original work, open for reference
- **Favicon & branding:** © NO BALL GAMES, associated with site only

## Questions About Rights?

- **For site code:** See LICENSE file in repository
- **For artist content:** Contact grimeartist.com
- **For specific images:** Check image attribution notes
- **For content corrections:** See /contact/ or /colophon/

## Responsibility

Everyone maintaining this site is responsible for:
- Not copying copyrighted material
- Properly attributing all sources
- Using only rights-cleared images
- Updating this policy as content evolves
- Documenting any corrections or updates

Transparency about sources and rights is core to this archive's credibility.
