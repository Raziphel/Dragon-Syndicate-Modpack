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
    { id: 'minecraft:crying_obsidian', stage: 'hard', reason: 'mine obsidian' }
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

global.armorLocks = [
    { id: 'minecraft:diamond_helmet', stage: 'hard' },
    { id: 'minecraft:diamond_chestplate', stage: 'hard' },
    { id: 'minecraft:diamond_leggings', stage: 'hard' },
    { id: 'minecraft:diamond_boots', stage: 'hard' }
];

global.oreLocks = [
    { id: 'minecraft:diamond_ore', stage: 'normal' },
    { id: 'minecraft:deepslate_diamond_ore', stage: 'normal' },
    { id: 'minecraft:ancient_debris', stage: 'normal' }
];

global.dimensionLocks = [
    { id: 'minecraft:the_nether', stage: 'hard' },
    { id: 'minecraft:the_end', stage: 'nightmare' }
];


// ────────────────────────────────────────────────
// Utility Requirements (must exist from core script)
// ────────────────────────────────────────────────

if (!global.isStageOrAbove) {
    console.error("[🔥 KubeJS] Missing global.isStageOrAbove! Did you forget to load core?");
}

if (!global.tellLock) {
    global.tellLock = (player, stage, reason) => {
        player.tell(`§cYou must reach ${stage} to ${reason}.`);
        player.runCommandSilent("playsound minecraft:block.note_block.bass master @s");
    };
}

// ────────────────────────────────────────────────
// Block Breaking Restrictions
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
        block.set(id); // Reset block visually
    }
});

// ────────────────────────────────────────────────
// Static AStages Restrictions
// ────────────────────────────────────────────────
ServerEvents.loaded(() => {
    console.log("[🔒 AStages] Registering difficulty-based restrictions...");

    // Mod item restrictions
    for (const [modId, stage] of Object.entries(global.modRecipeLocks)) {
        const restrictionId = `astages/item_mod_${modId}`;
        AStages.addRestrictionForMod(restrictionId, stage, modId)
            .setCanPickedUp(false)
            .setCanBeStoredInInventory(false)
            .setCanBeEquipped(false)
            .setCanBePlaced(false)
            .setHideTooltip(true)
            .setRenderItemName(false)
            .setPickupMessage(function(stack) {
                const player = stack.player || (typeof stack.getOwner === 'function' ? stack.getOwner() : null);
                if (player) global.tellLock(player, stage, `pick up items from ${modId}`);
                return Component.empty();
            });
    }

    // Armor restrictions
    AStages.addRestrictionForArmor(
        "astages/armor_diamond",
        "hard",
        ...global.armorLocks.map(lock => lock.id)
    )
    .setCanBeEquipped(false)
    .setDropMessage(function(stack) {
        return Component.literal("§cYou are not yet worthy to wear " + stack.getHoverName().string);
    });

    // Ore restrictions
    AStages.addRestrictionForItem(
        "astages/locked_ores",
        "normal",
        ...global.oreLocks.map(ore => ore.id)
    )
    .setCanBeDig(false)
    .setMineMessage(function(stack) {
        return Component.literal("§cYou lack the strength to mine this!");
    });

    // Dimension restrictions
    for (const dim of global.dimensionLocks) {
        AStages.addRestrictionForDimension(`astages/dimension_${dim.id.replace(':', '_')}`, dim.stage, dim.id);
    }
});


// ────────────────────────────────────────────────
// Dynamic Player Restriction Updates
// ────────────────────────────────────────────────

global.updatePlayerRestrictions = function(player) {
    for (const [modId, stage] of Object.entries(global.modRecipeLocks)) {
        const restrictionId = `astages/item_mod_${modId}`;
        const restriction = AStages.getRestrictionById('mod', restrictionId);
        if (!restriction) continue;

        const hasStage = AStages.playerHasStage(stage, player);

        restriction.setHideTooltip(!hasStage, player);
        restriction.setRenderItemName(hasStage, player);
        restriction.setCanPickedUp(hasStage, player);
        restriction.setCanBeStoredInInventory(hasStage, player);
        restriction.setCanBeEquipped(hasStage, player);
        restriction.setCanBePlaced(hasStage, player);
    }
};
