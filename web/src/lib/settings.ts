import { writable } from 'svelte/store';

export const Themes = {
	pink: 'Pink',
	brown: 'Brown',
	grey: 'Grey',
	orange: 'Orange',
} as const;
export type Theme = keyof typeof Themes;

function initialTheme(): Theme {
	const theme = localStorage.getItem('theme');
	if (theme && Object.keys(Themes).includes(theme)) {
		return theme as Theme;
	}
	return 'brown';
}

export const theme = writable<Theme>(initialTheme());
export const depth = writable(3);
export const enableQuiescence = writable(true);
export const showMaterialDifference = writable(false);
