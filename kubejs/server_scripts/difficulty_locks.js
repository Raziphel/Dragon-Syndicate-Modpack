// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// Block Breaking Lock (Before break)
// ────────────────────────────────────────────────

global.blockLocks = [
    // Diamond Ore
    { id: 'minecraft:diamond_ore', stage: 'normal', reason: 'mine diamonds' },
    { id: 'minecraft:deepslate_diamond_ore', stage: 'normal', reason: 'mine diamonds' },
    // Obsidian
    { id: 'minecraft:obsidian', stage: 'hard', reason: 'mine obsidian' },
];

// Check if player has required or higher stage
global.isStageOrAbove = (player, requiredStage) => {
    const currentIndex = global.difficultyStages.findIndex(stage => player.stages.has(stage));
    const requiredIndex = global.difficultyStages.indexOf(requiredStage);
    return currentIndex >= requiredIndex;
};

BlockEvents.broken(event => {
	const player = event.player;
	const block = event.block;
	if (!player || !player.isPlayer()) return;

	const id = block.id;

	// Check for any matching lock
	const match = global.blockLocks.find(lock => lock.id === id);
	if (match && !global.isStageOrAbove(player, match.stage)) {
		event.cancel();
		block.set(id); // Replace the block so it appears untouched

        setTimeout(() => {
            const color = global.stageColors[match.stage] || '§f';
            const name = global.capitalize(match.stage);
            player.tell(`§cYou must reach ${color}${name} §cdifficulty to ${match.reason}.`);
        }, 1);
	}
});
