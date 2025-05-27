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


// Dynamically update mod restrictions per player
global.updatePlayerRestrictions = (player) => {
    for (const [modId, stage] of Object.entries(global.modRecipeLocks || {})) {
        const restrictionId = `astages/item_mod_${modId}`;
        const restriction = AStages.getRestrictionById('mod', restrictionId);

        if (!restriction) continue;

        const hasStage = AStages.playerHasStage(stage, player);

        restriction.setHideTooltip(!hasStage, player);
        restriction.setRenderItemName(hasStage, player);
        restriction.setCanPickedUp(hasStage, player);
    }
};


// ────────────────────────────────────────────────
// Player Stage Initialization + First Join
// ────────────────────────────────────────────────

PlayerEvents.loggedIn(event => {
    const player = event.player;

    let currentStage = global.difficultyStages.find(stage =>
        AStages.playerHasStage(stage, player)
    );

    if (!currentStage) {
        currentStage = 'peaceful';
        AStages.addStageToPlayer(currentStage, player);
    }

    if (!AStages.playerHasStage('first_joined', player)) {
        AStages.addStageToPlayer('first_joined', player);

        player.tell([
            '§l§6Welcome to the §cDragon Syndicate§6!\n',
            '§7This is a world of danger, dragons, and growing power.\n',
            `§7You begin your journey on ${global.stageColors[currentStage] ?? '§2'}${global.capitalize(currentStage)}§7 difficulty.\n`,
            '§eDifficulty stages§7 are key to unlocking your path forward.\n',
            '§eProgress by completing quests.\n\n',
            '§bUse your §nquest book§b in the top left corner of your inventory.\n',
            '§8Good luck, Syndicate Initiate. 🐉'
        ]);
    } else {
        player.tell(`§l§7You are currently on ${global.stageColors[currentStage]}${global.capitalize(currentStage)} §7difficulty.`);
    }

    global.updatePlayerRestrictions(player);
});
