# Audio credits

## night-loop.ogg / night-loop.mp3

Ambient night-field insect chorus for the Among Trees storybook ambient-audio toggle.

**Attribution is REQUIRED and must be rendered on the live site.** Pixabay's
Content License requires visible credit for this asset. Paste this block verbatim
into the site colophon/footer, and keep it reachable from the page that plays the
audio (the ambient toggle in Chapter navigation):

```html
Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=59653">freesound_community</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=59653">Pixabay</a>
```

> The doubled slash in the second URL is how Pixabay generates the snippet. Left
> verbatim on purpose; do not "fix" it.

### Source

| | |
|---|---|
| Original file | `freesound_community-180831-night-field-insects-chorus-crickets-traffic-pec-59653.mp3` |
| Author | freesound_community (Pixabay user 46691455) |
| Origin | Pixabay, content id `59653` |
| Original master | kept in the Septentrion vault at `Constellations\` — not committed here |
| Original specs | 141.2 s · 24 kHz stereo · 160 kbps · 2.69 MB |

### What was done to it

The source is **not loop-safe as delivered**: it fades in over the first ~5 s and
fades out at the tail (measured mean level −49.4 dB at t=0 and −45.7 dB at t=140 s,
against a steady −33 dB body). Looped raw it dips to near-silence every pass.

Processing applied with ffmpeg:

1. Trimmed to body only, discarding both fades — kept source `[6 s, 106 s]`.
2. Split that at its midpoint (source t=56 s) and **swapped the halves**, crossfading
   the new junction over 4 s (triangular curve). This makes the loop point an
   *interior* moment of the original recording, so it is continuous by construction.
3. Encoded to MP3 96 kbps and OGG Vorbis q2. Result: 96.0 s.

**Verified seam:** concatenated the loop with itself and measured 1 s windows across
the junction — −32.9 / −32.7 / −32.6 dB versus a −32.4 dB control elsewhere in the
file. Under 0.6 dB variation, i.e. inaudible. No dip, no click.

Levels were deliberately **not** normalized; this is a background bed and the page
controls playback volume.

### Known caveat

The source filename includes `traffic`, and faint road noise may be present in the
bed. It was not removed. Give it a listen on speakers before ship; if it reads as
traffic rather than night-field, this asset needs replacing rather than filtering.

### Playback requirements (Phase 5.3)

- Default **off**, choice persisted, no autoplay (iOS blocks it anyway).
- Labeled, keyboard-reachable control.
- Degrade gracefully if the files are absent.
- Serve `.ogg` first with `.mp3` fallback — the ogg is 714 KB vs 1.1 MB.
- Never counted against the initial payload budget; load on first play, not on page load.
