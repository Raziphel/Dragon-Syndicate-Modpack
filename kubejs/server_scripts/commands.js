// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// /advance_difficulty <player> (OPs & server only)
// ────────────────────────────────────────────────

const { player } = require('minecraft/server');

ServerEvents.command(event => {
    const { commands } = event;

    commands.literal("advance_difficulty")
        .requires(src => src.hasPermission(2)) // Only OPs or the server can use it
        .then(commands.argument("target", EntityArgument.player())
            .executes(ctx => {
                const target = EntityArgument.getPlayer(ctx, "target");

                if (!target || !target.isPlayer()) {
                    ctx.source.sendFailure("§cInvalid target.");
                    return 0;
                }

                advanceDifficulty(target);
                ctx.source.sendSuccess(`§aAdvanced §e${target.name} §ato the next difficulty.`);
                return 1;
            })
        );
});
