// Script by Raziphel
// Join our Discord - discord.gg/razi
// Difficulty command tools for Dragon Syndicate

ServerEvents.commandRegistry(event => {
	const { commands: Commands, arguments: Arguments } = event

	// /advance_difficulty <player>
	event.register(
		Commands.literal('advance_difficulty')
			.requires(s => s.hasPermission(2))
			.then(
				Commands.argument('target', Arguments.PLAYER.create(event))
					.executes(ctx => {
						const player = Arguments.PLAYER.getResult(ctx, 'target');
						advanceDifficulty(player);
						ctx.source.sendSystemMessage(Component.green(`Advanced ${player.name.string} to the next difficulty.`));
						return 1;
					})
			)
	);

	// /get_difficulty <player>
	event.register(
		Commands.literal('get_difficulty')
			.requires(s => s.hasPermission(2))
			.then(
				Commands.argument('target', Arguments.PLAYER.create(event))
					.executes(ctx => {
						const player = Arguments.PLAYER.getResult(ctx, 'target');
						const currentStage = difficultyStages.find(stage => player.stages.has(stage)) || 'None';
						const color = stageColors[currentStage] || '§7';
						const name = capitalize(currentStage);

						ctx.source.sendSystemMessage(Component.text(`${player.name.string} is currently on ${color}${name}§r difficulty.`));
						return 1;
					})
			)
	);
});
