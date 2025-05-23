// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// Define all your difficulty stages in order
const difficultyStages = ['peaceful', 'easy', 'normal', 'hard', 'brutal', 'nightmare'];

// Define stage colors (Minecraft § formatting codes)
const stageColors = {
    peaceful: '§2',   // Dark green
    easy:     '§a',   // Light green
    normal:   '§e',   // Yellow
    hard:     '§6',   // Gold
    brutal:   '§c',   // Red
    nightmare:'§4'    // Dark red
};

PlayerEvents.loggedIn(event => {
    const player = event.player;

    // Determine what difficulty stage the player is in, if any
    let currentStage = difficultyStages.find(stage => player.stages.has(stage));

    if (!currentStage) {
        currentStage = 'peaceful';
        player.stages.add(currentStage);
        player.tell(`§l§7Welcome to §cDragon Syndicate§7!\n§l§7As a new player you will start on ${stageColors[currentStage]}${capitalize(currentStage)} §7difficulty.`);
    } else {
        player.tell(`§l§7You are currently on ${stageColors[currentStage]}${capitalize(currentStage)} §7difficulty.`);
    }
});

function advanceDifficulty(player) {
    const currentIndex = difficultyStages.findIndex(stage => player.stages.has(stage));
    if (currentIndex < difficultyStages.length - 1) {
        const currentStage = difficultyStages[currentIndex];
        const nextStage = difficultyStages[currentIndex + 1];

        player.stages.remove(currentStage);
        player.stages.add(nextStage);
        player.tell(`§6You've progressed to ${stageColors[nextStage]}${capitalize(nextStage)} §6difficulty!`);
    } else {
        player.tell("§7You're already at the highest difficulty!");
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
