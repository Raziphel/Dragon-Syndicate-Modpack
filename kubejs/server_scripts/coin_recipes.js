// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the devlopment team!

ServerEvents.recipes(event => {
    // ────────────────────────────────────────────────
    // Bronze ↔ Silver
    // ────────────────────────────────────────────────
    event.shapeless('kubejs:silver_coin', Array(9).fill('kubejs:bronze_coin'));

    event.shaped(Item.of('kubejs:bronze_coin', 9), [
        '   ',
        ' S ',
        '   '
    ], {
        S: 'kubejs:silver_coin'
    });

    // ────────────────────────────────────────────────
    // Silver ↔ Gold
    // ────────────────────────────────────────────────
    event.shapeless('kubejs:gold_coin', Array(9).fill('kubejs:silver_coin'));

    event.shaped(Item.of('kubejs:silver_coin', 9), [
        '   ',
        ' G ',
        '   '
    ], {
        G: 'kubejs:gold_coin'
    });

    // ────────────────────────────────────────────────
    // Gold ↔ Platinum
    // ────────────────────────────────────────────────
    event.shapeless('kubejs:platinum_coin', Array(9).fill('kubejs:gold_coin'));

    event.shaped(Item.of('kubejs:gold_coin', 9), [
        '   ',
        ' P ',
        '   '
    ], {
        P: 'kubejs:platinum_coin'
    });
});