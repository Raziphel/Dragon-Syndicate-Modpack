// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the devlopment team!


ServerEvents.command(event => {
    const { commands } = event;
    commands.literal("advance_difficulty")
        .requires(src => src.hasPermission(2))
        .executes(ctx => {
            const player = ctx.source.player;
            advanceDifficulty(player);
            return 1;
        });
});
