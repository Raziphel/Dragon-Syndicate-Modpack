// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the devlopment team!

StartupEvents.registry('item', event => {
    event.create('bronze_coin')
        .displayName('Bronze Coin')
        .texture('kubejs:item/bronze_coin')
        .maxStackSize(64);

    event.create('silver_coin')
        .displayName('Silver Coin')
        .texture('kubejs:item/silver_coin')
        .maxStackSize(64);

    event.create('gold_coin')
        .displayName('Gold Coin')
        .texture('kubejs:item/gold_coin')
        .maxStackSize(64);

    event.create('platinum_coin')
        .displayName('Platinum Coin')
        .texture('kubejs:item/platinum_coin')
        .maxStackSize(64);
});