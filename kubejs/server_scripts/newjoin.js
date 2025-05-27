// Script by Raziphel
// Join our Discord - discord.gg/razi
// If you would like to join the development team!

// ────────────────────────────────────────────────
// New player starter kits
// ────────────────────────────────────────────────

PlayerEvents.loggedIn(event => {
    const player = event.player;

const tome = Item.of('akashictome:tome', {
    "akashictome:is_morphing": 1,
    "akashictome:data": {
        "hexerei": {
        id: "hexerei:book_of_shadows",
        Count: 1,
        tag: {
            "akashictome:is_morphing": 1,
            "display": {
            "Name": {
                "translate": "akashictome.sudo_name",
                "with": [
                {
                    "color": "green",
                    "translate": "item.hexerei.book_of_shadows"
                }
                ]
            }
            }
        }
        },
        "botania": {
        id: "botania:lexicon",
        Count: 1
        },
        "psi": {
        id: "patchouli:guide_book",
        Count: 1,
        tag: {
            "patchouli:book": "psi:encyclopaedia_psionica"
        }
        }
    }
});



    // Check if the player has already joined before (stage marker)
    if (!player.stages.has('first_joined')) {

        // Give starter gear
        event.entity.setItemSlot(5, 'majruszsdifficulty:tattered_helmet')
        event.entity.setItemSlot(4, 'majruszsdifficulty:tattered_chestplate')
        event.entity.setItemSlot(3, 'majruszsdifficulty:tattered_leggings')
        event.entity.setItemSlot(2, 'majruszsdifficulty:tattered_boots')
        player.give(tome);

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
            '§bUse your §nquest book§b in the top left corner of your inventory.\n',
            '§8Good luck, Syndicate Initiate. 🐉'
        ]);
    }
});
