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


/// ────────────────────────────────────────────────
// Block Breaking Restrictions
// ────────────────────────────────────────────────

BlockEvents.broken(event => {
    const player = event.player;
    const block = event.block;

    if (!player || !player.isPlayer() || player.isCreative()) return;

    const id = block.id;
    const match = global.blockLocks?.find(lock => lock.id === id);

    if (match && !global.isStageOrAbove(player, match.stage)) {
        global.tellLock(player, match.stage, match.reason);
        event.cancel();
        block.set(id);
    }
});


// ────────────────────────────────────────────────
// Static AStages Restrictions
// ────────────────────────────────────────────────

ServerEvents.loaded(() => {
    console.log("[🔒 AStages] Registering difficulty-based restrictions...");

    // Lock entire mods' item access
    for (const [modId, stage] of Object.entries(global.modRecipeLocks || {})) {
        const restrictionId = `astages/item_mod_${modId}`;
        AStages.addRestrictionForMod(restrictionId, stage, modId)
            .setCanPickedUp(false)
            .setCanBeStoredInInventory(false)
            .setCanBeEquipped(false)
            .setCanBePlaced(false)
            .setHideTooltip(true)
            .setRenderItemName(false);
    }

    // Lock specific armor
    AStages.addRestrictionForArmor("astages/armor_diamond", "hard",
        "minecraft:diamond_helmet",
        "minecraft:diamond_chestplate",
        "minecraft:diamond_leggings",
        "minecraft:diamond_boots"
    ).setCanBeEquipped(false)
     .setDropMessage(stack => Component.literal(`§cYou are not yet worthy to wear ${stack.getHoverName().string}`));

    // Lock specific ores
    AStages.addRestrictionForItem("astages/locked_ores", "normal",
        "minecraft:diamond_ore",
        "minecraft:deepslate_diamond_ore",
        "minecraft:ancient_debris"
    ).setCanBeDig(false)
     .setMineMessage(stack => Component.literal("§cYou lack the strength to mine this!"));

    // Lock dimensions
    AStages.addRestrictionForDimension("astages/nether", "hard", "minecraft:the_nether");
    AStages.addRestrictionForDimension("astages/end", "nightmare", "minecraft:the_end");
});


// ────────────────────────────────────────────────
// Dynamic Player Restriction Updates
// ────────────────────────────────────────────────

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
