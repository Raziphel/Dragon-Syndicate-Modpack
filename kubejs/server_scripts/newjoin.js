// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// New player starter kits + AStages integration
// ────────────────────────────────────────────────

PlayerEvents.loggedIn(function(event) {
    const player = event.player;

    const tome = Item.of('akashictome:tome', {
        "akashictome:is_morphing": 1.0,
        "akashictome:data": {
            hexerei: {
                id: "hexerei:book_of_shadows",
                Count: 1,
                tag: {
                    "akashictome:is_morphing": 1,
                    display: {
                        Name: {
                            translate: "akashictome.sudo_name",
                            with: [{ color: "green", translate: "item.hexerei.book_of_shadows" }]
                        }
                    }
                }
            },
            powah: {
                id: "powah:book",
                Count: 1
            },
            simplyswords: {
                id: "patchouli:guide_book",
                Count: 1,
                tag: { "patchouli:book": "simplyswords:runic_grimoire" }
            },
            buildinggadgets2: {
                id: "patchouli:guide_book",
                Count: 1,
                tag: { "patchouli:book": "buildinggadgets2:buildinggadgets2book" }
            },
            psi: {
                id: "patchouli:guide_book",
                Count: 1,
                tag: { "patchouli:book": "psi:encyclopaedia_psionica" }
            },
            immersiveengineering: {
                id: "immersiveengineering:manual",
                Count: 1
            },
            apotheosis: {
                id: "patchouli:guide_book",
                Count: 1,
                tag: { "patchouli:book": "apotheosis:apoth_chronicle" }
            },
            twilightdelight: {
                id: "patchouli:guide_book",
                Count: 1,
                tag: { "patchouli:book": "twilightdelight:twilight_guide" }
            },
            luminous_butterflies: {
                id: "luminous_butterflies:butterfly_encyclopedia",
                Count: 1
            },
            botania: {
                id: "botania:lexicon",
                Count: 1
            },
            enderio: {
                id: "patchouli:guide_book",
                Count: 1,
                tag: { "patchouli:book": "enderio:guide" }
            },
            cookingforblockheads_0: {
                id: "cookingforblockheads:recipe_book",
                Count: 1,
                tag: { "akashictome:definedMod": "cookingforblockheads_0" }
            },
            cookingforblockheads: {
                id: "cookingforblockheads:crafting_book",
                Count: 1
            },
            bloodmagic: {
                id: "patchouli:guide_book",
                Count: 1,
                tag: { "patchouli:book": "bloodmagic:guide" }
            }
        }
    });


    // Add peaceful stage if they have no difficulty yet
    let hasStage = false;
    for (let i = 0; i < global.difficultyStages.length; i++) {
        if (AStages.playerHasStage(global.difficultyStages[i], player)) {
            hasStage = true;
            break;
        }
    }

    if (!hasStage) {
        AStages.addStageToPlayer("peaceful", player);
    }

    const currentStage = global.difficultyStages.find(function(stage) {
        return AStages.playerHasStage(stage, player);
    }) || "peaceful";

    // First-time join setup
    if (!AStages.playerHasStage("first_joined", player)) {
        event.entity.setItemSlot(5, 'majruszsdifficulty:tattered_helmet');
        event.entity.setItemSlot(4, 'majruszsdifficulty:tattered_chestplate');
        event.entity.setItemSlot(3, 'majruszsdifficulty:tattered_leggings');
        event.entity.setItemSlot(2, 'majruszsdifficulty:tattered_boots');


        const unwanted = Item.of('patchouli:guide_book', { "patchouli:book": "simplyswords:runic_grimoire" });
        player.inventory.clearItem(unwanted);
        player.give(tome);

        // Optional starter items
        // player.give('ftbquests:book');
        // player.give('kubejs:gold_coin', 10);

        AStages.addStageToPlayer("first_joined", player);

        const color = global.stageColors[currentStage] || '§f';
        const name = global.capitalize(currentStage);

        player.tell([
            '§l§6Welcome to the §cDragon Syndicate§6!\n\n',
            '§7This is a world of danger, dragons, and growing power.\n',
            `§7You begin your journey on ${color}${name}§7 difficulty.\n`,
            '§eDifficulty stages§7 are key to unlocking your path forward.\n',
            '§eProgress by completing quests.\n\n',
            '§bUse your §nquest book§b in the top left corner of your inventory.\n',
            '§8Good luck, Syndicate Initiate. 🐉'
        ]);
    } else {
        const color = global.stageColors[currentStage] || '§f';
        const name = global.capitalize(currentStage);
        player.tell(`§l§7You are currently on ${color}${name} §7difficulty.`);
    }

    // Reapply any restriction logic
    if (global.updatePlayerRestrictions) {
        global.updatePlayerRestrictions(player);
    }
});
