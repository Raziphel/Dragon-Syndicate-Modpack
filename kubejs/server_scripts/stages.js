// This is for establishing all the different stages in the modpack!

// Assign a stage when a player joins for the first time
ServerEvents.playerLoggedIn(event => {
    const player = event.player

  // Check if the player already has the stage
    if (!player.stages.has('easy')) {
        player.stages.add('easy')
        player.tell('§l§7As a brand new player you start in §2Easy §7difficulty!')
    }
})
