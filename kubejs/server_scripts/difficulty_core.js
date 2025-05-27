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

// Capitalize helper
global.capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);



// Check if player is at or beyond a certain stage
global.isStageOrAbove = (player, requiredStage) => {
    const currentIndex = global.difficultyStages.findIndex(stage => AStages.playerHasStage(stage, player));
    const requiredIndex = global.difficultyStages.indexOf(requiredStage);
    return currentIndex >= requiredIndex;
};

// Show a standardized "you're not allowed" message
global.tellLock = (player, stage, action) => {
    const color = global.stageColors[stage] || '§f';
    const name = global.capitalize(stage);
    player.tell(`§cYou must reach ${color}${name} §cdifficulty to ${action}.`);
    player.runCommandSilent("playsound minecraft:block.note_block.bass master @s");
};


// Advance a player's difficulty stage
global.advanceDifficulty = (player) => {
    const currentIndex = global.difficultyStages.findIndex(stage =>
        AStages.playerHasStage(stage, player)
    );

    if (currentIndex < global.difficultyStages.length - 1) {
        const currentStage = global.difficultyStages[currentIndex];
        const nextStage = global.difficultyStages[currentIndex + 1];

        AStages.removeStageFromPlayer(currentStage, player);
        AStages.addStageToPlayer(nextStage, player);

        const color = global.stageColors[nextStage] || '§f';
        const name = global.capitalize(nextStage);
        const coloredName = `${color}${name}§r`;

        global.updatePlayerRestrictions(player);

        player.tell(`§6You've progressed to ${coloredName} §6difficulty!`);
        player.server.tell(`§l§c${player.name} §7has ascended to ${coloredName} §7difficulty!`);
    } else {
        player.tell("§7You're already at the highest difficulty!");
    }
};

