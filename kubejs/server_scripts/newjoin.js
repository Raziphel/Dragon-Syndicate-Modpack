// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// New player starter kits + AStages integration
// ────────────────────────────────────────────────

PlayerEvents.loggedIn(event => {
    const player = event.player;

    // Safety fallbacks in case these aren't initialized
    if (!global.difficultyStages) global.difficultyStages = ['peaceful', 'normal', 'hard'];
    if (!global.stageColors) global.stageColors = { peaceful: '§a', normal: '§e', hard: '§c' };

    // Define Akashic Tome
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
            powah: { id: "powah:book", Count: 1 },
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
            immersiveengineering: { id: "immersiveengineering:manual", Count: 1 },
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
            luminous_butterflies: { id: "luminous_butterflies:butterfly_encyclopedia", Count: 1 },
            botania: { id: "botania:lexicon", Count: 1 },
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
            cookingforblockheads: { id: "cookingforblockheads:crafting_book", Count: 1 },
            bloodmagic: {
                id: "patchouli:guide_book",
                Count: 1,
                tag: { "patchouli:book": "bloodmagic:guide" }
            }
        }
    });

    // Check if this is their first time
    const isFirstJoin = !AStages.playerHasStage('first_joined', player);

    // If no difficulty stage, set to peaceful
    let hasDifficulty = false;
    for (let i = 0; i < global.difficultyStages.length; i++) {
        if (AStages.playerHasStage(global.difficultyStages[i], player)) {
            hasDifficulty = true;
            break;
        }
    }

    if (!hasDifficulty) {
        AStages.addStageToPlayer('peaceful', player);
    }

    // Determine current difficulty stage
    let currentStage = 'peaceful';
    for (let i = 0; i < global.difficultyStages.length; i++) {
        if (AStages.playerHasStage(global.difficultyStages[i], player)) {
            currentStage = global.difficultyStages[i];
            break;
        }
    }

    // Get stage color + capitalized name safely
    let stageColor = '§f';
    if (global.stageColors && global.stageColors[currentStage]) {
        stageColor = global.stageColors[currentStage];
    }

    let stageName = currentStage;
    if (typeof global.capitalize === 'function') {
        stageName = global.capitalize(currentStage);
    }

    // Only give starter kit on first join
    if (isFirstJoin) {
        AStages.addStageToPlayer('first_joined', player);

        // Starter armor
        event.entity.setItemSlot(5, 'majruszsdifficulty:tattered_helmet');
        event.entity.setItemSlot(4, 'majruszsdifficulty:tattered_chestplate');
        event.entity.setItemSlot(3, 'majruszsdifficulty:tattered_leggings');
        event.entity.setItemSlot(2, 'majruszsdifficulty:tattered_boots');

        // Welcome message
        player.tell([
            '§l§6Welcome to the §cDragon Syndicate§6!\n\n',
            '§7This is a world of danger, dragons, and growing power.\n',
            '§7You begin your journey on ' + stageColor + stageName + '§7 difficulty.\n',
            '§eDifficulty stages§7 are key to unlocking your path forward.\n',
            '§eProgress by completing quests.\n\n',
            '§bUse your §nquest book§b in the top left corner of your inventory.\n',
            '§8Good luck, Syndicate Initiate. 🐉'
        ]);

        // Replace existing guide book with custom tome
        const unwanted = Item.of('patchouli:guide_book', { "patchouli:book": "simplyswords:runic_grimoire" });
        player.give(tome);
        player.inventory.clearItem(unwanted);

    } else {
        // Show current stage if not first join
        player.tell('§l§7You are currently on ' + stageColor + stageName + ' §7difficulty.');
    }
});
