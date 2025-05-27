// Script by Raziphel
// Difficulty restrictions for AStages — now hot-reloadable 🔥

// ────────────────────────────────────────────────
// Configuration
// ────────────────────────────────────────────────

global.modLocks = {
    'botania': 'hard',
    'hexerei': 'hard',
    'overworld_netherite_ore': 'hard'
};

global.itemLocks = [
    { id: 'minecraft:diamond_ore', stage: 'normal', reason: 'mine diamonds' },
    { id: 'minecraft:deepslate_diamond_ore', stage: 'normal', reason: 'mine diamonds' },
    { id: 'minecraft:obsidian', stage: 'hard', reason: 'mine obsidian' },
    { id: 'minecraft:crying_obsidian', stage: 'hard', reason: 'mine obsidian' },
    { id: 'minecraft:ancient_debris', stage: 'hard', reason: 'mine ancient debris' },
    { id: 'minecraft:netherite_block', stage: 'hard', reason: 'mine netherite' }
];

global.dimensionLocks = [
    { id: 'twilightforest:twilight_forest', stage: 'normal' },
    { id: 'minecraft:the_nether', stage: 'hard' },
    { id: 'aether:aether', stage: 'brutal' },
    { id: 'minecraft:the_end', stage: 'nightmare' }
];

// ────────────────────────────────────────────────
// Utils
// ────────────────────────────────────────────────

if (!global.tellLock) {
    global.tellLock = function(player, stage, reason) {
        var color = global.stageColors?.[stage] || '§f';
        var name = global.capitalize ? global.capitalize(stage) : stage;
        player.tell(`§cYou must reach ${color}${name} §cdifficulty to ${reason}.`);
        player.runCommandSilent("playsound minecraft:block.note_block.bass master @s");
    };
}

// ────────────────────────────────────────────────
// AStages: Register Mod Restrictions
// ────────────────────────────────────────────────

for (var modId in global.modLocks) {
    var stage = global.modLocks[modId];
    var restrictionId = "astages/item_mod_" + modId;

    AStages.addRestrictionForMod(restrictionId, stage, modId)
        .setCanPickedUp(false)
        .setCanBeStoredInInventory(false)
        .setCanBeEquipped(false)
        .setCanBePlaced(false)
        .setCanBeDig(false)
        .setHideTooltip(true)
        .setRenderItemName(false)
        .setCanItemBeLeftClicked(false)
        .setCanItemBeRightClicked(false)
        .setHideInJEI(true);
}

// ────────────────────────────────────────────────
// AStages: Register Item Restrictions
// ────────────────────────────────────────────────

for (var i = 0; i < global.itemLocks.length; i++) {
    var entry = global.itemLocks[i];
    var restrictionId = "astages/item_" + entry.id.replace(":", "_");

    AStages.addRestrictionForItem(restrictionId, entry.stage, entry.id)
        .setCanBeDig(false)
        .setCanBeStoredInInventory(false)
        .setCanBeEquipped(false)
        .setCanBePlaced(false)
        .setCanPickedUp(false)
        .setHideTooltip(true)
        .setCanItemBeLeftClicked(false)
        .setCanItemBeRightClicked(false)
        .setHideInJEI(true) 
        .setRenderItemName(false);
}

// ────────────────────────────────────────────────
// AStages: Register Dimension Restrictions
// ────────────────────────────────────────────────

for (var j = 0; j < global.dimensionLocks.length; j++) {
    var dim = global.dimensionLocks[j];
    AStages.addRestrictionForDimension("astages/dimension_" + dim.id.replace(":", "_"), dim.stage, dim.id);
}
