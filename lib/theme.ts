import type { CharacterCategory } from '@prisma/client';

// Single source of truth for "per-category" accent colors used across cards,
// character detail pages, and stats charts. Keying by category means new
// submitted characters slot into an existing accent automatically instead of
// needing new design work.

export interface CategoryAccent {
  /** OKLCH color string, usable directly in inline styles or arbitrary Tailwind values */
  color: string;
  /** Same hue at lower lightness/chroma, for subtle backgrounds/gradients */
  soft: string;
}

export const CATEGORY_LABELS: Record<CharacterCategory, string> = {
  TV_SHOW: 'TV Show',
  ANIME: 'Anime',
  VIDEO_GAME: 'Video Game',
  COMIC_SUPERHERO: 'Comic/Superhero',
};

const CATEGORY_ACCENTS: Record<CharacterCategory, CategoryAccent> = {
  TV_SHOW: { color: 'oklch(0.72 0.17 300)', soft: 'oklch(0.72 0.17 300 / 0.15)' },
  ANIME: { color: 'oklch(0.72 0.19 350)', soft: 'oklch(0.72 0.19 350 / 0.15)' },
  VIDEO_GAME: { color: 'oklch(0.68 0.17 230)', soft: 'oklch(0.68 0.17 230 / 0.15)' },
  COMIC_SUPERHERO: { color: 'oklch(0.72 0.18 42)', soft: 'oklch(0.72 0.18 42 / 0.15)' },
};

// Fallback palette cycled through for any category value not explicitly
// listed above, so unexpected data still gets a stable, deterministic accent
// without needing a design update.
const FALLBACK_HUES = [300, 350, 230, 42, 170, 90];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getCategoryAccent(category: string): CategoryAccent {
  const known = CATEGORY_ACCENTS[category as CharacterCategory];
  if (known) return known;

  const hue = FALLBACK_HUES[hashString(category) % FALLBACK_HUES.length];
  return {
    color: `oklch(0.7 0.16 ${hue})`,
    soft: `oklch(0.7 0.16 ${hue} / 0.15)`,
  };
}

// Ordered palette for chart series (pie slices, bar fills) on the stats page,
// derived from the same category accents so charts and cards agree visually.
export const CHART_PALETTE = Object.values(CATEGORY_ACCENTS).map((accent) => accent.color);

export const CHART_TOOLTIP_STYLE = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--foreground)',
};
