// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// Difficulty Core & Global Utilities
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

// Capitalize helper
global.capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);


// Advance a player's difficulty stage
global.advanceDifficulty = (player) => {
    const currentIndex = global.difficultyStages.findIndex(stage => player.stages.has(stage));

    if (currentIndex < global.difficultyStages.length - 1) {
        const currentStage = global.difficultyStages[currentIndex];
        const nextStage = global.difficultyStages[currentIndex + 1];

        player.stages.remove(currentStage);
        player.stages.add(nextStage);

        const color = global.stageColors[nextStage] || '§f';
        const name = global.capitalize(nextStage);
        const coloredName = `${color}${name}§r`;

        player.tell(`§6You've progressed to ${coloredName} §6difficulty!`);
        player.server.tell(`§l§c${player.name} §7has ascended to ${coloredName} §7difficulty!`);
    } else {
        player.tell("§7You're already at the highest difficulty!");
    }
};

// ────────────────────────────────────────────────
// Player Login Handling
// ────────────────────────────────────────────────

PlayerEvents.loggedIn(event => {
    const player = event.player;

    // Determine the player's current difficulty stage
    let currentStage = global.difficultyStages.find(stage => player.stages.has(stage));

    // If none assigned, start them at 'peaceful'
    if (!currentStage) {
        currentStage = 'peaceful';
        player.stages.add(currentStage);
        // Welcome message moved to newjoin.js
    } else {
        if (player.stages.has('first_joined')) {
        player.tell(`§l§7You are currently on ${global.stageColors[currentStage]}${global.capitalize(currentStage)} §7difficulty.`);
        }
    }
});
