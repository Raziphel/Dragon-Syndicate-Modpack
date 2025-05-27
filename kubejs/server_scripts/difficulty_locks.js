// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// Block Breaking & Item Access Locks
// ────────────────────────────────────────────────

global.blockLocks = [
    { id: 'minecraft:diamond_ore', stage: 'normal', reason: 'mine diamonds' },
    { id: 'minecraft:deepslate_diamond_ore', stage: 'normal', reason: 'mine diamonds' },
    { id: 'minecraft:obsidian', stage: 'hard', reason: 'mine obsidian' },
    { id: 'minecraft:crying_obsidian', stage: 'hard', reason: 'mine obsidian' },
];

global.recipeLocks = {
    'minecraft:diamond_sword': 'normal',
    'minecraft:diamond_pickaxe': 'normal',
    'minecraft:diamond_helmet': 'hard'
};

global.modRecipeLocks = {
    'botania': 'hard',
    'thirst_nomore': 'normal',
    'hexerei': 'hard'
};


// ────────────────────────────────────────────────
// Block Breaking Lock Event
// ────────────────────────────────────────────────

BlockEvents.broken(event => {
    const player = event.player;
    const block = event.block;

    if (!player || !player.isPlayer() || player.isCreative()) return;

    const id = block.id;
    const match = global.blockLocks.find(lock => lock.id === id);

    if (match && !global.isStageOrAbove(player, match.stage)) {
        global.tellLock(player, match.stage, match.reason);
        event.cancel();
        block.set(id);
    }
});


// ────────────────────────────────────────────────
// AStages Item Restriction Registration
// ────────────────────────────────────────────────

ServerEvents.loaded(() => {
    for (const [modId, stage] of Object.entries(global.modRecipeLocks)) {
        const restrictionId = `astages/item_mod_${modId}`;

        AStages.addRestrictionForMod(restrictionId, stage, modId)
            .setCanPickedUp(false)
            .setCanBeStoredInInventory(false)
            .setCanBeEquipped(false)
            .setCanBePlaced(false)
            .setHideTooltip(true)
            .setRenderItemName(false);
    }
});


// ────────────────────────────────────────────────
// Dynamic Player Restriction Updates (Login Sync)
// ────────────────────────────────────────────────

PlayerEvents.loggedIn(event => {
    const player = event.player;
    global.updatePlayerRestrictions(player);
});
