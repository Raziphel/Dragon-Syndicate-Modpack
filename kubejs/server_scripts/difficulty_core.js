// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// Difficulty Core & Globals
// ────────────────────────────────────────────────

// Global difficulty stage order
global.difficultyStages = [
    'peaceful',
    'easy',
    'normal',
    'hard',
    'brutal',
    'nightmare',
    'torment',
    'oblivion'
];

// Stage display colors
global.stageColors = {
    peaceful:   '§2', // Dark green
    easy:       '§a', // Light green
    normal:     '§e', // Yellow
    hard:       '§6', // Gold
    brutal:     '§c', // Red
    nightmare:  '§4', // Dark red
    torment:    '§5', // Dark purple
    oblivion:   '§0'  // Black
};

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
