// Script by Raziphel 🐉
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// Difficulty Core & Globals
// ────────────────────────────────────────────────

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

// Stage display colors for messages
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

// Capitalize first letter of a string
global.capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// ────────────────────────────────────────────────
// Mob Difficulty Scaling via AStages Integration
// Works with Majrusz Difficulty gamestates
// ────────────────────────────────────────────────

PlayerEvents.tick(event => {
    const player = event.player;
    if (player.age % 200 !== 0) return; // Every 10 seconds

    let targetStage = 'normal';

    if (
        AStages.playerHasStage('brutal', player) ||
        AStages.playerHasStage('nightmare', player) ||
        AStages.playerHasStage('torment', player) ||
        AStages.playerHasStage('oblivion', player)
    ) {
        targetStage = 'master';
    } else if (
        AStages.playerHasStage('normal', player) ||
        AStages.playerHasStage('hard', player)
    ) {
        targetStage = 'expert';
    }

    if (player.persistentData.majruszStage !== targetStage) {
        player.persistentData.majruszStage = targetStage;

        const command = `gamestate ${targetStage} ${player.name}`;
        player.runCommandSilent(command);

        const color = (global.stageColors && global.stageColors[targetStage]) || '§7';
        const name = global.capitalize ? global.capitalize(targetStage) : targetStage;
        player.tell(`§6[⏫] Mob Difficulty increased to ${color}§l${name}§r§6!`);
        player.runCommandSilent("playsound minecraft:block.note_block.pling master @s ~ ~ ~ 1 1");

        console.log(`[💀] Set ${player.name} to gamestate '${targetStage}'`);
    }
});
