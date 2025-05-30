// Script by Raziphel
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
// Difficulty Sync on Tick
// ────────────────────────────────────────────────

PlayerEvents.tick(event => {
    const player = event.player;
    if (player.age % 200 !== 0) return; // Every 10 seconds

    for (let i = global.difficultyStages.length - 1; i >= 0; i--) {
        const stage = global.difficultyStages[i];
        if (player.stages.has(stage)) {

            if (player.persistentData.majruszStage !== stage) {
                player.runCommandSilent(`difficulty set ${stage}`);
                player.persistentData.majruszStage = stage;

                // Fancy stage message
                const color = global.stageColors[stage] || '§7';
                const name = global.capitalize(stage);
                player.tell(`§6[⏫] Difficulty increased to ${color}§l${name}§r§6!`);
                player.runCommandSilent("playsound minecraft:block.note_block.pling master @s ~ ~ ~ 1 1");
                console.log(`[💀] Set ${player.name} to difficulty '${stage}'`);
            }

            break;
        }
    }
});
