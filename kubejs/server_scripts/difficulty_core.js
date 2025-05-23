// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// Difficulty Stages & Utilities
// ────────────────────────────────────────────────

const difficultyStages = ['peaceful', 'easy', 'normal', 'hard', 'brutal', 'nightmare', 'torment', 'oblivion'];

const stageColors = {
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
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ────────────────────────────────────────────────
// Player Login Handling
// ────────────────────────────────────────────────

PlayerEvents.loggedIn(event => {
    const player = event.player;

    // Determine the player's current difficulty stage
    let currentStage = difficultyStages.find(stage => player.stages.has(stage));

    // If none assigned, start them at 'peaceful'
    if (!currentStage) {
        currentStage = 'peaceful';
        player.stages.add(currentStage);
        player.tell(`§l§7Welcome to §cDragon Syndicate§7!\n§l§7As a new player, you will start on ${stageColors[currentStage]}${capitalize(currentStage)} §7difficulty.`);
    } else {
        if (player.stages.has('first_joined')) {
            player.tell(`§l§7You are currently on ${stageColors[currentStage]}${capitalize(currentStage)} §7difficulty.`);
        }
    }
});

// ────────────────────────────────────────────────
// Difficulty Advancement
// ────────────────────────────────────────────────

function advanceDifficulty(player) {
    const currentIndex = difficultyStages.findIndex(stage => player.stages.has(stage));

    if (currentIndex < difficultyStages.length - 1) {
        const currentStage = difficultyStages[currentIndex];
        const nextStage = difficultyStages[currentIndex + 1];

        player.stages.remove(currentStage);
        player.stages.add(nextStage);

        const color = stageColors[nextStage] || '§f';
        const name = capitalize(nextStage);
        const coloredName = `${color}${name}§r`;

        player.tell(`§6You've progressed to ${coloredName} §6difficulty!`);
        player.server.tell(`§l§c${player.name} §7has ascended to ${coloredName} §7difficulty!`);
    } else {
        player.tell("§7You're already at the highest difficulty!");
    }
}
