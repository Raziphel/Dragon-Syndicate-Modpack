// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// New player starter kits
// ────────────────────────────────────────────────

PlayerEvents.loggedIn(event => {
    const player = event.player;

    // Check if the player has already joined before (stage marker)
    if (!player.stages.has('first_joined')) {

        // Give starter gear
        event.entity.setItemSlot(5, 'minecraft:leather_helmet')
        event.entity.setItemSlot(4, 'minecraft:leather_chestplate')
        event.entity.setItemSlot(3, 'minecraft:leather_leggings')
        event.entity.setItemSlot(2, 'minecraft:leather_boots')

        // Optional: Quest book, food, or coin starter pack
        // player.give('ftbquests:book');
        // player.give('kubejs:gold_coin', 10);

        // Add marker stage so this doesn't run again
        player.stages.add('first_joined');

        // Send welcome message
        player.tell([
            '§l§6Welcome to the §cDragon Syndicate§6!\n\n',
            '§7This is a world of danger, dragons, and growing power.\n',
            '§7You begin your journey on the §2Peaceful§7 difficulty stage.\n',
            '§eDifficulty stages§7 are key to unlocking your path forward.\n',
            '§eProgress by completing quests.\n\n',
            '§bUse your §nquest book§b in the top left corner of your inventory.\n\n',
            '§8Good luck, Syndicate Initiate. 🐉'
        ]);
    }
});
