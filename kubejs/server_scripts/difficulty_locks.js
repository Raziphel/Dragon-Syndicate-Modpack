// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// Difficulty Stages and Utilities
// ────────────────────────────────────────────────

const difficultyStages = ['easy', 'normal', 'hard', 'brutal', 'nightmare', 'torment', 'oblivion'];

const stageColors = {
    easy:       '§a',
    normal:     '§e',
    hard:       '§6',
    brutal:     '§c',
    nightmare:  '§4',
    torment:    '§5',
    oblivion:   '§0'
};

// Check if player is at or above a required difficulty stage
function isStageOrAbove(player, requiredStage) {
    const currentIndex = difficultyStages.findIndex(stage => player.stages.has(stage));
    const requiredIndex = difficultyStages.indexOf(requiredStage);
    return currentIndex >= requiredIndex;
}

// Send formatted lock message to player
function tellLock(player, stage, action) {
    const color = stageColors[stage] || '§f';
    const name = capitalize(stage);
    player.tell(`§cYou must reach ${color}${name} §cdifficulty to ${action}.`);
}

// Capitalize helper
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ────────────────────────────────────────────────
// Block Interaction Locks
// ────────────────────────────────────────────────

BlockEvents.harvestCheck(event => {
    const { player, block } = event;
    if (!player || !player.isPlayer()) return;
    const id = block.id;

    // Lock diamond ore below 'normal'
    if (id.includes('diamond') && !isStageOrAbove(player, 'normal')) {
        event.allowed = false;
        tellLock(player, 'normal', 'mine diamonds');
    }

    // Lock obsidian below 'hard'
    if (id.includes('obsidian') && !isStageOrAbove(player, 'hard')) {
        event.allowed = false;
        tellLock(player, 'hard', 'mine obsidian');
    }
});

// ────────────────────────────────────────────────
// Item Use Locks 
// ────────────────────────────────────────────────

ItemEvents.rightClick(event => {
    const { player, item } = event;
    if (!player || !item || !player.isPlayer()) return;
    
    const id = item.id.toString();

    if (id.includes('diamond') && !isStageOrAbove(player, 'normal')) {
        event.cancel();
        tellLock(player, 'normal', 'use diamond gear');
    }
});

// ────────────────────────────────────────────────
// Dimension Access Locks
// ────────────────────────────────────────────────

PlayerEvents.dimensionChange(event => {
    const { player, to } = event;
    if (!player || !player.isPlayer()) return;

    // Twilight Forest - requires 'normal'
    if (to === 'twilightforest:twilight_forest' && !isStageOrAbove(player, 'normal')) {
        event.cancel();
        tellLock(player, 'normal', 'enter the Twilight Forest');
    }

    // Nether - requires 'hard'
    if (to === 'minecraft:the_nether' && !isStageOrAbove(player, 'hard')) {
        event.cancel();
        tellLock(player, 'hard', 'enter the Nether');
    }
});
