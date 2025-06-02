// Script by Raziphel
// Difficulty restrictions for AStages — now hot-reloadable 🔥

// ────────────────────────────────────────────────
// Configuration
// ────────────────────────────────────────────────

global.modLocks = {
    'refinedstorage': 'normal',
    'refinedstorageaddons': 'normal',
    'botania': 'hard',
    'mythicbotany': 'hard',
    'hexerei': 'hard',
    'overworld_netherite_ore': 'hard',
    'iceandfire': 'brutal',
    'iceandfire_curios': 'brutal',
    'create': 'easy',
};

global.itemLocks = [
    { id: 'minecraft:diamond_ore', stage: 'normal' },
    { id: 'minecraft:deepslate_diamond_ore', stage: 'normal' },
    { id: 'minecraft:obsidian', stage: 'normal' },
    { id: 'minecraft:crying_obsidian', stage: 'normal' },
    { id: 'minecraft:ancient_debris', stage: 'hard' },
    { id: 'minecraft:netherite_block', stage: 'hard' },
];

global.dimensionLocks = [
    { id: 'twilightforest:twilight_forest', stage: 'normal' },
    { id: 'minecraft:the_nether', stage: 'hard' },
    { id: 'aether:aether', stage: 'brutal' },
    { id: 'minecraft:the_end', stage: 'nightmare' },
];


global.structureLocks = [
    { id: 'integrated_stronghold:stronghold', stage: 'nightmare' },
];

// ────────────────────────────────────────────────
// AStages: Register Mod Restrictions
// ────────────────────────────────────────────────

for (var modId in global.modLocks) {
    var stage = global.modLocks[modId];
    var restrictionId = "astages/item_mod_" + modId;

    AStages.addRestrictionForMod(restrictionId, stage, modId)
        .setCanPickedUp(true)
        .setCanBeStoredInInventory(true)
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
// AStages: Register Mod Recipe Restrictions
// ────────────────────────────────────────────────

Object.entries(global.modLocks).forEach(([modId, stage]) => {
    const id = `astages/recipe/${modId}`;
    AStages.addRestrictionForModRecipe(id, stage, modId);
});
// ────────────────────────────────────────────────
// AStages: Register Item Restrictions
// ────────────────────────────────────────────────

for (var i = 0; i < global.itemLocks.length; i++) {
    var entry = global.itemLocks[i];
    var restrictionId = "astages/item_" + entry.id.replace(":", "_");

    AStages.addRestrictionForItem(restrictionId, entry.stage, entry.id)
        .setCanPickedUp(true)
        .setCanBeStoredInInventory(true)
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
// AStages: Register Dimension Restrictions
// ────────────────────────────────────────────────

for (var j = 0; j < global.dimensionLocks.length; j++) {
    var dim = global.dimensionLocks[j];
    AStages.addRestrictionForDimension("astages/dimension_" + dim.id.replace(":", "_"), dim.stage, dim.id);
}

// ────────────────────────────────────────────────
// AStages: Structure Destruction Locks
// ────────────────────────────────────────────────


for (var k = 0; k < global.structureLocks.length; k++) {
    var structure = global.structureLocks[k];
    var restrictionId = `astages/${structure.id.replace(":", "/")}`;

    AStages.addRestrictionForStructure(restrictionId, structure.stage, structure.id)
        .setCanAttackEntities(true)
        .setCanInteract(true)
        .setCanBlockBePlaced(false)
        .setCanBlockBeBroken(false)
        .setMakeExplosionsAffectBlocks(false)
        .setMakeExplosionsAffectEntities(true)
        .addAllowedBreakableBlocks('grass','dirt','stone','deepslate',"tuff","grass_block","limestone","diorite","andesite")
}