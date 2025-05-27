// Script by Raziphel
// Join our Discord - discord.gg/razi
// Rhino-safe difficulty command tools for Dragon Syndicate

ServerEvents.commandRegistry(function(event) {
    var Commands = event.commands;
    var Arguments = event.arguments;

    // /advance_difficulty <player>
    event.register(
        Commands.literal("advance_difficulty")
            .requires(function(source) { return source.hasPermission(2); })
            .then(
                Commands.argument("target", Arguments.PLAYER.create(event))
                    .executes(function(ctx) {
                        var player = Arguments.PLAYER.getResult(ctx, "target");
                        if (typeof global.advanceDifficulty === "function") {
                            global.advanceDifficulty(player);
                            ctx.source.sendSystemMessage("§aAdvanced §e" + player.name.string + " §ato the next difficulty.");
                        } else {
                            ctx.source.sendSystemMessage("§cadvanceDifficulty function not defined.");
                        }
                        return 1;
                    })
            )
    );

    // /get_difficulty <player>
    event.register(
        Commands.literal("get_difficulty")
            .requires(function(source) { return true; }) // All players allowed
            .then(
                Commands.argument("target", Arguments.PLAYER.create(event))
                    .executes(function(ctx) {
                        var player = Arguments.PLAYER.getResult(ctx, "target");
                        var stage = "None";
                        for (var i = 0; i < global.difficultyStages.length; i++) {
                            if (AStages.playerHasStage(global.difficultyStages[i], player)) {
                                stage = global.difficultyStages[i];
                                break;
                            }
                        }

                        var color = global.stageColors[stage] || "§7";
                        var name = global.capitalize ? global.capitalize(stage) : stage;

                        ctx.source.sendSystemMessage("§e" + player.name.string + " §7is currently on " + color + name + "§7 difficulty.");
                        return 1;
                    })
            )
    );

    // /set_difficulty <player> <stage>
    event.register(
        Commands.literal("set_difficulty")
            .requires(function(source) { return source.hasPermission(2); })
            .then(
                Commands.argument("target", Arguments.PLAYER.create(event))
                    .then(
                        Commands.argument("stage", Arguments.STRING.create(event))
                            .executes(function(ctx) {
                                var player = Arguments.PLAYER.getResult(ctx, "target");
                                var stage = Arguments.STRING.getResult(ctx, "stage");

                                if (global.difficultyStages.indexOf(stage) === -1) {
                                    ctx.source.sendSystemMessage("§c'" + stage + "' is not a valid difficulty stage.");
                                    return 0;
                                }

                                for (var i = 0; i < global.difficultyStages.length; i++) {
                                    AStages.removeStageFromPlayer(global.difficultyStages[i], player);
                                }

                                AStages.addStageToPlayer(stage, player);

                                var color = global.stageColors[stage] || "§f";
                                var name = global.capitalize ? global.capitalize(stage) : stage;

                                player.tell("§aYour difficulty has been set to " + color + name + "§r.");
                                ctx.source.sendSystemMessage("§aSet §e" + player.name.string + "§a's difficulty to " + color + name + "§r.");

                                if (global.updatePlayerRestrictions) {
                                    global.updatePlayerRestrictions(player);
                                }

                                return 1;
                            })
                    )
            )
    );
});
