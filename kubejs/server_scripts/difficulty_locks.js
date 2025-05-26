// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// Block Breaking Lock
// ────────────────────────────────────────────────

global.blockLocks = [
    // Diamond Ore
    { id: 'minecraft:diamond_ore', stage: 'normal', reason: 'mine diamonds' },
    { id: 'minecraft:deepslate_diamond_ore', stage: 'normal', reason: 'mine diamonds' },
    // Obsidian
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



// Show a standardized "you're not allowed" message
global.tellLock = (player, stage, action) => {
	const color = global.stageColors[stage] || '§f';
	const name = global.capitalize(stage);
	player.tell(`§cYou must reach ${color}${name} §cdifficulty to ${action}.`);
	// Add a fail sound
	player.runCommandSilent("playsound minecraft:block.note_block.bass master @s");
};

// Check if player has required or higher stage
global.isStageOrAbove = (player, requiredStage) => {
    const currentIndex = global.difficultyStages.findIndex(stage => player.stages.has(stage));
    const requiredIndex = global.difficultyStages.indexOf(requiredStage);
    return currentIndex >= requiredIndex;
};



// ────────────────────────────────────────────────
// Apply stage-based block breaking
// ────────────────────────────────────────────────
BlockEvents.broken(event => {
	const player = event.player;
	const block = event.block;
	if (!player || !player.isPlayer()) return;

	const id = block.id;

	// Check for any matching lock
	const match = global.blockLocks.find(lock => lock.id === id);
	if (match && !global.isStageOrAbove(player, match.stage)) {
		global.tellLock(player, match.stage, match.reason);
		event.cancel();
		block.set(id); // Replace the block so it appears untouched
    }
});


// ────────────────────────────────────────────────
// Apply stage-based recipe locking
// ────────────────────────────────────────────────
ServerEvents.recipes(event => {
    // Handle individual item recipe locks
    for (const [itemId, stage] of Object.entries(global.recipeLocks)) {
        event.stages.add(stage, e => {
            e.recipes.forEach(recipe => {
                if (recipe.result.toString() === itemId) {
                    recipe.stage(stage);
                }
            });
        });
    }

    // Handle mod-wide recipe locks
    for (const [modId, stage] of Object.entries(global.modRecipeLocks)) {
        event.stages.add(stage, e => {
            e.forEachRecipe(recipe => {
                if (recipe.result && recipe.result.id.namespace === modId) {
                    recipe.stage(stage);
                }
            });
        });
    }
});