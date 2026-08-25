/**
 * Legends of Avantris: World Explorer & RPG
 * Core Application Logic & Database Engine
 */

// ==========================================
// 1. DEFAULT CANON DATABASE (LORE)
// ==========================================
const DEFAULT_DATABASE = {
    campaigns: [
        {
            id: "icebound",
            title: "Icebound",
            description: "An Antarctic-like survival campaign set roughly 1000 years before the present day (1000 BP) in the freezing, treacherous peaks of northern Avantris."
        },
        {
            id: "curse-of-strahdanya",
            title: "Curse of Strahdanya",
            description: "A dark gothic horror campaign set in the mist-shrouded valley of Barovia (~400 BP), featuring a gender-swapped Countess Strahdanya von Zarovich as the main antagonist."
        },
        {
            id: "beneath-dark-wings",
            title: "Beneath Dark Wings",
            description: "A high-stakes dark fantasy campaign taking place approximately 200 years before the present day (200 BP), exploring the skies, airships, and hidden threats of Avantris."
        },
        {
            id: "shroud-over-saltmarsh",
            title: "Shroud Over Saltmarsh",
            description: "A maritime campaign set in the doomed port town of Saltmarsh (~190 BP), featuring shipwrecks, smuggling rings, and dark oceanic horrors."
        },
        {
            id: "edge-of-midnight",
            title: "Edge of Midnight",
            description: "A gritty fantasy campaign set in a realm of eternal night and steam, occurring about 100 years before the present day (~100 BP)."
        },
        {
            id: "once-upon-a-witchlight",
            title: "Once Upon a Witchlight",
            description: "A whimsical, chaotic, and comedic D&D 5e campaign set in the magical planes of the Feywild (~15 BP). Follows the Carnivàle Lecroux as they escape mobs and search for lost memories."
        },
        {
            id: "prime",
            title: "Prime",
            description: "The central campaign set in the present day (Year 0), anchoring the timeline of the world of Avantris with major global events and legendary characters."
        },
        {
            id: "uprooted",
            title: "Uprooted: Dimwits of the Dimwood",
            description: "A woodland adventure inspired by the 'Root' board game. Details the chaotic journeys of small animal vagabonds navigating forest politics, ruins, and predator factions."
        },
        {
            id: "stardust-rhapsody",
            title: "Stardust Rhapsody",
            description: "A comedic, space-opera campaign featuring the crew of the Rhapsody as they navigate cosmic empires, alien worlds, and galactic chaos."
        },
        {
            id: "neon-odyssey",
            title: "Neon Odyssey",
            description: "A sci-fi/fantasy campaign set in a high-tech space setting featuring massive megacorporations, cybernetic upgrades, and the Bloodfleet."
        }
    ],
    characters: [
        {
            id: "rowland-stonebridge",
            campaignId: "icebound",
            name: "Rowland Stonebridge",
            race: "Human (Cabin Boy)",
            class: "Cabin Boy",
            stats: { STR: 8, DEX: 12, CON: 10, INT: 10, WIS: 12, CHA: 11 },
            bio: "The young cabin boy of the More Abound and son of Captain Vermeil. After the ship crashed on Drakkar, he discovered the horrifying secret that the remaining crew had resorted to cannibalism. He fled, but was found too late by the adventuring party, dying of trauma and exposure.",
            quotes: [
                "They... they aren't eating salt pork anymore. Please don't go near the galley...",
                "Father tried to save us. But the cold changed them."
            ]
        },
        {
            id: "fenten-armstead",
            campaignId: "icebound",
            name: "Fenten Armstead",
            race: "Human",
            class: "Boatswain (Bosun)",
            stats: { STR: 14, DEX: 13, CON: 14, INT: 10, WIS: 11, CHA: 12 },
            bio: "The loyal human boatswain of the More Abound and owner of the orange cat Fiesta. During the desperate struggle for survival after the ship was frozen in Drakkar's ice floes, Fenten stayed loyal to Captain Vermeil but was unfortunately slain by mutinous crew members.",
            quotes: [
                "Keep the rigging tight! Fiesta, get down from the mast!",
                "A storm is brewing, and this ice isn't friendly."
            ]
        },
        {
            id: "fiesta-cat",
            campaignId: "icebound",
            name: "Fiesta the Cat",
            race: "Cat",
            class: "Orange Tabaxi (Mascot)",
            stats: { STR: 3, DEX: 15, CON: 10, INT: 4, WIS: 12, CHA: 14 },
            bio: "An orange cat with green eyes belonging to Fenten Armstead. Fiesta accompanied Fenten aboard the More Abound, acting as the ship's beloved mascot and rodent hunter before the shipwreck.",
            quotes: [
                "*Meow* (Fiesta stares into the frozen blizzard, tail twitching)",
                "*Purr* (Fiesta rubs against your boots, seeking warmth)"
            ]
        },
        {
            id: "walker-clemons",
            campaignId: "icebound",
            name: "Walker Clemons",
            race: "Human (Herald of Fear)",
            class: "Mutineer / Cannibal",
            stats: { STR: 15, DEX: 12, CON: 16, INT: 10, WIS: 9, CHA: 8 },
            bio: "A crewman aboard the More Abound who led the mutiny against Captain Vermeil. Consumed by hunger and the madness of Drakkar's subzero wastes, he led the survivors in cannibalism, eventually transforming into a monstrous Herald of Fear.",
            quotes: [
                "The meat... it stays fresh in the frost. It's the only way we survive.",
                "Vermeil's medicine won't fill our bellies!"
            ]
        },
        {
            id: "princess-of-wrath",
            campaignId: "icebound",
            name: "The Princess of Wrath",
            race: "Ancient White Dragon",
            class: "Dragon Boss",
            stats: { STR: 22, DEX: 10, CON: 20, INT: 10, WIS: 12, CHA: 12 },
            bio: "The absolute tyrant of Drakkar's frozen skies. An ancient white dragon of immense power who resides in the ruined frost city of Argentholme. She attacked and crushed the More Abound cargo ship, trapping the survivors in her frozen domain.",
            quotes: [
                "Drakkar is mine. Your ship, your bones, and your souls are now frozen artifacts in my gallery.",
                "(An earsplitting roar echoes across the glacial peaks as frost breath freezes the sails)"
            ]
        },
        {
            id: "peggy-flyler",
            campaignId: "uprooted",
            name: "Peggy Flyler (Penny)",
            race: "Frog",
            class: "Wizard (School of Divination)",
            stats: { STR: 8, DEX: 16, CON: 12, INT: 18, WIS: 14, CHA: 10 },
            bio: "The chaotic, slightly unhinged frog wizard of the Dimwood. Peggy (frequently nicknamed Penny by local vagabonds) uses portents and cards to glimpse the future, though her chaotic antics often leave her allies as bewildered as her foes.",
            quotes: [
                "The cards do not lie! Or maybe they do, but I like the colors!",
                "Ribbit! Stand back, I am about to perform high divination!"
            ]
        },
        {
            id: "barnabos-dreadwake",
            campaignId: "icebound",
            name: "Barnabos the Dreadwake",
            race: "Triton",
            class: "Barbarian (Path of the Beast)",
            stats: { STR: 17, DEX: 14, CON: 16, INT: 8, WIS: 12, CHA: 10 },
            bio: "A powerful triton barbarian stranded in the frozen glaciers of northern Avantris (~1000 BP). Gifted with the primal fury of the ocean depths, Barnabos shifts into beast-like states to survive the biting subzero cold.",
            quotes: [
                "The ice does not care for your warmth. Only steel and bone endure.",
                "Let the beast out! It is warmer under the pelt!",
                "For the deep tides!"
            ]
        },
        {
            id: "jornir-frost",
            campaignId: "icebound",
            name: "Jornir",
            race: "Firbolg",
            class: "Druid (Circle of the Land - Tundra)",
            stats: { STR: 14, DEX: 10, CON: 16, INT: 10, WIS: 18, CHA: 12 },
            bio: "A giant-kin who channels the freezing winds and frozen pine spirits to help the shipwrecked crew survive Drakkar.",
            quotes: [
                "The spirits of the frozen forest whisper to us in the blizzard.",
                "The tundra provides, even in the teeth of the gale."
            ]
        },
        {
            id: "queenie-march",
            campaignId: "icebound",
            name: "Queenie March",
            race: "Rabbitfolk",
            class: "Ranger",
            stats: { STR: 12, DEX: 18, CON: 14, INT: 10, WIS: 14, CHA: 10 },
            bio: "The party's scout, fleet-footed and adept at tracking game across the frozen, barren tundra.",
            quotes: [
                "Stay close, and walk in my footprints. The drifts are deep.",
                "I track what others cannot see."
            ]
        },
        {
            id: "skrimm-stabbaskotch",
            campaignId: "icebound",
            name: "Skrimm Stabbaskotch",
            race: "Goblin",
            class: "Warlock",
            stats: { STR: 8, DEX: 16, CON: 14, INT: 12, WIS: 10, CHA: 16 },
            bio: "A mischievous goblin who hears whispers from an ancient god frozen deep inside a glacial crevasse.",
            quotes: [
                "It speaks to me from under the blue ice. It says we must dig!",
                "Who needs a torch when the ice glows?"
            ]
        },
        {
            id: "taishen-fireblossom",
            campaignId: "icebound",
            name: "Taishen Fireblossom",
            race: "Red Dragonborn",
            class: "Sorcerer",
            stats: { STR: 10, DEX: 14, CON: 15, INT: 10, WIS: 10, CHA: 18 },
            bio: "A warm-blooded sorcerer whose fire magic is the only thing keeping the party from freezing to death during blizzard nights.",
            quotes: [
                "Gather round the flame, or the frost will claim your bones before dawn.",
                "Let my blood boil against this cold."
            ]
        },
        {
            id: "captain-vermeil",
            campaignId: "icebound",
            name: "Captain Vermeil",
            race: "Human (NPC)",
            class: "Grizzled Captain",
            stats: { STR: 14, DEX: 12, CON: 14, INT: 10, WIS: 12, CHA: 14 },
            bio: "The grizzled, stern captain of the merchant ship More Abound who commands the survivors after they crash on Drakkar.",
            quotes: [
                "This crew survives together, or we freeze in isolation."
            ]
        },
        {
            id: "professor-azran",
            campaignId: "curse-of-strahdanya",
            name: "Professor Clayton Azran",
            race: "Human",
            class: "Wizard (School of Divination)",
            stats: { STR: 8, DEX: 12, CON: 14, INT: 18, WIS: 16, CHA: 10 },
            bio: "An eccentric academic scholar who led the expedition into the foggy valleys of Barovia (~400 BP). Prof. Azran uses divination spells to pierce the mists and study planar rifts, struggling constantly to maintain his composure against Countess Strahdanya.",
            quotes: [
                "Fascinating... the planar weave here is warped beyond recognition.",
                "Strahdanya is not just a monster; she is a thermodynamic impossibility!",
                "My calculations are never wrong! They are merely... temporarily misaligned."
            ]
        },
        {
            id: "victoria-isaacs",
            campaignId: "curse-of-strahdanya",
            name: "Victoria Isaacs",
            race: "Half-Elf Shadar-kai",
            class: "Sorcerer (Shadow Magic)",
            stats: { STR: 10, DEX: 14, CON: 13, INT: 12, WIS: 10, CHA: 18 },
            bio: "A mysterious woman born under the influence of the Shadowfell, whose magic lets her slip through mists and command shadow hounds.",
            quotes: [
                "The mists are my ally; they bend to my shadow.",
                "Do not fear the dark. Fear what lives within it."
            ]
        },
        {
            id: "kana-soyokaze",
            campaignId: "curse-of-strahdanya",
            name: "Kana Soyokaze",
            race: "Human",
            class: "Fighter (Samurai)",
            stats: { STR: 18, DEX: 14, CON: 16, INT: 10, WIS: 12, CHA: 10 },
            bio: "A disciplined warrior who swore an oath of loyalty to protect Professor Azran's expedition at all costs.",
            quotes: [
                "My blade is sworn to the Professor, and my shield to this expedition.",
                "One strike. One decision."
            ]
        },
        {
            id: "sarnax-edelwood",
            campaignId: "curse-of-strahdanya",
            name: "Sarnax of the Edelwood",
            race: "Treant-kin",
            class: "Woodland Sorcerer",
            stats: { STR: 12, DEX: 10, CON: 15, INT: 10, WIS: 12, CHA: 16 },
            bio: "A vegetative sorcerer whose woody flesh is decaying due to the dark corrupting energies of Barovian soil.",
            quotes: [
                "My leaves are falling, but the roots still run deep in this dark earth."
            ]
        },
        {
            id: "strahdanya-von-zarovich",
            campaignId: "curse-of-strahdanya",
            name: "Countess Strahdanya von Zarovich",
            race: "Vampire (Antagonist)",
            class: "Vampire Lord",
            stats: { STR: 18, DEX: 18, CON: 18, INT: 20, WIS: 18, CHA: 18 },
            bio: "The vampire ruler of Barovia. A gender-swapped, tyrannical countess who toys with the party's minds from her castle ravenloft.",
            quotes: [
                "Welcome to my valley. You will find that escape is... a relative term.",
                "I am the land, and the mists are my eyes."
            ]
        },
        {
            id: "toa-kamanui",
            campaignId: "beneath-dark-wings",
            name: "Toa Kamanui",
            race: "Goliath",
            class: "Barbarian (Ancestral Guardian)",
            stats: { STR: 19, DEX: 13, CON: 17, INT: 8, WIS: 12, CHA: 9 },
            bio: "A towering goliath barbarian sailing the sky lanes (~200 BP). Bound to the spirits of his ancestors, Toa fights to defend his airship crew from planar sky-predators and imperial forces.",
            quotes: [
                "My ancestors watch us from the clouds! Do not make them laugh at you.",
                "Throw me at the enemy airship! Trust me!",
                "Clear the decks!"
            ]
        },
        {
            id: "iris-sands",
            campaignId: "beneath-dark-wings",
            name: "Iris of the Sands",
            race: "Tabaxi",
            class: "Cleric",
            stats: { STR: 10, DEX: 16, CON: 14, INT: 12, WIS: 18, CHA: 14 },
            bio: "A highly capable Tabaxi navigation specialist and cleric, steering the Kestrel through storms.",
            quotes: [
                "The stars do not lie, and neither does my compass.",
                "A storm is just nature trying to clear the path."
            ]
        },
        {
            id: "felix-ackerman",
            campaignId: "beneath-dark-wings",
            name: "Felix Ackerman",
            race: "Human",
            class: "Wizard",
            stats: { STR: 8, DEX: 14, CON: 12, INT: 18, WIS: 14, CHA: 10 },
            bio: "A sky-faring wizard specializing in aerial flight runes and storm manipulation spell matrices.",
            quotes: [
                "Runes in the air, magic in the wind. Hold onto the rigging!",
                "Aether currents are highly predictable if you know the math."
            ]
        },
        {
            id: "lufti-genasi",
            campaignId: "beneath-dark-wings",
            name: "Lufti",
            race: "Air Genasi",
            class: "Monk",
            stats: { STR: 12, DEX: 19, CON: 14, INT: 10, WIS: 15, CHA: 10 },
            bio: "An agile air genasi monk who performs acrobatics in the rigging of the Kestrel.",
            quotes: [
                "The wind holds me up. Gravity is just a recommendation.",
                "Swift as the breeze."
            ]
        },
        {
            id: "poros-malthea",
            campaignId: "shroud-over-saltmarsh",
            name: "Paladin Poros of Malthea",
            race: "Aasimar",
            class: "Paladin (Oath of Glory)",
            stats: { STR: 16, DEX: 10, CON: 14, INT: 10, WIS: 12, CHA: 18 },
            bio: "A glorious aasimar paladin serving aboard the Azure Maiden (~190 BP). Poros seeks legendary deeds in the coastal port of Saltmarsh, fighting oceanic cults and uncovering smuggling conspiracies.",
            quotes: [
                "Let my halo illuminate the dark ocean trenches!",
                "Smugglers and sea devils, prepare to face the light!",
                "A hero's path is carved in Saltmarsh water."
            ]
        },
        {
            id: "monty-crumb",
            campaignId: "shroud-over-saltmarsh",
            name: "Monty Crumb",
            race: "Human",
            class: "Rogue",
            stats: { STR: 10, DEX: 18, CON: 12, INT: 12, WIS: 10, CHA: 14 },
            bio: "The sneaky, cook-turned-thief of the ship Azure Maiden who is always looking for lost gold coins.",
            quotes: [
                "A pinch of salt in the stew, and a pinch of gold in my pocket.",
                "They never look up. Especially not the guards."
            ]
        },
        {
            id: "kaiyo-pearlfin",
            campaignId: "shroud-over-saltmarsh",
            name: "Kaiyo Pearlfin",
            race: "Triton",
            class: "Druid",
            stats: { STR: 12, DEX: 12, CON: 14, INT: 10, WIS: 18, CHA: 12 },
            bio: "A defender of the deep sea ecosystems who fights smuggler rings polluting the coastal waters of Saltmarsh.",
            quotes: [
                "The sea remembers every drop of poison we pour into it.",
                "Nature does not end at the shoreline."
            ]
        },
        {
            id: "lethica-nightborne",
            campaignId: "edge-of-midnight",
            name: "Lethica Nightborne",
            race: "Twilight Elf",
            class: "Cleric (Stryga Loss Domain)",
            stats: { STR: 10, DEX: 14, CON: 14, INT: 12, WIS: 18, CHA: 14 },
            bio: "A sombre, dedicated investigator who seeks to purge the curses plagueing the steam-filled lands of Druskenvald.",
            quotes: [
                "The mists do not hide the shadows; they are the shadows.",
                "Stryga's reach is long, but our resolve must be longer."
            ]
        },
        {
            id: "jericho-sticks",
            campaignId: "edge-of-midnight",
            name: "Jericho Sticks",
            race: "Scarecrow",
            class: "Bard (College of Whispers)",
            stats: { STR: 10, DEX: 16, CON: 12, INT: 14, WIS: 10, CHA: 18 },
            bio: "An animated scarecrow bard bound to crop magic. Jericho gathers the secrets of the dead to power his songs and whispers them to unhinge his enemies.",
            quotes: [
                "I am made of straw, but my words are heavy as lead.",
                "Stryga's wolves are howling. Shall we join the choir?",
                "I have a song for you... it ends in silence."
            ]
        },
        {
            id: "briggsy-kratch",
            campaignId: "edge-of-midnight",
            name: "Briggsy Kratch",
            race: "Jinxcursed (Zombie)",
            class: "Warlock (Crossroads Patron)",
            stats: { STR: 12, DEX: 10, CON: 16, INT: 10, WIS: 8, CHA: 18 },
            bio: "A walking corpse bound by a curse of bad luck. Briggsy made a deal at a planar crossroads to prolong his decay, trading fortune for survival.",
            quotes: [
                "I'm already dead, mate. The worst thing that can happen to me is I fall apart a bit faster.",
                "Bad luck is still luck, right?"
            ]
        },
        {
            id: "marius-renathyr",
            campaignId: "edge-of-midnight",
            name: "Marius Renathyr",
            race: "Dhampir",
            class: "Blood Hunter",
            stats: { STR: 16, DEX: 16, CON: 14, INT: 10, WIS: 14, CHA: 10 },
            bio: "A lethal stalker of the night who balances vampiric urges with protecting mortal villages in Druskenvald.",
            quotes: [
                "Blood calls to blood, but steel calls to beasts.",
                "I walk in both worlds, but serve only one."
            ]
        },
        {
            id: "farryn-hartsblight",
            campaignId: "edge-of-midnight",
            name: "Farryn of the Hartsblight",
            race: "Satyr",
            class: "Ranger",
            stats: { STR: 10, DEX: 18, CON: 14, INT: 12, WIS: 14, CHA: 10 },
            bio: "A corrupted woodland guide who tracks beasts that cross from the Feywild boundaries into Druskenvald.",
            quotes: [
                "The trees tell tales of teeth in the dark.",
                "Mind your step. The soil remembers."
            ]
        },
        {
            id: "yorgrim-dwarf",
            campaignId: "edge-of-midnight",
            name: "Yorgrim",
            race: "Dwarf",
            class: "Barbarian",
            stats: { STR: 18, DEX: 12, CON: 18, INT: 8, WIS: 10, CHA: 8 },
            bio: "A rugged miner who survived an encounter in the haunted deeps of the Skitterdeep Mine.",
            quotes: [
                "Mine deep enough, and you will eventually hit something that bites back.",
                "Rock and rage!"
            ]
        },
        {
            id: "kremy-lecroux",
            campaignId: "once-upon-a-witchlight",
            name: "Kremy Lecroux",
            race: "Alligator Crocodilefolk",
            class: "Warlock (Death Loa Patron)",
            stats: { STR: 14, DEX: 12, CON: 16, INT: 10, WIS: 8, CHA: 18 },
            bio: "The charismatic, smooth-talking ringleader of the Carnivàle Lecroux. Kremy is an alligator-like creature who wears fancy coats, carries a silver cane, and has a pact with a mysterious Death Loa patron. He leads his crew with confidence, though his schemes often end in chaos and narrow escapes.",
            quotes: [
                "Ah, my lovely friends, welcome to Carnivàle Lecroux! Step inside, don't mind the teeth.",
                "I have a contract. And my patron does not like uncompleted business.",
                "You see, a swamp is a lot like a family. It's warm, it's wet, and someone is always trying to eat you."
            ]
        },
        {
            id: "gideon-coal",
            campaignId: "once-upon-a-witchlight",
            name: "Gideon Coal",
            race: "Fire Genasi",
            class: "Fighter (Chain Brawler)",
            stats: { STR: 18, DEX: 12, CON: 16, INT: 8, WIS: 10, CHA: 12 },
            bio: "The powerhouse muscle of the Carnivàle Lecroux. Gideon is a fire genasi with a blazing temper and chains wrapped around his arms. While loyal and protective of Kremy and the group, Gideon has a comedic and highly unfortunate habit of accidentally punching clowns to death.",
            quotes: [
                "If it breathes, I can punch it. If it doesn't breathe, I can punch it harder.",
                "Wait, did I kill another clown? I swear it was an accident this time!",
                "Kremy, I'm not saying we should burn the forest down, but it would solve the bug problem."
            ]
        },
        {
            id: "gricko-grimgrin",
            campaignId: "once-upon-a-witchlight",
            name: "Gricko Grimgrin",
            race: "Goblin",
            class: "Druid (Circle of the Moon)",
            stats: { STR: 10, DEX: 16, CON: 14, INT: 6, WIS: 18, CHA: 8 },
            bio: "An illiterate, wild goblin druid who formerly worked at the Witchlight Carnival. Gricko has a chaotic love for nature, speaks in a high-pitched raspy voice, and travels everywhere with his companion Hootsie. He has a habit of eating rocks and interpreting writing as 'angry bugs.'",
            quotes: [
                "Hootsie, look! A shiny rock! Can we eat it? Let's eat it.",
                "I cannot read! Letters are just angry bugs on paper.",
                "Nature is beautiful! And also full of sharp teeth and poison slime!"
            ]
        },
        {
            id: "morning-frost",
            campaignId: "once-upon-a-witchlight",
            name: "Morning Frost",
            race: "Tiger Tabaxi",
            class: "Sorcerer (Wild Magic)",
            stats: { STR: 10, DEX: 18, CON: 12, INT: 12, WIS: 8, CHA: 18 },
            bio: "A highly flamboyant, self-absorbed tiger tabaxi sorcerer. Morning Frost takes great pride in his beautiful fur, his dramatic capes, and his arcane talents. His wild magic sorcery is extremely powerful but highly unpredictable, often resulting in bizarre magical surges.",
            quotes: [
                "Darling, my fur is worth more than this entire village.",
                "Wild magic is like a good cup of tea: warm, soothing, and occasionally causes you to explode.",
                "Oops... I think I turned the tavern keeper blue."
            ]
        },
        {
            id: "chuckles-spirit",
            campaignId: "once-upon-a-witchlight",
            name: "Chuckles the Clown",
            race: "Haunting Specter",
            class: "Clown / Jester",
            stats: { STR: 8, DEX: 14, CON: 12, INT: 14, WIS: 10, CHA: 18 },
            bio: "A malignant, dark fey spirit of a clown who was punched to death by Gideon Coal. Chuckles now haunts Gideon, manifesting at the worst possible times to offer creepy commentary, bad balloon animals, and dark jokes. He has become a mascot of chaotic dread.",
            quotes: [
                "Would you like a balloon? They're filled with my last breaths!",
                "Did you know that skin is remarkably stretchy? Let me show you!",
                "I'm a clown! Gideon, why did you punch me? It really hurt!"
            ]
        },
        {
            id: "rodek-stonehearth",
            campaignId: "prime",
            name: "Rodek Stonehearth",
            race: "Hill Dwarf",
            class: "Cleric (Forge Domain)",
            stats: { STR: 15, DEX: 10, CON: 18, INT: 10, WIS: 16, CHA: 12 },
            bio: "The stout dwarven forge cleric of the Prime era (Present Day / Year 0). Rodek is a traditionalist dwarf who loves heavy hammers, fine ironworks, and stout ale, defending his party from threats of the modern age.",
            quotes: [
                "A dwarf is only as good as the steel in his hand and the ale in his cup.",
                "Forge fire burns away all darkness!",
                "Hold the line, lads! We've got work to do."
            ]
        },
        {
            id: "vandrys-truestrike",
            campaignId: "prime",
            name: "Vandrys Truestrike",
            race: "Elf",
            class: "Rogue (Archer)",
            stats: { STR: 12, DEX: 18, CON: 14, INT: 10, WIS: 14, CHA: 12 },
            bio: "A lethal elven archer and scout who maps the shifting borders of Prime.",
            quotes: [
                "An arrow speaks louder than words when negotiations fail.",
                "Keep your distance, and I'll keep you safe."
            ]
        },
        {
            id: "anulin-wizard",
            campaignId: "prime",
            name: "Anulin",
            race: "Elf",
            class: "Wizard",
            stats: { STR: 8, DEX: 14, CON: 12, INT: 18, WIS: 16, CHA: 10 },
            bio: "An elven wizard conducting dimensional research into the planar fractures leaking fey magic.",
            quotes: [
                "The dimensional ley lines are cracking. We must seal them.",
                "A portal is a door that should remain locked."
            ]
        },
        {
            id: "sylvie-druid",
            campaignId: "prime",
            name: "Sylvie",
            race: "Halfling",
            class: "Druid",
            stats: { STR: 10, DEX: 14, CON: 14, INT: 10, WIS: 18, CHA: 12 },
            bio: "A halfling druid who heals continental root systems corrupted by ancient shadow leaks.",
            quotes: [
                "Listen to the moss. It remembers the worlds that came before.",
                "The roots always tell the truth."
            ]
        },
        {
            id: "bitsy-mouse",
            campaignId: "uprooted",
            name: "Bitsy",
            race: "Field Mouse",
            class: "Rogue (Thief)",
            stats: { STR: 6, DEX: 20, CON: 12, INT: 14, WIS: 12, CHA: 14 },
            bio: "An incredibly small but exceptionally angry field mouse who works as a rogue. Bitsy carries a needle-like rapier and has a fierce temper, constantly threatening to bite the ankles of any predator that underestimates her size.",
            quotes: [
                "I am small, but my rage is immeasurable!",
                "Don't step on me, I will bite your ankles until you bleed.",
                "Stealth is easy when you're the size of a pinecone."
            ]
        },
        {
            id: "grumley-badger",
            campaignId: "uprooted",
            name: "Grumley",
            race: "Badger",
            class: "Barbarian (Path of the Giant)",
            stats: { STR: 18, DEX: 10, CON: 18, INT: 8, WIS: 12, CHA: 8 },
            bio: "A big, lazy badger barbarian who travels the Dimwood. Grumley prefers cooking meals and taking long naps by the campfire, but if provoked or if his friends are in danger, he goes into a giant rage and smashes foes with a massive iron frying pan.",
            quotes: [
                "A good nap is worth three gold coins.",
                "Wait, we're fighting? But I just set up my campfire!",
                "Now you've gone and ruined my stew. Prepare to get pancaked!"
            ]
        },
        {
            id: "hazel-squirrel",
            campaignId: "uprooted",
            name: "Hazel",
            race: "Squirrel",
            class: "Ranger",
            stats: { STR: 10, DEX: 17, CON: 14, INT: 12, WIS: 14, CHA: 10 },
            bio: "A quick-witted squirrel archer who defends the canopy from cat soldiers.",
            quotes: [
                "One shot, one nut. Keep your eyes on the branches.",
                "The canopy belongs to the Alliance."
            ]
        },
        {
            id: "captain-pyke",
            campaignId: "stardust-rhapsody",
            name: "Captain Pyke",
            race: "Human",
            class: "Bounty Hunter",
            stats: { STR: 14, DEX: 16, CON: 14, INT: 12, WIS: 12, CHA: 14 },
            bio: "A gruff space bounty hunter who commands the starship Rhapsody through lawless galaxies.",
            quotes: [
                "The bounty is worth more if you're alive, but I don't mind taking a cut.",
                "Business is business, space-farer."
            ]
        },
        {
            id: "rett-pilot",
            campaignId: "stardust-rhapsody",
            name: "Rett",
            race: "Human",
            class: "Ace Pilot",
            stats: { STR: 10, DEX: 18, CON: 12, INT: 14, WIS: 10, CHA: 12 },
            bio: "The hotshot ace pilot of the Rhapsody, known for executing impossible ship dogfight maneuvers.",
            quotes: [
                "Hold onto your seats. I'm going to make us fly through this black hole.",
                "She'll fly true. I built her."
            ]
        },
        {
            id: "chuckles-space",
            campaignId: "stardust-rhapsody",
            name: "Chuckles (Space Jester)",
            race: "Alien Clonal",
            class: "Jester / Rogue",
            stats: { STR: 8, DEX: 16, CON: 12, INT: 14, WIS: 10, CHA: 18 },
            bio: "A space-opera iteration of the infamous clown. Living aboard the starship Rhapsody, this Chuckles is a mischievous galactic rogue who jokes with plasma cannons, space entities, and dangerous cosmic emperors.",
            quotes: [
                "Would you like a space balloon? It's filled with antimatter!",
                "Did you know that gravity is just a suggestion? Boing!",
                "Squeak! Gideon, you can't punch me in a vacuum!"
            ]
        },
        {
            id: "vigilante-neon",
            campaignId: "neon-odyssey",
            name: "Vigilante Neon",
            race: "Cyborg",
            class: "Rogue (Cyber-Infiltrator)",
            stats: { STR: 12, DEX: 19, CON: 14, INT: 15, WIS: 10, CHA: 10 },
            bio: "A cybernetically enhanced infiltrator fighting the megacorporate Bloodfleet in the neon-drenched future of Avantris. Outfitted with light-blades, hacking implants, and stealth skin modulators.",
            quotes: [
                "Corporate firewalls are made to be shattered.",
                "Stealth-cam cloak activated. You won't see the blade.",
                "Bloodfleet, offline."
            ]
        },
        {
            id: "bloodfleet-defector",
            campaignId: "neon-odyssey",
            name: "Bloodfleet Defector",
            race: "Cyborg",
            class: "Fighter",
            stats: { STR: 16, DEX: 12, CON: 15, INT: 10, WIS: 10, CHA: 12 },
            bio: "A former shock trooper of the Bloodfleet corporate navy who defected to the outer system resistance.",
            quotes: [
                "I fired my last shot for the corporation. Now I fire for the crew.",
                "The corporate chain has been broken."
            ]
        }
    ],
    locations: [
        {
            id: "drakkar-frost-wastes",
            campaignId: "icebound",
            name: "Drakkar Frost Wastes",
            description: "A freezing, treacherous wasteland in northern Avantris where survivors fight blizzards and ice giants.",
            danger: "Extremely High (Freezing storms, polar giants, and frozen rifts)"
        },
        {
            id: "castle-ravenloft",
            campaignId: "curse-of-strahdanya",
            name: "Castle Ravenloft",
            description: "The gothic stronghold of Countess Strahdanya von Zarovich, looming high on a cliff over the Barovian valley.",
            danger: "Lethal (Vampire traps, gargoyles, and dark counts)"
        },
        {
            id: "death-house",
            campaignId: "curse-of-strahdanya",
            name: "Death House",
            description: "A haunted, sanity-draining manor on the edge of the Barovian woods.",
            danger: "High (Sanity drains, ghastly ghosts)"
        },
        {
            id: "skyport-stryga",
            campaignId: "beneath-dark-wings",
            name: "Skyport Stryga",
            description: "A floating island harbor and sky-city that served as the center of aerial commerce before the great collapse.",
            danger: "Moderate (Sky pirates, imperial border checks)"
        },
        {
            id: "saltmarsh-port",
            campaignId: "shroud-over-saltmarsh",
            name: "Saltmarsh Port",
            description: "A damp coastal port town infested with sea-devils, smugglers, and underwater cults.",
            danger: "Moderate (Nautical mutineers, smuggling traps)"
        },
        {
            id: "druskenvald-streets",
            campaignId: "edge-of-midnight",
            name: "Druskenvald Streets",
            description: "Steam-filled cobblestone streets under a sky of eternal night, plagued by werewolves and corporate shadow operations.",
            danger: "High (Steam-mill gangs, werewolves, shadow stalkers)"
        },
        {
            id: "skitterdeep-mine",
            campaignId: "edge-of-midnight",
            name: "Skitterdeep Mine",
            description: "A haunted, deep underground mining complex where workers encountered ancient dark entities.",
            danger: "Extremely High (Tectonic collapses, miners' ghosts, abyss beasts)"
        },
        {
            id: "carnivale-lecroux",
            campaignId: "once-upon-a-witchlight",
            name: "Carnivàle Lecroux",
            description: "A colorful, slightly shady traveling circus caravan run by Kremy Lecroux. It features illusion acts, acrobatics, and exotic beast shows. The carnival serves as a cover for the party's various scams and magic tricks.",
            danger: "Moderate (Mostly angry customers or loose monsters)"
        },
        {
            id: "prismeer-swamps",
            campaignId: "once-upon-a-witchlight",
            name: "The Hither Swamps of Prismeer",
            description: "A soggy feywild swamp ruled by the swamp-hag Bavlorna Blightstraw. The air is misty, the trees are alive, and travelers must watch out for bog boggards, giant dragonflies, and quicksand.",
            danger: "High (Fey curses and dangerous wildlife)"
        },
        {
            id: "stonehearth-forge",
            campaignId: "prime",
            name: "Stonehearth Forge",
            description: "A massive, legendary dwarven mining and metalworking forge at the center of the Prime continent.",
            danger: "Moderate (Rogue elemental embers, deep tremors)"
        },
        {
            id: "dimwood-forest",
            campaignId: "uprooted",
            name: "The Deep Dimwood",
            description: "An ancient, dark canopy forest dominated by factions of warring squirrels, crows, and wild cats. Ruins of old ancient castles are scattered under the roots, containing mysterious magic runes.",
            danger: "High (Predators, bandits, and rival factions)"
        },
        {
            id: "rhapsody-starship",
            campaignId: "stardust-rhapsody",
            name: "The Starship Rhapsody",
            description: "A retro-futurism space vessel piloted by Pyke and Rett, which serves as the crew's mobile base.",
            danger: "Moderate (Cosmic dust, system failures)"
        },
        {
            "id": "megacity-9",
            "campaignId": "neon-odyssey",
            "name": "Megacity 9",
            "description": "A neon-drenched cyberpunk metropolis dominated by corporate guilds and scanner drones.",
            "danger": "High (Bloodfleet corporate agents, hacking traps, drones)"
        }
    ]
};

// ==========================================
// 2. STATE VARIABLES
// ==========================================
let db = null;
let currentCampaign = "all";
let currentCategory = "characters";
let selectedEntityId = null;

// Adventure Mode State
let activeQuestId = null;
let activeHeroId = null;
let activeQuestState = null;
let pendingDiceCheck = null; // { title, stat, dc, successNode, failNode }

// ==========================================
// 3. INITIALIZATION & LIFECYCLE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadDatabase();
    initializeCustomQuests();
    renderCampaignTabs();
    renderCodex();
    populateFormSelects();
    renderDatabaseElementsList();
    renderQuestSetup();
    renderTimeline();
});

// Load database from localStorage or use defaults
function loadDatabase() {
    const saved = localStorage.getItem("avantris_world_db");
    if (saved) {
        try {
            db = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse saved database, resetting.", e);
            db = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
        }
    } else {
        db = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
    }
}

// Save database to localStorage
function saveDbToLocalStorage() {
    localStorage.setItem("avantris_world_db", JSON.stringify(db));
    populateFormSelects();
    renderDatabaseElementsList();
}

// Reset database
function resetDatabaseToDefault() {
    if (confirm("Are you sure you want to restore the database to the default canon lore? All your custom entries will be deleted!")) {
        db = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
        saveDbToLocalStorage();
        renderCampaignTabs();
        renderCodex();
        renderQuestSetup();
        alert("Lore database reset successfully!");
    }
}

// ==========================================
// 4. NAVIGATION / TABS
// ==========================================
function switchTab(tabName) {
    // Hide all sections
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));
    document.querySelectorAll(".nav-tab").forEach(tab => tab.classList.remove("active"));
    
    // Show active section
    document.getElementById(`section-${tabName}`).classList.add("active");
    document.getElementById(`tab-${tabName}`).classList.add("active");

    if (tabName === "adventure") {
        renderQuestSetup();
    } else if (tabName === "timeline") {
        renderTimeline();
    }
}

// ==========================================
// 5. CODEX INTERFACE
// ==========================================
function renderCampaignTabs() {
    const container = document.getElementById("campaign-select-list");
    container.innerHTML = "";
    
    // Add "All" option
    const allBtn = document.createElement("button");
    allBtn.className = `sidebar-btn ${currentCampaign === "all" ? "active" : ""}`;
    allBtn.innerText = "All Worlds";
    allBtn.onclick = () => selectCampaign("all");
    container.appendChild(allBtn);
    
    // Add specific campaigns
    db.campaigns.forEach(c => {
        const btn = document.createElement("button");
        btn.className = `sidebar-btn ${currentCampaign === c.id ? "active" : ""}`;
        btn.innerText = c.title;
        btn.onclick = () => selectCampaign(c.id);
        container.appendChild(btn);
    });
}

function selectCampaign(campaignId) {
    currentCampaign = campaignId;
    renderCampaignTabs();
    renderCodex();
}

const DEFAULT_COMPENDIUM = {
    classes: [
        {
            id: "fighter",
            name: "Fighter Class",
            source: "Legends of Avantris / D&D 5e Standard",
            hitDice: "1d10",
            primaryStat: "Strength or Dexterity",
            description: "Fighters are master combatants of weapons and battlefield tactics. In Avantris campaigns (like Once Upon a Witchlight), Gideon Coal represents the subclass of heavy frontline protection, combining pure physical force with tactical actions.",
            features: [
                { name: "Action Surge", desc: "Instantly regain 1 Main Action to use on the current combat turn (usable once per combat encounter)." },
                { name: "Second Wind", desc: "Regain 1d10 + Constitution modifier HP as a Bonus Action (usable once per combat)." }
            ]
        },
        {
            id: "rogue",
            name: "Rogue Class",
            source: "Legends of Avantris / D&D 5e Standard",
            hitDice: "1d8",
            primaryStat: "Dexterity",
            description: "Rogues use stealth, precision strikes, and sneak attacks to outmaneuver opponents. Kremy Lispon represents the Arcane Trickster rogue, combining stealth tactics with arcane trickery and illusion magic.",
            features: [
                { name: "Sneak Attack", desc: "Deals +2d6 extra damage once per turn when attacking a target adjacent to another ally." },
                { name: "Cunning Action", desc: "Allows player to Dash, Dodge, or Disengage as a Bonus Action instead of a Main Action." }
            ]
        },
        {
            id: "fey-sorcerer",
            name: "Fey Sorcerer Class",
            source: "Legends of Avantris Homebrew Rules",
            hitDice: "1d6",
            primaryStat: "Charisma",
            description: "Sorcerers possess innate magic granted by planar bloodlines or Feywild exposure. Magic flows naturally, sometimes triggering chaotic Wild Magic Surges during spell casting.",
            features: [
                { name: "Wild Magic Surge", desc: "Rolls a d6 on spell cast to trigger a random chaotic effect (e.g. fire burst, healing, or disadvantage)." }
            ]
        },
        {
            id: "dryad-sentinel",
            name: "Dryad Sentinel Class",
            source: "Uprooted Campaign Rules",
            hitDice: "1d8",
            primaryStat: "Wisdom",
            description: "Dryad Sentinels are forest defenders who can call upon the woodland plane of the Deep Dimwood (like Peggy/Penny in Uprooted) to summon vines and roots.",
            features: [
                { name: "Dryad Growth", desc: "Summons vines that entrap an enemy, dealing 1d6 piercing damage and reducing their movement speed by 2 cells." }
            ]
        }
    ],
    races: [
        {
            id: "human",
            name: "Human",
            description: "Highly adaptable, found across all sea continents of Avantris.",
            abilityScoreIncrease: "+1 to all stats"
        },
        {
            id: "dryad",
            name: "Dryad",
            description: "Nature spirits bound to ancient trees, prominent in the woodland spin-off Uprooted.",
            abilityScoreIncrease: "+2 Wisdom, +1 Dexterity"
        },
        {
            id: "cyborg",
            name: "Cyborg",
            description: "Constructed or enhanced humanoids found in Neon Odyssey.",
            abilityScoreIncrease: "+2 Constitution, +1 Strength"
        }
    ]
};

function switchCodexCategory(category) {
    currentCategory = category;
    document.getElementById("cat-btn-chars").classList.toggle("active", category === "characters");
    document.getElementById("cat-btn-locs").classList.toggle("active", category === "locations");
    document.getElementById("cat-btn-rules").classList.toggle("active", category === "rules");
    renderCodex();
}

function renderCodex() {
    const grid = document.getElementById("entity-grid-container");
    grid.innerHTML = "";
    
    const searchVal = document.getElementById("codex-search").value.toLowerCase();
    
    let items = [];
    if (currentCategory === "characters") {
        items = db.characters;
    } else if (currentCategory === "locations") {
        items = db.locations;
    } else if (currentCategory === "rules") {
        items = DEFAULT_COMPENDIUM.classes.concat(DEFAULT_COMPENDIUM.races);
    }
    
    // Filter by campaign (skip for rules)
    if (currentCampaign !== "all" && currentCategory !== "rules") {
        items = items.filter(i => i.campaignId === currentCampaign);
    }
    
    // Filter by search
    if (searchVal) {
        items = items.filter(i => {
            return i.name.toLowerCase().includes(searchVal) || 
                   (i.race && i.race.toLowerCase().includes(searchVal)) ||
                   (i.class && i.class.toLowerCase().includes(searchVal)) ||
                   (i.bio && i.bio.toLowerCase().includes(searchVal)) ||
                   (i.description && i.description.toLowerCase().includes(searchVal)) ||
                   (i.primaryStat && i.primaryStat.toLowerCase().includes(searchVal)) ||
                   (i.source && i.source.toLowerCase().includes(searchVal));
        });
    }
    
    if (items.length === 0) {
        grid.innerHTML = `<div class="no-results">No records found matching these criteria.</div>`;
        return;
    }
    
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = `entity-card ${selectedEntityId === item.id ? "active" : ""}`;
        card.onclick = () => selectEntity(item.id);
        
        let metaText = "";
        let descPreview = "";
        
        if (currentCategory === "characters") {
            metaText = `${item.race} • ${item.class}`;
            descPreview = item.bio;
        } else if (currentCategory === "locations") {
            metaText = `Location • Danger: ${item.danger || 'Unknown'}`;
            descPreview = item.description;
        } else if (currentCategory === "rules") {
            metaText = item.primaryStat ? `Class • Primary: ${item.primaryStat}` : "Race Traits";
            descPreview = item.description;
        }
        
        // Custom badge
        const isCustom = item.isCustom ? `<span class="custom-badge">Custom</span>` : "";
        
        card.innerHTML = `
            ${isCustom}
            <h4>${item.name}</h4>
            <div class="entity-meta">${metaText}</div>
            <p class="entity-preview">${descPreview}</p>
        `;
        grid.appendChild(card);
    });
}

function filterCodex() {
    renderCodex();
}

function selectEntity(id) {
    selectedEntityId = id;
    
    // Update active visual class on grid cards
    document.querySelectorAll(".entity-card").forEach(card => {
        card.classList.remove("active");
    });
    
    // Re-render codex to apply the selection state easily
    renderCodex();
    
    // Render Inspector
    const placeholder = document.getElementById("inspector-placeholder");
    const content = document.getElementById("inspector-content");
    
    let entity = null;
    let type = "";
    
    if (currentCategory === "characters") {
        entity = db.characters.find(c => c.id === id);
        type = "character";
    } else if (currentCategory === "locations") {
        entity = db.locations.find(l => l.id === id);
        type = "location";
    } else if (currentCategory === "rules") {
        entity = DEFAULT_COMPENDIUM.classes.find(c => c.id === id) || DEFAULT_COMPENDIUM.races.find(r => r.id === id);
        type = "rule";
    }
    
    if (!entity) {
        placeholder.classList.remove("hidden");
        content.classList.add("hidden");
        return;
    }
    
    placeholder.classList.add("hidden");
    content.classList.remove("hidden");
    
    let inspectorHtml = "";
    
    if (type === "character") {
        const campaignTitle = db.campaigns.find(c => c.id === entity.campaignId)?.title || "Unknown Campaign";
        const getMod = (val) => {
            const mod = Math.floor((val - 10) / 2);
            return mod >= 0 ? `+${mod}` : `${mod}`;
        };
        
        inspectorHtml = `
            <h2>${entity.name}</h2>
            <div class="inspector-type">${entity.race} • ${entity.class}</div>
            <p class="entity-meta" style="margin-bottom: 1rem;">World: ${campaignTitle}</p>
            
            <div class="inspector-stats-grid">
                <div class="stat-block">
                    <span class="stat-name">STR</span>
                    <span class="stat-value">${entity.stats.STR}</span>
                    <span class="stat-mod">${getMod(entity.stats.STR)}</span>
                </div>
                <div class="stat-block">
                    <span class="stat-name">DEX</span>
                    <span class="stat-value">${entity.stats.DEX}</span>
                    <span class="stat-mod">${getMod(entity.stats.DEX)}</span>
                </div>
                <div class="stat-block">
                    <span class="stat-name">CON</span>
                    <span class="stat-value">${entity.stats.CON}</span>
                    <span class="stat-mod">${getMod(entity.stats.CON)}</span>
                </div>
                <div class="stat-block">
                    <span class="stat-name">INT</span>
                    <span class="stat-value">${entity.stats.INT}</span>
                    <span class="stat-mod">${getMod(entity.stats.INT)}</span>
                </div>
                <div class="stat-block">
                    <span class="stat-name">WIS</span>
                    <span class="stat-value">${entity.stats.WIS}</span>
                    <span class="stat-mod">${getMod(entity.stats.WIS)}</span>
                </div>
                <div class="stat-block">
                    <span class="stat-name">CHA</span>
                    <span class="stat-value">${entity.stats.CHA}</span>
                    <span class="stat-mod">${getMod(entity.stats.CHA)}</span>
                </div>
            </div>
            
            <h3 class="inspector-desc-title">Biography & Lore</h3>
            <p class="inspector-desc-text">${entity.bio}</p>
        `;
        
        if (entity.quotes && entity.quotes.length > 0) {
            inspectorHtml += `
                <h3 class="inspector-desc-title">Famous Dialogue / Meme Quotes</h3>
                <div class="inspector-quotes-list">
            `;
            entity.quotes.forEach((q, idx) => {
                const escapedQ = q.replace(/"/g, '&quot;').replace(/'/g, "\\'");
                const escapedN = entity.name.replace(/'/g, "\\'");
                inspectorHtml += `
                    <div class="quote-item">
                        <span>"${q}"</span>
                        <button onclick="triggerQuoteBubble('${escapedQ}', '${escapedN}')" title="Play Quote">💬</button>
                    </div>
                `;
            });
            inspectorHtml += `</div>`;
        }
    } else if (type === "location") {
        const campaignTitle = db.campaigns.find(c => c.id === entity.campaignId)?.title || "Unknown Campaign";
        inspectorHtml = `
            <h2>${entity.name}</h2>
            <div class="inspector-type">Location</div>
            <p class="entity-meta" style="margin-bottom: 1rem;">World: ${campaignTitle}</p>
            <p class="entity-meta" style="color: var(--color-purple); margin-bottom: 1.25rem;">Danger level: ${entity.danger || 'Unknown'}</p>
            
            <h3 class="inspector-desc-title">Description</h3>
            <p class="inspector-desc-text">${entity.description}</p>
        `;
    } else if (type === "rule") {
        if (entity.primaryStat) {
            // Class rules
            inspectorHtml = `
                <h2>${entity.name}</h2>
                <div class="inspector-type">${entity.source}</div>
                <p class="entity-meta" style="margin-bottom: 1rem;">Hit Dice: <strong>${entity.hitDice}</strong> | Primary Stat: <strong>${entity.primaryStat}</strong></p>
                
                <h3 class="inspector-desc-title">Class Summary</h3>
                <p class="inspector-desc-text" style="margin-bottom: 1.5rem;">${entity.description}</p>
                
                <h3 class="inspector-desc-title">Signature Class Features</h3>
                <div class="compendium-features" style="margin-top: 0.75rem;">
            `;
            entity.features.forEach(f => {
                inspectorHtml += `
                    <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.03); border-left: 3px solid var(--color-gold); border-radius: 4px;">
                        <strong style="color: var(--color-gold); font-size: 0.95rem;">${f.name}</strong>
                        <p style="margin: 0.35rem 0 0 0; font-size: 0.85rem; color: silver; line-height: 1.4;">${f.desc}</p>
                    </div>
                `;
            });
            inspectorHtml += `</div>`;
        } else {
            // Race rules
            inspectorHtml = `
                <h2>${entity.name} Race</h2>
                <div class="inspector-type">Race Compendium</div>
                <p class="entity-meta" style="color: var(--color-gold); margin-bottom: 1.25rem;">Ability Score Increase: <strong>${entity.abilityScoreIncrease}</strong></p>
                
                <h3 class="inspector-desc-title">Description & Traits</h3>
                <p class="inspector-desc-text">${entity.description}</p>
            `;
        }
    }
    
    content.innerHTML = inspectorHtml;
}

// Speech bubble quote popup
function triggerQuoteBubble(text, author) {
    const bubble = document.getElementById("quote-bubble-container");
    const txt = document.getElementById("quote-bubble-text");
    const aut = document.getElementById("quote-bubble-author");
    
    txt.innerText = `"${text}"`;
    aut.innerText = `- ${author}`;
    
    bubble.classList.remove("hidden");
    
    // Auto close after 8 seconds
    if (window.quoteTimeout) clearTimeout(window.quoteTimeout);
    window.quoteTimeout = setTimeout(closeQuoteBubble, 8000);
}

function closeQuoteBubble() {
    const bubble = document.getElementById("quote-bubble-container");
    bubble.classList.add("hidden");
}

// ==========================================
// 6. ADVENTURE MODE (RPG MINI-GAME)
// ==========================================
let gameMode = "explore"; // 'explore' or 'combat'
let exploreHeroPos = { x: 0, y: 7 };
let exploreMonsters = [];
let exploreChests = [];
let combatMonsterRef = null;

const QUEST_MAPS = {
    "witchlight-carnival-escape": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 1, y: 7 }, { x: 1, y: 6 }, { x: 2, y: 4 }, { x: 3, y: 4 },
            { x: 4, y: 4 }, { x: 5, y: 2 }, { x: 6, y: 2 }
        ],
        monsters: [
            { id: "chuckles", name: "Chuckles the Clown", x: 4, y: 3 }
        ],
        chests: [
            { x: 3, y: 5, looted: false, item: "Elixir of Health" }
        ],
        regionInfo: "Witchlight Carnival Tents",
        obstacleChar: "🎪"
    },
    "dimwood-ambush": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 2, y: 7 }, { x: 2, y: 6 }, { x: 3, y: 4 }, { x: 4, y: 4 },
            { x: 5, y: 4 }, { x: 6, y: 2 }, { x: 7, y: 2 }
        ],
        monsters: [
            { id: "spider", name: "Shadow Spider", x: 3, y: 3 }
        ],
        chests: [
            { x: 1, y: 4, looted: false, item: "D&D Health Potion" }
        ],
        regionInfo: "Dimwood Forest Canopy",
        obstacleChar: "🌲"
    },
    "icebound-survival": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 3 },
            { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 2 }
        ],
        monsters: [
            { id: "dragon", name: "Princess of Wrath", x: 4, y: 2 }
        ],
        chests: [
            { x: 5, y: 5, looted: false, item: "Frozen Rations Pack" }
        ],
        regionInfo: "Drakkar Glaciers",
        obstacleChar: "❄️"
    },
    "curse-of-strahdanya-house": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 5 }, { x: 4, y: 4 },
            { x: 5, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 1 }
        ],
        monsters: [
            { id: "armor", name: "Animated Armor", x: 4, y: 3 }
        ],
        chests: [
            { x: 2, y: 3, looted: false, item: "Tarot Card of Shielding" }
        ],
        regionInfo: "Death House Halls",
        obstacleChar: "🧱"
    },
    "beneath-dark-wings-storm": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 3 },
            { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }
        ],
        monsters: [
            { id: "sky-krill", name: "Aether Sky-Krill", x: 3, y: 2 }
        ],
        chests: [
            { x: 2, y: 6, looted: false, item: "Feather Fall Ring" }
        ],
        regionInfo: "Silver Kestrel Rigging",
        obstacleChar: "💨"
    },
    "shroud-over-saltmarsh-reef": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 4 },
            { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }
        ],
        monsters: [
            { id: "devil", name: "Deep Sea Devil", x: 4, y: 3 }
        ],
        chests: [
            { x: 3, y: 3, looted: false, item: "Trident Fragment" }
        ],
        regionInfo: "Sunken Skyport Reefs",
        obstacleChar: "⚓"
    },
    "edge-of-midnight-hunt": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 1, y: 7 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 },
            { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }
        ],
        monsters: [
            { id: "werewolf", name: "Alpha Werewolf", x: 4, y: 2 }
        ],
        chests: [
            { x: 3, y: 4, looted: false, item: "Silver Pocketwatch" }
        ],
        regionInfo: "Mill Street Industrial district",
        obstacleChar: "⚙️"
    },
    "prime-ley-line": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 1, y: 6 }, { x: 2, y: 5 }, { x: 3, y: 4 }, { x: 4, y: 3 },
            { x: 5, y: 2 }, { x: 6, y: 1 }, { x: 7, y: 1 }
        ],
        monsters: [
            { id: "golem", name: "Temporal Golem", x: 3, y: 3 }
        ],
        chests: [
            { x: 2, y: 2, looted: false, item: "Chronology Fragment" }
        ],
        regionInfo: "Prime Timeline Ley Fissure",
        obstacleChar: "⚡"
    },
    "stardust-rhapsody-chase": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 1, y: 7 }, { x: 2, y: 6 }, { x: 3, y: 5 }, { x: 4, y: 4 },
            { x: 5, y: 3 }, { x: 6, y: 2 }, { x: 7, y: 1 }
        ],
        monsters: [
            { id: "marauder", name: "Space Goblin Marauder", x: 3, y: 4 }
        ],
        chests: [
            { x: 2, y: 5, looted: false, item: "Concentrated Stardust Core" }
        ],
        regionInfo: "Asteroid Comet Chase",
        obstacleChar: "☄️"
    },
    "neon-odyssey-hack": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 2, y: 7 }, { x: 2, y: 6 }, { x: 3, y: 5 }, { x: 4, y: 4 },
            { x: 5, y: 3 }, { x: 6, y: 2 }, { x: 7, y: 2 }
        ],
        monsters: [
            { id: "scanner", name: "Corporate AI Scanner", x: 3, y: 3 }
        ],
        chests: [
            { x: 2, y: 5, looted: false, item: "Encrypted Cyber-deck Decryptor" }
        ],
        regionInfo: "Megacity 9 Firewall Core",
        obstacleChar: "💾"
    },
    "default": {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }
        ],
        monsters: [
            { id: "beast", name: "Shadow Beast", x: 4, y: 3 }
        ],
        chests: [
            { x: 1, y: 3, looted: false, item: "D&D Health Potion" }
        ],
        regionInfo: "Frontier Wilderness Map",
        obstacleChar: "🌲"
    }
};

const QUESTS_DATA = {
    "icebound-survival": {
        title: "The Frozen Leviathan",
        campaign: "icebound",
        description: "Stranded in the freezing peaks of northern Drakkar, your camp is freezing and a massive frozen leviathan is stirring beneath the glacier. Scan the ice and survive the cold!",
        compatibleHeroes: ["barnabos-dreadwake", "jornir-frost", "queenie-march", "skrimm-stabbaskotch", "taishen-fireblossom", "captain-vermeil"],
        startNode: "intro"
    },
    "curse-of-strahdanya-house": {
        title: "Escape Death House",
        campaign: "curse-of-strahdanya",
        description: "Countess Strahdanya von Zarovich has locked you inside the sanity-draining Death House. Pierce the gothic mists and escape before the house devours you!",
        compatibleHeroes: ["professor-azran", "victoria-isaacs", "kana-soyokaze", "sarnax-edelwood"],
        startNode: "intro"
    },
    "beneath-dark-wings-storm": {
        title: "Aether Storm Leap",
        campaign: "beneath-dark-wings",
        description: "An imperial blockade has cornered the Silver Kestrel in a raging aether storm. Execute a daring jump between airships and pilot to safety!",
        compatibleHeroes: ["toa-kamanui", "iris-sands", "felix-ackerman", "lufti-genasi"],
        startNode: "intro"
    },
    "shroud-over-saltmarsh-reef": {
        title: "The Sunken Skyport Reef",
        campaign: "shroud-over-saltmarsh",
        description: "Explore the dangerous reefs where a floating skyport crashed, and secure smuggler contraband while fighting aquatic sea-devils!",
        compatibleHeroes: ["poros-malthea", "monty-crumb", "kaiyo-pearlfin"],
        startNode: "intro"
    },
    "edge-of-midnight-hunt": {
        title: "Mill Street Werewolf Hunt",
        campaign: "edge-of-midnight",
        description: "Investigate steam-mill murders and track down a werewolf pack hiding in the foggy industrial district of Druskenvald!",
        compatibleHeroes: ["lethica-nightborne", "jericho-sticks", "briggsy-kratch", "marius-renathyr", "farryn-hartsblight", "yorgrim-dwarf"],
        startNode: "intro"
    },
    "witchlight-carnival-escape": {
        title: "Escape Carnivàle Lecroux",
        campaign: "once-upon-a-witchlight",
        description: "An angry mob of townsfolk is besieging Kremy's carnival carriage because he sold them 'magic potion mixtures' that turned them bright orange. Use your skills to escape into the fey border mists!",
        compatibleHeroes: ["kremy-lecroux", "gideon-coal", "gricko-grimgrin", "morning-frost"],
        startNode: "intro"
    },
    "prime-ley-line": {
        title: "The Prime Planar Fracture",
        campaign: "prime",
        description: "A dimensional ley line has fractured, opening a portal that bleeds chaotic Feywild magic onto the Prime continent. Seal the rift!",
        compatibleHeroes: ["rodek-stonehearth", "vandrys-truestrike", "anulin-wizard", "sylvie-druid"],
        startNode: "intro"
    },
    "dimwood-ambush": {
        title: "The Dimwood Ambush",
        campaign: "uprooted",
        description: "A band of greedy bandit crows have ambushed you from the ancient branches, demanding all your golden acorns. Fight them off or outsmart them to make it to safety!",
        compatibleHeroes: ["bitsy-mouse", "grumley-badger", "hazel-squirrel"],
        startNode: "intro"
    },
    "stardust-rhapsody-chase": {
        title: "The Cosmic Comet Chase",
        campaign: "stardust-rhapsody",
        description: "Chase a magical comet containing primordial cores while avoiding cosmic monsters and space goblin attacks!",
        compatibleHeroes: ["captain-pyke", "rett-pilot", "chuckles-space"],
        startNode: "intro"
    },
    "neon-odyssey-hack": {
        title: "Bloodfleet Corporate Hack",
        campaign: "neon-odyssey",
        description: "Infiltrate a high-rise tower in Megacity 9, hack corporate servers to expose Bloodfleet projects, and dodge scanner drones!",
        compatibleHeroes: ["vigilante-neon", "bloodfleet-defector"],
        startNode: "intro"
    }
};

const QUEST_NODES = {
    "icebound-survival": {
        "intro": {
            text: "A freezing blizzard screams across the peaks of northern Drakkar. Your campfire is dying, and the ice beneath you vibrates as a giant shadow stirs in the glacial depths. You must act quickly to secure the camp!",
            choices: [
                {
                    text: "Fuel the campfire with sorcery. (Charisma Check)",
                    check: { stat: "CHA", dc: 12, success: "fire-success", fail: "fire-fail" }
                },
                {
                    text: "Channel tundra forest spirits to ward off the cold. (Wisdom Nature Check)",
                    check: { stat: "WIS", dc: 11, success: "spirits-success", fail: "spirits-fail" }
                },
                {
                    text: "Scout the polar drifts for shelter. (Dexterity Check)",
                    check: { stat: "DEX", dc: 13, success: "shelter-success", fail: "shelter-fail" }
                }
            ]
        },
        "fire-success": {
            text: "You shoot warm embers into the wood. The fire flares up, warding off the cold. You find temporary warmth to press onward.",
            next: "glacier-cave"
        },
        "fire-fail": {
            text: "Your magic sparks out in the gale. You shiver, losing energy. (Lose 6 HP)",
            damage: 6,
            next: "glacier-cave"
        },
        "spirits-success": {
            text: "The tundra spirits respond, wrapping the camp in a cocoon of warm wind. You survive the initial freeze.",
            next: "glacier-cave"
        },
        "spirits-fail": {
            text: "The freezing winds swallow your prayers. You are severely frostbitten. (Lose 8 HP)",
            damage: 8,
            next: "glacier-cave"
        },
        "shelter-success": {
            text: "You slide down a crevasse and locate an ancient stone shelter, avoiding the worst of the storm.",
            next: "glacier-cave"
        },
        "shelter-fail": {
            text: "You slip on a sheet of blue ice, sliding into a rocky outcrop. (Lose 7 HP)",
            damage: 7,
            next: "glacier-cave"
        },
        "glacier-cave": {
            text: "Inside the stone cave, the ice walls crack as the giant frozen leviathan's eye glows through the ice. The ceiling begins to collapse! What is your play?",
            choices: [
                {
                    text: "Hold up the collapsing stone archway. (Strength Check)",
                    check: { stat: "STR", dc: 14, success: "cave-win", fail: "cave-lose" }
                },
                {
                    text: "Read the ancient ice runes to find a secret exit. (Intelligence Check)",
                    check: { stat: "INT", dc: 12, success: "cave-win", fail: "cave-lose" }
                }
            ]
        },
        "cave-win": {
            text: "With a great effort, you bypass the collapsing tunnel. You safely seal the leviathan chamber behind you and make it back to the merchant ship survivors.",
            next: "victory"
        },
        "cave-lose": {
            text: "The ice cave collapses on you. You take severe crushing damage from the falling blocks. (Lose 12 HP)",
            damage: 12,
            next: "victory"
        },
        "victory": {
            text: "CONGRATULATIONS! You successfully navigated the frozen drifts of Drakkar and survived the leviathan's awakening. You return safely to Captain Vermeil's survivors.",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. The biting cold of Drakkar claimed your bones. You are frozen solid in the ice wastes, joining the ancient legends of the north.",
            isEnd: true
        }
    },
    "curse-of-strahdanya-house": {
        "intro": {
            text: "The heavy wooden doors of Death House slam shut behind you, locking out the Barovian mists. Eerie whispers echo from the wallpaper. A sanity-draining aura fills the halls. How do you escape?",
            choices: [
                {
                    text: "Divine the door glyphs to unlock the exit. (Intelligence Check)",
                    check: { stat: "INT", dc: 13, success: "door-success", fail: "door-fail" }
                },
                {
                    text: "Channel shadow magic to explore the corners. (Charisma Check)",
                    check: { stat: "CHA", dc: 12, success: "shadow-success", fail: "shadow-fail" }
                },
                {
                    text: "Force the lock of the front parlor doors. (Strength Check)",
                    check: { stat: "STR", dc: 14, success: "door-success", fail: "door-fail" }
                }
            ]
        },
        "door-success": {
            text: "The lock clicks open, revealing a spiral staircase leading down to the basement vaults.",
            next: "attic"
        },
        "door-fail": {
            text: "The lock shocks you with gothic necrotic energy. (Lose 7 HP)",
            damage: 7,
            next: "attic"
        },
        "shadow-success": {
            text: "Your shadow hound locates a hidden wall door, letting you slip past the parlor traps.",
            next: "attic"
        },
        "shadow-fail": {
            text: "The mists push back, corrupting your shadow. You feel dizzy and cold. (Lose 6 HP)",
            damage: 6,
            next: "attic"
        },
        "attic": {
            text: "In the dusty attic, the ghost of a child points to Countess Strahdanya's portrait. The portrait's eyes glow crimson, shooting mental daggers at your mind! How do you resist?",
            choices: [
                {
                    text: "Extend roots and shield your mind. (Constitution Check)",
                    check: { stat: "CON", dc: 12, success: "attic-win", fail: "attic-lose" }
                },
                {
                    text: "Slip silently out of the portrait's gaze. (Dexterity Check)",
                    check: { stat: "DEX", dc: 13, success: "attic-win", fail: "attic-lose" }
                }
            ]
        },
        "attic-win": {
            text: "You successfully break the portrait's curse, shattering the canvas. The front doors swing open, letting you escape into the Barovian mists.",
            next: "victory"
        },
        "attic-lose": {
            text: "Strahdanya's psychic gaze hits you. You take severe psychic dread damage. (Lose 10 HP)",
            damage: 10,
            next: "victory"
        },
        "victory": {
            text: "CONGRATULATIONS! You successfully broke the house's sanity-draining wards. You escape back into the valley of Barovia, mapping the planar coords.",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. Your sanity is fully consumed by the Death House. You become another ghost haunting the corridors of Castle Ravenloft.",
            isEnd: true
        }
    },
    "beneath-dark-wings-storm": {
        "intro": {
            text: "Aether storms thrash the floating docks. An imperial sky cruiser is blockading the Silver Kestrel. The sails are ripping in the gale! What is your command?",
            choices: [
                {
                    text: "Perform high-rigging leaps to secure the sails. (Dexterity Check)",
                    check: { stat: "DEX", dc: 14, success: "rigging-success", fail: "rigging-fail" }
                },
                {
                    text: "Hold down the main anchor crank. (Strength Check)",
                    check: { stat: "STR", dc: 13, success: "anchor-success", fail: "anchor-fail" }
                },
                {
                    text: "Steer the ship using stellar constellations. (Wisdom Check)",
                    check: { stat: "WIS", dc: 12, success: "rigging-success", fail: "rigging-fail" }
                }
            ]
        },
        "rigging-success": {
            text: "You slip past the imperial cannons, letting the Kestrel capture the full wind.",
            next: "sky-board"
        },
        "rigging-fail": {
            text: "You lose your footing, catching yourself on a rope but scraping your ribs. (Lose 6 HP)",
            damage: 6,
            next: "sky-board"
        },
        "anchor-success": {
            text: "You lock the anchor, pivoting the Kestrel around the imperial hull in a perfect spin.",
            next: "sky-board"
        },
        "anchor-fail": {
            text: "The crank snaps back, hitting you in the chest. (Lose 8 HP)",
            damage: 8,
            next: "sky-board"
        },
        "sky-board": {
            text: "Imperial sky-troopers board the deck, brandishing lightning blades! The crew needs to fight back or escape.",
            choices: [
                {
                    text: "Cast storm flight runes to blast them off the deck. (Intelligence Check)",
                    check: { stat: "INT", dc: 13, success: "board-win", fail: "board-lose" }
                },
                {
                    text: "Endure the lightning hits and fight. (Constitution Check)",
                    check: { stat: "CON", dc: 12, success: "board-win", fail: "board-lose" }
                }
            ]
        },
        "board-win": {
            text: "You blow the troopers off the deck with a gust of wind, and the Kestrel accelerates into the sky clouds.",
            next: "victory"
        },
        "board-lose": {
            text: "You are slashed by a lightning blade, taking major elemental damage. (Lose 10 HP)",
            damage: 10,
            next: "victory"
        },
        "victory": {
            text: "CONGRATULATIONS! You escaped the imperial blockade and landed safely at Skyport Stryga, securing the wind compass.",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. The Silver Kestrel is shot down. You fall through the clouds, lost forever in the deep sky currents.",
            isEnd: true
        }
    },
    "shroud-over-saltmarsh-reef": {
        "intro": {
            text: "Under the coastal waters of Saltmarsh, you dive into the ruins of a crashed skyport. Suddenly, a pack of sea-devils spots you! How do you bypass them?",
            choices: [
                {
                    text: "Sneak past using the sunken coral cover. (Dexterity Check)",
                    check: { stat: "DEX", dc: 13, success: "reef-success", fail: "reef-fail" }
                },
                {
                    text: "Summon a flash of radiant paladin light to blind them. (Charisma Check)",
                    check: { stat: "CHA", dc: 12, success: "reef-success", fail: "reef-fail" }
                },
                {
                    text: "Call schools of fish to guide you. (Wisdom Check)",
                    check: { stat: "WIS", dc: 12, success: "reef-success", fail: "reef-fail" }
                }
            ]
        },
        "reef-success": {
            text: "The sea-devils are blinded or distracted, allowing you to swim to the center of the ruins.",
            next: "sunken-core"
        },
        "reef-fail": {
            text: "A sea-devil spears your shoulder before you escape. (Lose 6 HP)",
            damage: 6,
            next: "sunken-core"
        },
        "sunken-core": {
            text: "You find the skyport engine core buried under heavy iron wreckage. Aquatic monsters are closing in!",
            choices: [
                {
                    text: "Lift the heavy iron beams off the core. (Strength Check)",
                    check: { stat: "STR", dc: 14, success: "core-win", fail: "core-lose" }
                },
                {
                    text: "Disarm the core's unstable runic traps. (Intelligence Check)",
                    check: { stat: "INT", dc: 12, success: "core-win", fail: "core-lose" }
                }
            ]
        },
        "core-win": {
            text: "You pull the Kestrel Core free and swim back to the Azure Maiden, leaving the sea-devils behind.",
            next: "victory"
        },
        "core-lose": {
            text: "The wreckage collapses or the core explodes, hurting you severely. (Lose 9 HP)",
            damage: 9,
            next: "victory"
        },
        "victory": {
            text: "CONGRATULATIONS! You successfully recovered the skyport core from the sunken reefs, securing ship upgrades for the Azure Maiden.",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. You drown in the ocean depths, your spirit joining the sunken hulls of Saltmarsh.",
            isEnd: true
        }
    },
    "edge-of-midnight-hunt": {
        "intro": {
            text: "A cold fog wraps around the industrial streets of Druskenvald. Werewolves are howling in the alleys. You must track down the mill street pack!",
            choices: [
                {
                    text: "Track the claw marks in the mists. (Wisdom Check)",
                    check: { stat: "WIS", dc: 12, success: "track-success", fail: "track-fail" }
                },
                {
                    text: "Whisper scarecrow secrets to local crows for help. (Charisma Check)",
                    check: { stat: "CHA", dc: 12, success: "track-success", fail: "track-fail" }
                },
                {
                    text: "Draw the werewolves out by acting as bait. (Constitution Check)",
                    check: { stat: "CON", dc: 13, success: "track-success", fail: "track-fail" }
                }
            ]
        },
        "track-success": {
            text: "You corner the werewolf leader inside a steam-mill yard.",
            next: "werewolf-fight"
        },
        "track-fail": {
            text: "You are ambushed from a rooftop, getting clawed. (Lose 6 HP)",
            damage: 6,
            next: "werewolf-fight"
        },
        "werewolf-fight": {
            text: "The werewolf boss leaps forward, snarling! He seeks to rip your throat. How do you strike him down?",
            choices: [
                {
                    text: "Unleash blood hunter blade strikes. (Strength Check)",
                    check: { stat: "STR", dc: 14, success: "hunt-win", fail: "hunt-lose" }
                },
                {
                    text: "Shoot a silver arrow at his chest. (Dexterity Check)",
                    check: { stat: "DEX", dc: 13, success: "hunt-win", fail: "hunt-lose" }
                }
            ]
        },
        "hunt-win": {
            text: "Your strike connects, defeatng the werewolf leader. The remaining pack scatters in fear.",
            next: "victory"
        },
        "hunt-lose": {
            text: "The boss bites you on the shoulder, infecting you with the curse of Stryga. (Lose 9 HP)",
            damage: 9,
            next: "victory"
        },
        "victory": {
            text: "CONGRATULATIONS! You successfully cleared the Mill Street werewolves, saving the citizens of Druskenvald.",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. Cursed by the beast Stryga, you transform into a feral werewolf under the eternal night.",
            isEnd: true
        }
    },
    "witchlight-carnival-escape": {
        "intro": {
            text: "Torches flicker in the damp evening air. A mob of angry farmers and merchants surround Kremy Lecroux's gorgeous purple-painted carnival carriage. The Baron's head guardsman steps forward, shaking a fist. 'Scammers! Outlaws! You sold us water from the swamp and called it a Potion of Youth! We are orange and sticky!'",
            choices: [
                {
                    text: "Kremy attempts to charm the crowd and explain it is a 'temporary cleansing phase.' (Charisma Persuasion check)",
                    check: { stat: "CHA", dc: 13, success: "charm-success", fail: "charm-fail" }
                },
                {
                    text: "Gideon Coal leaps down from the carriage roof with chains rattling, seeking to intimidate the guards. (Strength Intimidation check)",
                    check: { stat: "STR", dc: 12, success: "fight-success", fail: "fight-fail" }
                },
                {
                    text: "Gricko Grimgrin casts a minor illusion of a terrifying bear from the swamp. (Wisdom Nature check)",
                    check: { stat: "WIS", dc: 11, success: "druid-success", fail: "druid-fail" }
                }
            ]
        },
        "charm-success": {
            text: "With matching velvet gloves and a gold-toothed smile, you spin a web of verbal magic. The crowd is mesmerized. The guardsman begins rubbing his sticky orange chin. 'Ah... so the stickiness is pulling the youth back to the surface?' Taking advantage of the confusion, the Carnivàle drivers whip the horses, crashing through the back lines into the misty forest swamp! You escape cleanly.",
            next: "swamp-path"
        },
        "charm-fail": {
            text: "You attempt to flash a charming grin, but the guardsman hurls a rotten tomato right at your chest. 'Liar! Get them!' The crowd rushes the carriage. In the mad scramble, a stone hits you on the shoulder. The carriage wheels lurch forward and break loose, escaping but leaving you bruised. (Lose 6 HP)",
            damage: 6,
            next: "swamp-path"
        },
        "fight-success": {
            text: "Gideon leaps into the crowd, slamming his heavy metal chains into the ground with a gout of genasi sparks. The earth shakes. The guards freeze in terror, completely cowed by the raw power. 'Wait, wait! Don't punch us!' they scream, scattering. The carriage rolls forward smoothly into the foggy marsh.",
            next: "swamp-path"
        },
        "fight-fail": {
            text: "Gideon attempts to roar and snap his chains, but he trips on a stray piece of carnival rope and falls flat on his face. The guards laugh and beat him with clubs before Gideon scrambles back up. The carriage flees into the marsh, but Gideon is covered in mud and bruises. (Lose 8 HP)",
            damage: 8,
            next: "swamp-path"
        },
        "druid-success": {
            text: "Gricko chirps, hops on one foot, and makes a bizarre squawking noise. Suddenly, a giant spectral swamp owl-bear appears in the trees, roaring. The mob screams in terror and runs for their lives. Hootsie flies overhead, hooting mockingly as the carriage careens into the mist.",
            next: "swamp-path"
        },
        "druid-fail": {
            text: "Gricko tries to conjure a scary beast, but he sneezes, creating a tiny spectral toad instead. The toad squeaks. The guards look unimpressed. 'Is that... a frog?' they ask before rushing. You make a messy escape through the side tents, getting scraped by branches. (Lose 5 HP)",
            damage: 5,
            next: "swamp-path"
        },
        "swamp-path": {
            text: "Deep in the misty Feywild swamp of Hither, the carriage gets stuck in thick blue clay mud. Suddenly, a cold wind blows, and a familiar, cackling specter drifts down from the canopy. It's Chuckles the Clown! His ghostly face glows with green fire. 'Did you miss me, Gideon? Let's play a game! I brought balloons! They are filled with toxic swamp vapors!'",
            choices: [
                {
                    text: "Try to talk Chuckles down by tricking him into a riddle. (Intelligence Check)",
                    check: { stat: "INT", dc: 12, success: "chuckles-riddle-win", fail: "chuckles-riddle-lose" }
                },
                {
                    text: "Gideon tries to punch the ghost out of sheer annoyance. (Strength Check)",
                    check: { stat: "STR", dc: 15, success: "chuckles-punch-win", fail: "chuckles-punch-lose" }
                },
                {
                    text: "Run for it! Try to push the carriage free of the mud before he floats closer. (Dexterity Sleight of Hand / Athletics Check)",
                    check: { stat: "DEX", dc: 13, success: "chuckles-run-win", fail: "chuckles-run-lose" }
                }
            ]
        },
        "chuckles-riddle-win": {
            text: "You ask Chuckles: 'What has teeth but cannot bite, and floats but has no weight?' Chuckles floats in place, scratching his ghostly bald head. 'Uh... a ghost clown? No... a balloon? Wait!' While he is distracted arguing with himself, you push the carriage free and hit the road, leaving him behind in the swamp.",
            next: "victory"
        },
        "chuckles-riddle-lose": {
            text: "Your riddle is awful. Chuckles cackles loudly. 'That riddle makes no sense! Just like your skin after I pop this!' He snaps a noxious green balloon in your face, filling your lungs with toxic fey poison. You cough violently. (Lose 10 HP)",
            damage: 10,
            next: "final-stretch"
        },
        "chuckles-punch-win": {
            text: "Gideon yells, jumps off the carriage wheel, and swings his fist with pure rage. Incredibly, the D&D dice favor you—Gideon's fist connects with ghostly ectoplasm! You punch Chuckles right in his squeaky nose. The specter squeals and flies backward into a tree trunk. 'Why does it always happen to me?!' he cries, vanishing in a puff of green sparkles. The swamp path is clear!",
            next: "victory"
        },
        "chuckles-punch-lose": {
            text: "Gideon swings wildly, but his fist passes right through the ghost. Chuckles giggles hysterically, sticking a cold ghostly finger in Gideon's ear. Gideon shiver, taking psychic frost damage. 'Missed me! Squeak!' Chuckles laughs. (Lose 8 HP)",
            damage: 8,
            next: "final-stretch"
        },
        "chuckles-run-win": {
            text: "You coordinate your efforts, using the silver cane as a lever. With a swift push, the carriage wheels slide out of the blue clay and roll onto solid grass. You dive into the carriage as it speeds away, narrowly dodging Chuckles' swooping grasp.",
            next: "victory"
        },
        "chuckles-run-lose": {
            text: "You slip in the clay mud, faceplanting into the slime. Chuckles floats over, tickling your ribs with freezing cold fingers. The horror is absolute. You finally scramble up and pull the carriage free, but you are freezing and terrified. (Lose 7 HP)",
            damage: 7,
            next: "final-stretch"
        },
        "final-stretch": {
            text: "Shaking and coughing, you steer the carriage out of Chuckles' hunting grounds. Ahead, the mystical lights of the Witchlight Carnival glow through the trees. You have escaped, but you are barely clinging to life.",
            choices: [
                {
                    text: "Speed through the carnival gates to safety!",
                    next: "victory"
                }
            ]
        },
        "victory": {
            text: "CONGRATULATIONS! You successfully navigated the swamps of Hither and escaped the mob. Your party arrives safely at the magical Witchlight Carnival gates, ready for the next adventure. The crowd back home is left holding sticky orange mud. A grand victory for the Carnivàle Lecroux!",
            isEnd: true
        },
        "gameover": {
            text: "YOUR PARTY FAINTED. Overcome by injuries, exhaustion, and clown curses, you fall unconscious in the swamp. The Baron's guards catch up, bind you in chains, and force you to perform tricks in the Baron's private zoo for the rest of your days. Better luck next time!",
            isEnd: true
        }
    },
    "prime-ley-line": {
        "intro": {
            text: "A planar fracture has torn open a bayou swamp near Stonehearth. Magical rifts bleed wild magic onto the Prime continent. You must seal the fracture before the planar balance collapses!",
            choices: [
                {
                    text: "Run runic diagnostics and close the lines. (Intelligence Check)",
                    check: { stat: "INT", dc: 13, success: "seal-success", fail: "seal-fail" }
                },
                {
                    text: "Hammer the rift anchors into the ground. (Strength Check)",
                    check: { stat: "STR", dc: 14, success: "seal-success", fail: "seal-fail" }
                },
                {
                    text: "Calm the swamp elements using nature magic. (Wisdom Check)",
                    check: { stat: "WIS", dc: 12, success: "seal-success", fail: "seal-fail" }
                }
            ]
        },
        "seal-success": {
            text: "The rifts begin to shrink. However, a giant fey crocodile mutated by portal magic charges you!",
            next: "bayou-beast"
        },
        "seal-fail": {
            text: "A magical wild spike shocks you. (Lose 7 HP)",
            damage: 7,
            next: "bayou-beast"
        },
        "bayou-beast": {
            text: "The mutated crocodile opens its jaws, snapping! You must stand your ground.",
            choices: [
                {
                    text: "Shoot the weak spot on its scaly hide. (Dexterity Check)",
                    check: { stat: "DEX", dc: 13, success: "beast-win", fail: "beast-lose" }
                },
                {
                    text: "Brace yourself and endure the tail swipe. (Constitution Check)",
                    check: { stat: "CON", dc: 12, success: "beast-win", fail: "beast-lose" }
                }
            ]
        },
        "beast-win": {
            text: "You successfully defeat the bayou beast, and the portal seals shut completely.",
            next: "victory"
        },
        "beast-lose": {
            text: "The tail swipe hits you, launching you into the mud. (Lose 9 HP)",
            damage: 9,
            next: "victory"
        },
        "victory": {
            text: "CONGRATULATIONS! You successfully sealed the bayou planar rift, restoring peace to the continent of Prime.",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. Sucked into the fey rift, your physical form dissolves into the raw layout coordinates.",
            isEnd: true
        }
    },
    "dimwood-ambush": {
        "intro": {
            text: "The oak canopy of the Dimwood is dark and dense. Suddenly, a shower of sharp pinecones falls from the branches. Three giant bandit crows drop down, wielding daggers made of flint. 'Hand over all your shiny gold coins and acorns, or we pluck your whiskers!'",
            choices: [
                {
                    text: "Bitsy hides in the underbrush, preparing to sneak attack their leader. (Dexterity Stealth check)",
                    check: { stat: "DEX", dc: 12, success: "sneak-success", fail: "sneak-fail" }
                },
                {
                    text: "Grumley bangs his giant iron frying pan to scare them off. (Constitution Intimidation check)",
                    check: { stat: "CON", dc: 13, success: "pan-success", fail: "pan-fail" }
                }
            ]
        },
        "sneak-success": {
            text: "Bitsy slips into the ferns, invisible. Just as the crow boss steps forward to grab your packs, Bitsy leaps out and stabs him in the tail feathers with her needle-sword! The boss squawks in agony, and the other crows flutter away in fear. You loot 5 golden acorns!",
            next: "woodland-path"
        },
        "sneak-fail": {
            text: "Bitsy tries to crawl silently, but she steps on a dry twig that snaps loudly. The crow boss spots her immediately. 'Look, a snack!' he caws, diving and pecking at her ears. You are forced to fight in the open. (Lose 5 HP)",
            damage: 5,
            next: "woodland-path"
        },
        "pan-success": {
            text: "Grumley takes a deep breath, expands his chest, and beats his massive iron frying pan like a gong. *CLANG!* The sonic wave shakes the leaves. The crows clutch their ears and fall out of the trees, dazed. They scramble away on their wings, terrified. The road is clear!",
            next: "woodland-path"
        },
        "pan-fail": {
            text: "Grumley bangs the pan, but the handle slips, and he accidentally hits himself in the forehead. *CLANG!* Grumley staggers around, dizzy. The crows caw with laughter and dive-bomb you, scratching with their talons. (Lose 7 HP)",
            damage: 7,
            next: "woodland-path"
        },
        "woodland-path": {
            text: "You make it deeper into the forest, but the path is blocked by a crumbling stone archway covered in glowing green runes. A wild, territorial badger-hound stands guard, growling fiercely.",
            choices: [
                {
                    text: "Try to slip past the beast quietly. (Dexterity Stealth Check)",
                    check: { stat: "DEX", dc: 14, success: "beast-slip-win", fail: "beast-slip-lose" }
                },
                {
                    text: "Grumley tries to pacify the hound by offering it a piece of stew meat. (Wisdom Animal Handling Check)",
                    check: { stat: "WIS", dc: 11, success: "beast-feed-win", fail: "beast-feed-lose" }
                }
            ]
        },
        "beast-slip-win": {
            text: "You move like shadows, matching the rustle of the canopy. The badger-hound sniffs the air, growling, but fails to see you slip under the stone archway into the safe outer boundary.",
            next: "victory"
        },
        "beast-slip-lose": {
            text: "A strap on your pack rattles. The hound barks and charges, snapping its jaws! You manage to scramble past the archway, but not before it bites you on the thigh. (Lose 8 HP)",
            damage: 8,
            next: "final-check"
        },
        "beast-feed-win": {
            text: "You toss a succulent chunk of dried beaver meat. The hound's ears perk up. It snatches the meat out of the air, chewing happily, wagging its thick tail. It sits down and lets you pass, even letting Bitsy pat its head.",
            next: "victory"
        },
        "beast-feed-lose": {
            text: "Grumley throws the meat, but it hits the badger-hound right in the eye. The beast is furious. It ignores the food and leaps, biting you. You kick it off and run through the archway, bruised and bleeding. (Lose 9 HP)",
            damage: 9,
            next: "final-check"
        },
        "final-check": {
            text: "Exhausted and bleeding, you drag yourselves past the runes. The archway collapses behind you, blocking the badger-hound, but you are in bad shape.",
            choices: [
                {
                    text: "Drag yourselves to the woodland outpost.",
                    next: "victory"
                }
            ]
        },
        "victory": {
            text: "CONGRATULATIONS! You survived the dangers of the Dimwood, outsmarted the bandit crows, and made it to the Woodland Outpost. You toast with root beer by the tavern fire, safe for now!",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. The predators of the Dimwood were too strong. You fall unconscious under the roots, and the bandit crows loot all your gear, leaving you to wander the forest forever. Better luck next time!",
            isEnd: true
        }
    },
    "stardust-rhapsody-chase": {
        "intro": {
            text: "Aboard the Starship Rhapsody, you are chasing a magical comet containing primordial cores. Space goblins board your cargo bay from a junk shuttle! How do you handle them?",
            choices: [
                {
                    text: "Pilot the Rhapsody through a tight meteor barrel-roll. (Dexterity Pilot Check)",
                    check: { stat: "DEX", dc: 13, success: "pilot-success", fail: "pilot-fail" }
                },
                {
                    text: "Fire plasma cannons at their boarding shuttle. (Strength Check)",
                    check: { stat: "STR", dc: 13, success: "pilot-success", fail: "pilot-fail" }
                },
                {
                    text: "Bluff the goblins over the intercom with clone warnings. (Charisma Check)",
                    check: { stat: "CHA", dc: 12, success: "pilot-success", fail: "pilot-fail" }
                }
            ]
        },
        "pilot-success": {
            text: "The space goblins are thrown off-balance, and you secure the cargo hold.",
            next: "comet-extraction"
        },
        "pilot-fail": {
            text: "A space goblin shoots a plasma pistol, hitting your arm. (Lose 6 HP)",
            damage: 6,
            next: "comet-extraction"
        },
        "comet-extraction": {
            text: "You approach the comet's tail to extract the cores. Suddenly, a vacuum leak triggers in the bay! You must secure the hatch.",
            choices: [
                {
                    text: "Override and hack the bay security panels. (Intelligence Check)",
                    check: { stat: "INT", dc: 13, success: "extract-win", fail: "extract-lose" }
                },
                {
                    text: "Hold your breath and seal the manual latch. (Constitution Check)",
                    check: { stat: "CON", dc: 14, success: "extract-win", fail: "extract-lose" }
                }
            ]
        },
        "extract-win": {
            text: "You seal the hatch, lock the comet core, and jump the Rhapsody to hyperspace.",
            next: "victory"
        },
        "extract-lose": {
            text: "You are exposed to raw space radiation before securing the lock. (Lose 10 HP)",
            damage: 10,
            next: "victory"
        },
        "victory": {
            text: "CONGRATULATIONS! You secured the frozen comet core, unlocking stardust coordinates for the Rhapsody crew.",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. Blasted into the cosmic vacuum, you drift forever among the stardust lanes of Avantris.",
            isEnd: true
        }
    },
    "neon-odyssey-hack": {
        "intro": {
            text: "In the neon high-rises of Megacity 9, you are infiltrating the Bloodfleet corporate servers. Scanner drones patrol the server room. How do you bypass them?",
            choices: [
                {
                    text: "Crack the Bloodfleet firewall proxy. (Intelligence Hacking Check)",
                    check: { stat: "INT", dc: 13, success: "hack-success", fail: "hack-fail" }
                },
                {
                    text: "Ambush and smash the lead scanner drone. (Strength Check)",
                    check: { stat: "STR", dc: 14, success: "hack-success", fail: "hack-fail" }
                },
                {
                    text: "Slip silently across the ceiling cables. (Dexterity Check)",
                    check: { stat: "DEX", dc: 13, success: "hack-success", fail: "hack-fail" }
                }
            ]
        },
        "hack-success": {
            text: "You successfully disable the scanner matrix and access the main corporate servers.",
            next: "escape-drone"
        },
        "hack-fail": {
            text: "The alarms trigger, and a security bot shoots a laser at your leg. (Lose 7 HP)",
            damage: 7,
            next: "escape-drone"
        },
        "escape-drone": {
            text: "You download the data logs, but a heavy combat drone blocks the helipad exit. You need to clear it to escape!",
            choices: [
                {
                    text: "Perform a leap of faith to the adjacent tower. (Dexterity Check)",
                    check: { stat: "DEX", dc: 13, success: "escape-win", fail: "escape-lose" }
                },
                {
                    text: "Upload a terminal feedback virus to fry the drone. (Intelligence Check)",
                    check: { stat: "INT", dc: 12, success: "escape-win", fail: "escape-lose" }
                }
            ]
        },
        "escape-win": {
            text: "The drone explodes or you escape cleanly, sliding down the zip-line to the resistance safehouse.",
            next: "victory"
        },
        "escape-lose": {
            text: "The drone shoots a laser sweep, burning you severely before you break free. (Lose 10 HP)",
            damage: 10,
            next: "victory"
        },
        "victory": {
            text: "CONGRATULATIONS! You successfully retrieved the Bloodfleet research data, delivering a massive blow to the corporate empires.",
            isEnd: true
        },
        "gameover": {
            text: "GAME OVER. Captured by corporate security forces, you are forced into reprogramming in the deep Bloodfleet labs.",
            isEnd: true
        }
    }
};;

// Render Setup Screen
function renderQuestSetup() {
    const questContainer = document.getElementById("quest-options-container");
    questContainer.innerHTML = "";
    
    // Quests
    Object.keys(QUESTS_DATA).forEach(qid => {
        const quest = QUESTS_DATA[qid];
        const card = document.createElement("div");
        card.className = `quest-option-card ${activeQuestId === qid ? "active" : ""}`;
        card.onclick = () => selectQuestForAdventure(qid);
        
        card.innerHTML = `
            <h4>${quest.title}</h4>
            <p>${quest.description}</p>
        `;
        questContainer.appendChild(card);
    });
    
    // Heroes
    renderHeroOptions();
}

function renderHeroOptions() {
    const container = document.getElementById("hero-options-container");
    container.innerHTML = "";
    
    if (!activeQuestId) {
        container.innerHTML = `<p class="select-hint">Please select a quest first to see compatible heroes.</p>`;
        document.getElementById("btn-start-adventure").disabled = true;
        return;
    }
    
    const quest = QUESTS_DATA[activeQuestId];
    
    // Filter characters matching this campaign or explicitly listed
    const compatibleHeroes = db.characters.filter(c => 
        quest.compatibleHeroes.includes(c.id) || c.campaignId === quest.campaign
    );
    
    if (compatibleHeroes.length === 0) {
        container.innerHTML = `<p class="select-hint">No heroes available for this campaign. Go to the World Builder to add one!</p>`;
        document.getElementById("btn-start-adventure").disabled = true;
        return;
    }
    
    compatibleHeroes.forEach(hero => {
        const card = document.createElement("div");
        card.className = `hero-option-card ${activeHeroId === hero.id ? "active" : ""}`;
        card.onclick = () => selectHeroForAdventure(hero.id);
        
        card.innerHTML = `
            <h4>${hero.name}</h4>
            <span>${hero.race} • ${hero.class}</span>
        `;
        container.appendChild(card);
    });
    
    // Enable start button if both are chosen
    document.getElementById("btn-start-adventure").disabled = !(activeQuestId && activeHeroId);
}

function selectQuestForAdventure(qid) {
    activeQuestId = qid;
    activeHeroId = null; // reset hero selection
    renderQuestSetup();
}

function selectHeroForAdventure(hid) {
    activeHeroId = hid;
    renderQuestSetup();
}

// Start the adventure
function startAdventure() {
    if (!activeQuestId || !activeHeroId) return;
    
    // Toggle screens
    document.getElementById("adventure-setup-screen").classList.add("hidden");
    document.getElementById("adventure-gameplay-screen").classList.remove("hidden");
    
    // Initialize hero status
    const hero = db.characters.find(c => c.id === activeHeroId);
    
    document.getElementById("status-char-name").innerText = hero.name;
    document.getElementById("status-char-race-class").innerText = `${hero.race} • ${hero.class}`;
    
    // HP calculations based on CON (D&D calculation: 10 + CON modifier)
    const conVal = hero.stats.CON;
    const conMod = Math.floor((conVal - 10) / 2);
    const maxHP = 15 + (conMod * 3);
    
    activeQuestState = {
        hp: maxHP,
        maxHp: maxHP,
        inventory: ["Iron dagger", "Rations (3)", "Silver Emblem"],
        currentNode: "intro"
    };
    
    // Initialize exploration mode variables
    gameMode = "explore";
    const activeMap = QUEST_MAPS[activeQuestId] || QUEST_MAPS["default"];
    exploreHeroPos = { ...activeMap.start };
    exploreMonsters = activeMap.monsters.map(m => ({ ...m }));
    exploreChests = activeMap.chests.map(c => ({ ...c }));
    combatMonsterRef = null;

    document.getElementById("tactical-battle-card").classList.remove("hidden");
    
    updateGameplayStatusPanel();
    
    // Load first node
    const storyContainer = document.getElementById("story-log-container");
    storyContainer.innerHTML = "";
    
    loadQuestNode("intro");
}

function updateGameplayStatusPanel() {
    const hero = db.characters.find(c => c.id === activeHeroId);
    
    document.getElementById("status-hp-current").innerText = activeQuestState.hp;
    document.getElementById("status-hp-max").innerText = activeQuestState.maxHp;
    
    const hpPct = Math.max(0, (activeQuestState.hp / activeQuestState.maxHp) * 100);
    document.getElementById("status-hp-bar").style.width = `${hpPct}%`;
    
    // Modifiers
    const getMod = (val) => {
        const mod = Math.floor((val - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };
    
    document.getElementById("s-str").innerText = getMod(hero.stats.STR);
    document.getElementById("s-dex").innerText = getMod(hero.stats.DEX);
    document.getElementById("s-con").innerText = getMod(hero.stats.CON);
    document.getElementById("s-int").innerText = getMod(hero.stats.INT);
    document.getElementById("s-wis").innerText = getMod(hero.stats.WIS);
    document.getElementById("s-cha").innerText = getMod(hero.stats.CHA);
    
    // Inventory
    const invList = document.getElementById("status-inventory-list");
    invList.innerHTML = "";
    activeQuestState.inventory.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        invList.appendChild(li);
    });
}

function loadQuestNode(nodeId) {
    activeQuestState.currentNode = nodeId;
    const node = QUEST_NODES[activeQuestId][nodeId];
    
    // Update active zone in corner minimap
    updateMinimap(nodeId);

    // Trigger grid-based combat if entering a battle node
    const combatNodes = [
        "glacier-cave", "attic", "sky-board", "sunken-core", "werewolf-fight",
        "swamp-path", "bayou-beast", "woodland-path", "comet-extraction", "escape-drone"
    ];

    if (combatNodes.includes(nodeId) && !battleActive) {
        startGridBattle();
    } else if (!combatNodes.includes(nodeId) && battleActive) {
        endGridBattle();
    }

    // Render text block
    const storyContainer = document.getElementById("story-log-container");
    
    const textBlock = document.createElement("div");
    textBlock.className = "story-block-text";
    textBlock.innerHTML = `<strong>Narrator:</strong> ${node.text}`;
    storyContainer.appendChild(textBlock);
    
    // Apply damage if node contains it
    if (node.damage) {
        activeQuestState.hp = Math.max(0, activeQuestState.hp - node.damage);
        const damageBlock = document.createElement("div");
        damageBlock.className = "story-block-event";
        damageBlock.innerText = `⚠️ You took ${node.damage} damage!`;
        storyContainer.appendChild(damageBlock);
        updateGameplayStatusPanel();
        
        if (activeQuestState.hp <= 0) {
            // Player dies
            setTimeout(() => {
                loadQuestNode("gameover");
            }, 1000);
            return;
        }
    }
    
    // Scroll to bottom
    storyContainer.scrollTop = storyContainer.scrollHeight;
    
    // Render action choices
    const actionsContainer = document.getElementById("story-actions-container");
    actionsContainer.innerHTML = "";
    
    if (battleActive) {
        const combatStatusBlock = document.createElement("div");
        combatStatusBlock.className = "story-block-event";
        combatStatusBlock.style.background = "rgba(239, 68, 68, 0.08)";
        combatStatusBlock.style.borderColor = "var(--color-red)";
        combatStatusBlock.innerText = "⚔️ Tactical Grid Combat is active! Use the grid board in the middle panel to defeat the monster and proceed.";
        actionsContainer.appendChild(combatStatusBlock);
        return;
    }

    if (node.isEnd) {
        const restartBtn = document.createElement("button");
        restartBtn.className = "btn btn-primary";
        restartBtn.innerText = "Finish Quest";
        restartBtn.onclick = () => quitAdventure();
        actionsContainer.appendChild(restartBtn);
        return;
    }
    
    if (node.choices) {
        node.choices.forEach((choice, idx) => {
            const btn = document.createElement("button");
            btn.className = "action-option-btn";
            btn.onclick = () => selectChoice(choice);
            
            let badge = "";
            if (choice.check) {
                badge = `<span class="btn-badge-stat">Roll: ${choice.check.stat} (DC ${choice.check.dc})</span>`;
            }
            
            btn.innerHTML = `
                <span>${choice.text}</span>
                ${badge}
            `;
            actionsContainer.appendChild(btn);
        });
    } else if (node.next) {
        const nextBtn = document.createElement("button");
        nextBtn.className = "btn btn-primary";
        nextBtn.innerText = "Continue...";
        nextBtn.onclick = () => loadQuestNode(node.next);
        actionsContainer.appendChild(nextBtn);
    }

    if (gameMode === "explore" && !battleActive) {
        document.getElementById("tactical-battle-card").classList.remove("hidden");
        renderExplorationGrid();
    }
}

function selectChoice(choice) {
    if (choice.check) {
        // Requires a dice check!
        triggerD20Check(choice.check);
    } else if (choice.next) {
        loadQuestNode(choice.next);
    }
}

// Quit/Abandon adventure
function quitAdventure() {
    activeQuestId = null;
    activeHeroId = null;
    activeQuestState = null;
    
    document.getElementById("adventure-setup-screen").classList.remove("hidden");
    document.getElementById("adventure-gameplay-screen").classList.add("hidden");
    
    renderQuestSetup();
}

// ==========================================
// 7. D20 ROLLER MODAL LOGIC
// ==========================================
function triggerD20Check(check) {
    pendingDiceCheck = check;
    
    const hero = db.characters.find(c => c.id === activeHeroId);
    
    const statNameMap = {
        STR: "Strength Check",
        DEX: "Dexterity Check",
        CON: "Constitution Check",
        INT: "Intelligence Check",
        WIS: "Wisdom Check",
        CHA: "Charisma Check"
    };
    
    document.getElementById("d20-check-title").innerText = statNameMap[check.stat] || "Ability Check";
    document.getElementById("d20-check-desc").innerText = `Target Difficulty Class (DC): ${check.dc}`;
    
    // Mod maths
    const val = hero.stats[check.stat];
    const mod = Math.floor((val - 10) / 2);
    
    document.getElementById("d20-math-mod").innerText = `Mod: ${mod >= 0 ? '+' + mod : mod}`;
    document.getElementById("d20-math-base").innerText = "Roll: --";
    document.getElementById("d20-math-total").innerText = "Total: --";
    
    // Die reset
    const die = document.getElementById("d20-die");
    die.className = "d20-die";
    document.getElementById("d20-result-display").innerText = "20";
    
    // Show buttons
    document.getElementById("btn-trigger-roll").classList.remove("hidden");
    document.getElementById("btn-continue-story").classList.add("hidden");
    document.getElementById("d20-roll-outcome").classList.add("hidden");
    
    // Show modal
    document.getElementById("d20-modal").classList.remove("hidden");
}

function performD20Roll() {
    const rollButton = document.getElementById("btn-trigger-roll");
    rollButton.disabled = true;
    
    const die = document.getElementById("d20-die");
    die.classList.add("rolling");
    
    // Spin animation
    setTimeout(() => {
        die.classList.remove("rolling");
        
        const roll = Math.floor(Math.random() * 20) + 1;
        document.getElementById("d20-result-display").innerText = roll;
        
        const hero = db.characters.find(c => c.id === activeHeroId);
        const val = hero.stats[pendingDiceCheck.stat];
        const mod = Math.floor((val - 10) / 2);
        const total = roll + mod;
        
        document.getElementById("d20-math-base").innerText = `Roll: ${roll}`;
        document.getElementById("d20-math-total").innerText = `Total: ${total}`;
        
        const outcomeMsg = document.getElementById("d20-roll-outcome");
        outcomeMsg.classList.remove("hidden");
        
        let isSuccess = total >= pendingDiceCheck.dc;
        
        // Critical results
        if (roll === 20) {
            die.classList.add("nat20");
            outcomeMsg.innerText = "CRITICAL SUCCESS! (Nat 20)";
            outcomeMsg.className = "roll-outcome-message success";
            isSuccess = true;
        } else if (roll === 1) {
            die.classList.add("nat1");
            outcomeMsg.innerText = "CRITICAL FAILURE! (Nat 1)";
            outcomeMsg.className = "roll-outcome-message fail";
            isSuccess = false;
        } else if (isSuccess) {
            outcomeMsg.innerText = `SUCCESS! (Beat DC ${pendingDiceCheck.dc})`;
            outcomeMsg.className = "roll-outcome-message success";
        } else {
            outcomeMsg.innerText = `FAILURE! (Missed DC ${pendingDiceCheck.dc})`;
            outcomeMsg.className = "roll-outcome-message fail";
        }
        
        pendingDiceCheck.resolvedNode = isSuccess ? pendingDiceCheck.success : pendingDiceCheck.fail;
        pendingDiceCheck.rollDetails = { roll, mod, total, isSuccess };
        
        // Switch buttons
        rollButton.disabled = false;
        rollButton.classList.add("hidden");
        document.getElementById("btn-continue-story").classList.remove("hidden");
    }, 1200);
}

function resolveD20Check() {
    // Hide modal
    document.getElementById("d20-modal").classList.add("hidden");
    
    const details = pendingDiceCheck.rollDetails;
    const nextNode = pendingDiceCheck.resolvedNode;
    
    // Log the roll event
    const storyContainer = document.getElementById("story-log-container");
    const eventBlock = document.createElement("div");
    eventBlock.className = `story-block-outcome ${details.isSuccess ? 'success' : 'fail'}`;
    eventBlock.innerHTML = `
        🎲 <strong>Dice Roll Event:</strong> Rolled <strong>${details.roll}</strong> with modifier ${details.mod >= 0 ? '+' + details.mod : details.mod}. 
        Total: <strong>${details.total}</strong> vs Difficulty DC ${pendingDiceCheck.dc}. 
        Result: <strong>${details.isSuccess ? 'PASSED' : 'FAILED'}</strong>!
    `;
    storyContainer.appendChild(eventBlock);
    
    loadQuestNode(nextNode);
    pendingDiceCheck = null;
}

// ==========================================
// 8. WORLD BUILDER & DATABASE MANAGEMENT
// ==========================================
let activeFormTab = "character";

function switchEditorForm(formType) {
    activeFormTab = formType;
    
    document.getElementById("tab-edit-char").classList.toggle("active", formType === "character");
    document.getElementById("tab-edit-loc").classList.toggle("active", formType === "location");
    document.getElementById("tab-edit-camp").classList.toggle("active", formType === "campaign");
    document.getElementById("tab-edit-quest").classList.toggle("active", formType === "quest");
    
    document.getElementById("form-add-character").classList.toggle("hidden", formType !== "character");
    document.getElementById("form-add-location").classList.toggle("hidden", formType !== "location");
    document.getElementById("form-add-campaign").classList.toggle("hidden", formType !== "campaign");
    document.getElementById("form-add-quest").classList.toggle("hidden", formType !== "quest");
}

function populateFormSelects() {
    const charSelect = document.getElementById("char-campaign");
    const locSelect = document.getElementById("loc-campaign");
    const questSelect = document.getElementById("quest-campaign");
    
    if (!charSelect || !locSelect || !questSelect) return;

    charSelect.innerHTML = "";
    locSelect.innerHTML = "";
    questSelect.innerHTML = "";
    
    db.campaigns.forEach(c => {
        const opt1 = document.createElement("option");
        opt1.value = c.id;
        opt1.innerText = c.title;
        charSelect.appendChild(opt1);
        
        const opt2 = document.createElement("option");
        opt2.value = c.id;
        opt2.innerText = c.title;
        locSelect.appendChild(opt2);

        const opt3 = document.createElement("option");
        opt3.value = c.id;
        opt3.innerText = c.title;
        questSelect.appendChild(opt3);
    });
}

// Create Character Submit
function saveCharacter(e) {
    e.preventDefault();
    
    const campaignId = document.getElementById("char-campaign").value;
    const name = document.getElementById("char-name").value.trim();
    const race = document.getElementById("char-race").value.trim();
    const charClass = document.getElementById("char-class").value.trim();
    const bio = document.getElementById("char-bio").value.trim();
    
    // Stats
    const stats = {
        STR: parseInt(document.getElementById("stat-str").value),
        DEX: parseInt(document.getElementById("stat-dex").value),
        CON: parseInt(document.getElementById("stat-con").value),
        INT: parseInt(document.getElementById("stat-int").value),
        WIS: parseInt(document.getElementById("stat-wis").value),
        CHA: parseInt(document.getElementById("stat-cha").value)
    };
    
    // Quotes parsing (newline separated)
    const rawQuotes = document.getElementById("char-quotes").value;
    const quotes = rawQuotes.split("\n").map(q => q.trim()).filter(q => q.length > 0);
    
    // Generate simple slug ID
    const id = "custom-char-" + name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
    
    const newChar = {
        id,
        campaignId,
        name,
        race,
        class: charClass,
        stats,
        bio,
        quotes,
        isCustom: true
    };
    
    db.characters.push(newChar);
    saveDbToLocalStorage();
    
    // Reset form
    document.getElementById("form-add-character").reset();
    alert(`Character "${name}" successfully registered!`);
    
    // Re-render codex
    renderCodex();
}

// Create Location Submit
function saveLocation(e) {
    e.preventDefault();
    
    const campaignId = document.getElementById("loc-campaign").value;
    const name = document.getElementById("loc-name").value.trim();
    const description = document.getElementById("loc-description").value.trim();
    const danger = document.getElementById("loc-danger").value.trim() || "Mild";
    
    const id = "custom-loc-" + name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
    
    const newLoc = {
        id,
        campaignId,
        name,
        description,
        danger,
        isCustom: true
    };
    
    db.locations.push(newLoc);
    saveDbToLocalStorage();
    
    document.getElementById("form-add-location").reset();
    alert(`Location "${name}" successfully registered!`);
    
    renderCodex();
}

// Create Campaign Submit
function saveCampaign(e) {
    e.preventDefault();
    
    const id = document.getElementById("camp-id").value.trim().toLowerCase().replace(/[^a-z0-9]/g, "-");
    const title = document.getElementById("camp-title").value.trim();
    const description = document.getElementById("camp-desc").value.trim();
    
    // Check duplication
    if (db.campaigns.find(c => c.id === id)) {
        alert("A campaign with this ID or URL already exists!");
        return;
    }
    
    const newCamp = {
        id,
        title,
        description,
        isCustom: true
    };
    
    db.campaigns.push(newCamp);
    saveDbToLocalStorage();
    initializeCustomQuests();
    renderQuestSetup();
    
    document.getElementById("form-add-campaign").reset();
    alert(`Campaign "${title}" successfully registered!`);
    
    renderCampaignTabs();
}

function saveQuest(e) {
    e.preventDefault();
    
    const id = document.getElementById("quest-id").value.trim().toLowerCase().replace(/[^a-z0-9]/g, "-");
    const campaignId = document.getElementById("quest-campaign").value;
    const title = document.getElementById("quest-title").value.trim();
    const introText = document.getElementById("quest-intro").value.trim();
    const checkStat = document.getElementById("quest-check-stat").value;
    const checkDC = parseInt(document.getElementById("quest-check-dc").value) || 12;
    const checkPassText = document.getElementById("quest-check-pass").value.trim();
    const monsterName = document.getElementById("quest-monster").value.trim();
    const lootItem = document.getElementById("quest-loot").value.trim();
    const victoryText = document.getElementById("quest-victory").value.trim();

    if (QUESTS_DATA[id]) {
        alert("A quest with this ID already exists!");
        return;
    }

    const desc = introText.substring(0, 120) + "...";
    const camp = db.campaigns.find(c => c.id === campaignId);

    QUESTS_DATA[id] = {
        title: title,
        campaign: campaignId,
        description: desc,
        compatibleHeroes: db.characters.filter(ch => ch.campaignId === campaignId).map(ch => ch.id),
        startNode: "intro",
        isCustom: true
    };

    QUEST_NODES[id] = {
        "intro": {
            text: introText,
            choices: [
                { text: `Perform ${checkStat} check`, check: { stat: checkStat, dc: checkDC }, next: "scout-success" },
                { text: "Advance forward cautiously", next: "combat-encounter" }
            ]
        },
        "scout-success": {
            text: `${checkPassText} You secure a tactical advantage!`,
            next: "combat-encounter"
        },
        "combat-encounter": {
            text: `Suddenly, a fierce ${monsterName} lunges forward from the shadows! Draw your weapon!`,
            next: "victory"
        },
        "victory": {
            text: victoryText,
            isEnd: true
        },
        "gameover": {
            text: "You have fallen in combat. The history of this world will have to be written by another.",
            isEnd: true
        }
    };

    QUEST_MAPS[id] = {
        width: 8,
        height: 8,
        start: { x: 0, y: 7 },
        goal: { x: 7, y: 0 },
        obstacles: [
            { x: 1, y: 7 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 3 }, { x: 6, y: 3 }
        ],
        monsters: [
            { id: `monster-${id}`, name: monsterName, x: 4, y: 3 }
        ],
        chests: [
            { x: 2, y: 4, looted: false, item: lootItem }
        ],
        regionInfo: `${camp ? camp.title : "Custom"} Dungeon Grid`,
        obstacleChar: "🌲"
    };

    if (!db.customQuests) {
        db.customQuests = [];
    }
    db.customQuests.push({
        id,
        campaignId,
        title,
        introText,
        checkStat,
        checkDC,
        checkPassText,
        monsterName,
        lootItem,
        victoryText
    });

    saveDbToLocalStorage();
    renderQuestSetup();
    renderDatabaseElementsList();
    
    document.getElementById("form-add-quest").reset();
    alert(`D&D Campaign Quest "${title}" successfully compiled! Proceed to Adventure Mode to play.`);
}

// Render Database list of custom items
function renderDatabaseElementsList() {
    const list = document.getElementById("db-elements-list");
    list.innerHTML = "";
    
    let hasItems = false;
    
    // Render characters
    db.characters.forEach(item => {
        const div = document.createElement("div");
        div.className = `db-list-item ${item.isCustom ? 'custom' : ''}`;
        
        const deleteButton = item.isCustom 
            ? `<button class="btn-delete-item" onclick="deleteDbItem('character', '${item.id}')" title="Delete custom character">&times;</button>`
            : `<span style="font-size: 0.75rem; color: var(--color-gold);">Canon</span>`;
            
        div.innerHTML = `
            <div class="db-item-info">
                <h4>${item.name}</h4>
                <span>Character • ${item.race}</span>
            </div>
            ${deleteButton}
        `;
        list.appendChild(div);
        hasItems = true;
    });
    
    // Render locations
    db.locations.forEach(item => {
        const div = document.createElement("div");
        div.className = `db-list-item ${item.isCustom ? 'custom' : ''}`;
        
        const deleteButton = item.isCustom 
            ? `<button class="btn-delete-item" onclick="deleteDbItem('location', '${item.id}')" title="Delete custom location">&times;</button>`
            : `<span style="font-size: 0.75rem; color: var(--color-gold);">Canon</span>`;
            
        div.innerHTML = `
            <div class="db-item-info">
                <h4>${item.name}</h4>
                <span>Location</span>
            </div>
            ${deleteButton}
        `;
        list.appendChild(div);
        hasItems = true;
    });

    // Render campaigns
    db.campaigns.forEach(item => {
        const div = document.createElement("div");
        div.className = `db-list-item ${item.isCustom ? 'custom' : ''}`;
        
        const deleteButton = item.isCustom 
            ? `<button class="btn-delete-item" onclick="deleteDbItem('campaign', '${item.id}')" title="Delete custom campaign">&times;</button>`
            : `<span style="font-size: 0.75rem; color: var(--color-gold);">Canon</span>`;
            
        div.innerHTML = `
            <div class="db-item-info">
                <h4>${item.title}</h4>
                <span>World / Campaign</span>
            </div>
            ${deleteButton}
        `;
        list.appendChild(div);
        hasItems = true;
    });

    // Render quests
    if (db.customQuests) {
        db.customQuests.forEach(item => {
            const div = document.createElement("div");
            div.className = "db-list-item custom";
            div.innerHTML = `
                <div class="db-item-info">
                    <h4>${item.title}</h4>
                    <span>Custom DM Quest</span>
                </div>
                <button class="btn-delete-item" onclick="deleteDbItem('quest', '${item.id}')" title="Delete custom quest">&times;</button>
            `;
            list.appendChild(div);
            hasItems = true;
        });
    }
    
    if (!hasItems) {
        list.innerHTML = `<p class="editor-desc">Registry is empty.</p>`;
    }
}

// Delete item
function deleteDbItem(type, id) {
    if (!confirm(`Are you sure you want to delete this custom ${type}?`)) return;
    
    if (type === "character") {
        db.characters = db.characters.filter(c => c.id !== id);
    } else if (type === "location") {
        db.locations = db.locations.filter(l => l.id !== id);
    } else if (type === "campaign") {
        db.campaigns = db.campaigns.filter(c => c.id !== id);
        db.characters = db.characters.filter(c => c.campaignId !== id);
        db.locations = db.locations.filter(l => l.campaignId !== id);
    } else if (type === "quest") {
        if (db.customQuests) {
            db.customQuests = db.customQuests.filter(q => q.id !== id);
        }
        delete QUESTS_DATA[id];
        delete QUEST_NODES[id];
        delete QUEST_MAPS[id];
    }
    
    saveDbToLocalStorage();
    renderCampaignTabs();
    renderCodex();
    renderQuestSetup();
    renderDatabaseElementsList();
}

// ==========================================
// 9. IMPORT / EXPORT REGISTRY FILE
// ==========================================
function exportDatabase() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "avantris_world.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importDatabase(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate basic structure
            if (!importedData.campaigns || !importedData.characters || !importedData.locations) {
                throw new Error("Invalid format. Missing campaigns, characters, or locations arrays.");
            }
            
            if (confirm("Would you like to completely overwrite your current database with this file? (Click Cancel to MERGE instead)")) {
                db = importedData;
            } else {
                // Merge lists (avoid duplications)
                importedData.campaigns.forEach(c => {
                    if (!db.campaigns.find(existing => existing.id === c.id)) db.campaigns.push(c);
                });
                importedData.characters.forEach(c => {
                    if (!db.characters.find(existing => existing.id === c.id)) db.characters.push(c);
                });
                importedData.locations.forEach(l => {
                    if (!db.locations.find(existing => existing.id === l.id)) db.locations.push(l);
                });
            }
            
            saveDbToLocalStorage();
            renderCampaignTabs();
            renderCodex();
            renderQuestSetup();
            alert("Database imported successfully!");
        } catch (err) {
            alert("Error importing database: " + err.message);
        }
    };
    reader.readAsText(file);
}

// ==========================================
// 10. CHRONICLES & TIMELINE ENGINE
// ==========================================
const TIMELINE_DATA = [
    {
        era: "1000 BP (Before Prime)",
        class: "icebound",
        campaign: "Icebound",
        summary: "The earliest recorded era of Avantris lore. A group of five shipwrecked survivalists (including the triton Barnabos and the firbolg Jornir) struggle against the biting frost of the glacial peaks of northern Avantris.",
        connection: "This era establishes the ancient frost magic and primordial deities of the northern wastes. The survival techniques and mystical frost ruins explored here set the historical boundaries of the civilized continent.",
        episodes: [
            { num: "Ep. 1", title: "The Southward Gambit", summary: "The shipwreck of the More Abound; party struggles to establish basic shelter in subzero Drakkar." },
            { num: "Ep. 12", title: "Make No Fire", summary: "Trapped in a magical blizzard; heavy survival checks and tracking of rations." },
            { num: "Ep. 26", title: "Hollowed Out", summary: "Uncovering the first signs of the frozen leviathan's influence under the ice." },
            { num: "Ep. 45", title: "The Eternal Frost", summary: "The final stand against the cult; sealing the leviathan and heading south." }
        ]
    },
    {
        era: "400 BP",
        class: "curse-of-strahdanya",
        campaign: "Curse of Strahdanya",
        summary: "Professor Clayton Azran leads an academic expedition into the fog-shrouded valley of Barovia. They encounter Countess Strahdanya von Zarovich and struggle to survive planar isolation.",
        connection: "This campaign introduces planar rifts and the mists of Ravenloft. The planar theories documented by Professor Azran are later used to explain the dimensional leakage that corrupts the fey borders in later eras.",
        episodes: [
            { num: "Prologue", title: "The Doomed Expedition", summary: "Professor Azran's team crosses the mist boundary to study planar anomalies." },
            { num: "Ep. 1", title: "Death House", summary: "Investigating a haunted manor on the edge of the Barovian woods." },
            { num: "Ep. 15", title: "Phantasmagoria", summary: "Clayton receives a vision from the Divination deck showing Strahdanya's past." },
            { num: "Ep. 45", title: "Blood Moon", summary: "Final battle in Castle Ravenloft; Countess Strahdanya is sealed in her coffin." }
        ]
    },
    {
        era: "200 BP",
        class: "beneath-dark-wings",
        campaign: "Beneath Dark Wings",
        summary: "An age of floating cities and magnificent airships. The goliath Toa Kamanui and tabaxi cleric Iris of the Sands sail the skies, defending the heavens from planar incursions.",
        connection: "Sky-ports established during this era fell to earth during the great aerial wars, their ruins sinking into the oceans and directly creating the dangerous reefs and sunken shipwrecks found in Shroud Over Saltmarsh.",
        episodes: [
            { num: "Ep. 1", title: "Skyborn", summary: "The crew steals the imperial airship, The Silver Kestrel, escaping sky patrols." },
            { num: "Ep. 14", title: "The Aether Storm", summary: "Maneuvering through a tempest; Lufti performs an inter-ship jump between rigging." },
            { num: "Ep. 35", title: "Crimson Sails", summary: "Battle of Sky Fortress; imperial fleet destroyed, ports fall to the sea." }
        ]
    },
    {
        era: "190 BP",
        class: "shroud-over-saltmarsh",
        campaign: "Shroud Over Saltmarsh",
        summary: "Set shortly after the fall of the sky empires. The paladin Poros of Malthea sails the Azure Maiden through the smuggler-infested waters of the coastal town of Saltmarsh.",
        connection: "The oceanic rifts and cults encountered in the Saltmarsh seas weaken the material plane boundaries. This planar thinning eventually allows fey wild-magic to bleed into the world, forming the Witchlight Carnival gateway.",
        episodes: [
            { num: "Ep. 1", title: "Smuggler's Run", summary: "Uncovering illegal trade routes and contraband underneath the cliffs of Saltmarsh." },
            { num: "Ep. 10", title: "Sunken Reefs", summary: "Navigating the reefs of the crashed Kestrel airship port." },
            { num: "Ep. 25", title: "Oceanic Vortex", summary: "Defeating the high priest of the sea cult, sealing the coastal rift." }
        ]
    },
    {
        era: "100 BP",
        class: "edge-of-midnight",
        campaign: "Edge of Midnight",
        summary: "A folk-horror story set in the steam-filled, eternal night of Druskenvald. The Twilight Elf Lethica and the scarecrow bard Jericho Sticks confront dark covenants and the beast Stryga.",
        connection: "The dark rituals of Stryga corrupt the local planar boundaries. This lingering gothic shadow seeps through the earth, directly weakening the barriers to the Feywild and setting up the fey corruption.",
        episodes: [
            { num: "Ep. 1", title: "Mill Street Murders", summary: "Finding straw dolls left at the murder scenes; Jericho joins the party." },
            { num: "Ep. 18", title: "The Wolf's Den", summary: "Infiltrating a werewolf den in the industrial district." },
            { num: "Ep. 35", title: "Broken Gears", summary: "Disabling the eclipse tower; fey gates start to escape and destabilize." }
        ]
    },
    {
        era: "15 BP",
        class: "once-upon-a-witchlight",
        campaign: "Once Upon a Witchlight",
        summary: "The Carnivàle Lecroux (Kremy, Gideon, Gricko, Morning Frost) crosses the boundary into the Feywild plane of Prismeer. Gideon Coal accidentally punches the clown Chuckles to death.",
        connection: "Chuckles' death binds him as a malevolent spirit haunting Gideon Coal. The group's actions in restoring the Feywild rulers stabilize the planar thinning, preventing the total collapse of the material plane before Year 0.",
        episodes: [
            { num: "Ep. 1", title: "The Southward Scam", summary: "Kremy sells false youth potions; Gideon punches a clown." },
            { num: "Ep. 6", title: "Guys' Night", summary: "The party gets drunk at a fey tavern, summoning a magic beast." },
            { num: "Ep. 16", title: "Monarch for a Day", summary: "Gricko is crowned king of the swamp frogs, causing complete chaos." },
            { num: "Ep. 42", title: "All Dolled Up", summary: "The party is shrunk and forced to navigate a creepy dollhouse." }
        ]
    },
    {
        era: "Year 0 (Present Day)",
        class: "prime",
        campaign: "Prime",
        summary: "The central campaign in the present day. Legendary heroes like Rodek Stonehearth and Vandrys Truestrike stand together to defend the continent from contemporary threats.",
        connection: "The anchor of the timeline. The historic footprints of all previous eras (ancient ruins, planar documents, airship wrecks, and the lingering spirit of Chuckles) converge in this modern age, defining the state of the world today.",
        episodes: [
            { num: "Ch. 1", title: "Stone and Steel", summary: "The party defends a dwarven caravan from goblin raiders near the forge." },
            { num: "Ch. 32", title: "Anthem", summary: "A dimensional rift brings the ghost ship Azure Maiden into the harbor." },
            { num: "Ch. 35", title: "Going Down the Bayou", summary: "The party traverses a swamp that has warped into the Feywild." },
            { num: "Ch. 91", title: "The Prime Seal", summary: "The global portals are sealed, leaking raw magic into space." }
        ]
    },
    {
        era: "Spin-Off Dimension",
        class: "uprooted",
        campaign: "Uprooted: Dimwits of the Dimwood",
        summary: "A woodland adventure in the Dimwood, featuring animal vagabonds like the mouse rogue Bitsy and badger Grumley dealing with forest wars.",
        connection: "While set in an alternate animal-centric woodland plane, ancient druidic circles and portals link the Dimwood directly to the Feywild swamps traversed by the Carnivàle Lecroux.",
        episodes: [
            { num: "S1 Ep. 1", title: "Cat and Mouse", summary: "Bitsy slips into a cat outpost to steal political maps." },
            { num: "S1 Ep. 5", title: "Crazy River", summary: "Crossing a rushing river on a fragile raft under fire." },
            { num: "S2 Ep. 14", title: "Plague Reigns", summary: "Defeating the mad scientist rat, saving the forest." }
        ]
    },
    {
        era: "Cosmic Future",
        class: "stardust-rhapsody",
        campaign: "Stardust Rhapsody",
        summary: "A sci-fi space opera set in the far future where the crew of the Rhapsody travels the galaxy, dealing with space portals and alien empires.",
        connection: "The descendants and reincarnations of the ancient heroes venture into space. The legendary Chuckles the Clown returns here as a space jester clone, maintaining the chaotic legacy of the clown-o-verse.",
        episodes: [
            { num: "Prelude", title: "Bounty Days", summary: "Pyke and Rett's early bounty-hunting days in space." },
            { num: "Ep. 1", title: "Space Goblins", summary: "The crew of the Rhapsody takes a contract on a space goblin." },
            { num: "Ep. 20", title: "The Comet Chase", summary: "Pursuing a comet containing frozen magical cores." }
        ]
    },
    {
        era: "Neon Future",
        class: "neon-odyssey",
        campaign: "Neon Odyssey",
        summary: "A cyberpunk space odyssey featuring massive corporate wars, cybernetic rogue fighters, and conflicts with the Bloodfleet faction.",
        connection: "The ultimate culmination of the technology and magic of Avantris, where the Bloodfleet megacorp exploits ancient planar magic artifacts salvaged from the ruins of Year 0.",
        episodes: [
            { num: "Ep. 1", title: "System Hack", summary: "Hacking corporate database; escaping scanner drones." },
            { num: "Ep. 15", title: "Nebula Strike", summary: "Disabling a Bloodfleet flagship cruiser using a stealth pod." },
            { num: "Ep. 30", title: "Neon Horizon", summary: "Defeating the corporate AI; restoring digital freedom." }
        ]
    }
];

function renderTimeline() {
    const container = document.getElementById("timeline-list-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    TIMELINE_DATA.forEach(item => {
        const div = document.createElement("div");
        div.className = `timeline-item ${item.class}`;
        
        let episodesHtml = "";
        if (item.episodes && item.episodes.length > 0) {
            episodesHtml = `
                <div class="timeline-episodes-section">
                    <h4>Timeline Chronology & Episodes</h4>
                    <table class="timeline-episodes-table">
                        <thead>
                            <tr>
                                <th>Episode</th>
                                <th>Title</th>
                                <th>Legacy Event / Description</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            item.episodes.forEach(ep => {
                episodesHtml += `
                    <tr>
                        <td class="ep-num">${ep.num}</td>
                        <td class="ep-title">${ep.title}</td>
                        <td class="ep-summary">${ep.summary}</td>
                    </tr>
                `;
            });
            episodesHtml += `
                        </tbody>
                    </table>
                </div>
            `;
        }
        
        div.innerHTML = `
            <div class="timeline-node-dot"></div>
            <div class="timeline-item-card">
                <div class="timeline-card-header">
                    <h3>${item.campaign}</h3>
                    <span class="timeline-era-badge">${item.era}</span>
                </div>
                <div class="timeline-content">
                    <p>${item.summary}</p>
                    <div class="timeline-connection-box">
                        <h4>Timeline Connection & Legacy</h4>
                        <p>${item.connection}</p>
                    </div>
                    ${episodesHtml}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// ==========================================
// 8. TACTICAL GRID COMBAT ENGINE (SWORD & STAFF STYLE)
// ==========================================
let battleActive = false;
let heroPos = { x: 1, y: 1 };
let monsterPos = { x: 4, y: 4 };
let monsterHP = 25;
let maxMonsterHP = 25;
let monsterAC = 13;
let monsterStats = { STR: 12, DEX: 12, CON: 14, INT: 8, WIS: 10, CHA: 10 };
let currentAction = "move"; // 'move', 'strike', 'spell-cone', 'spell-line', 'spell-blast', 'spell-firststrike'
let obstacles = [
    { x: 2, y: 3 },
    { x: 3, y: 2 }
];

let heroInit = 0;
let monsterInit = 0;
let turnOrder = []; // Array of ids: 'hero', 'monster'
let activeTurn = 'hero';

function updateMinimap(nodeId) {
    const container = document.getElementById("minimap-zone-container");
    if (!container) return;
    container.innerHTML = "";

    // Determine zones based on current quest
    let zones = ["Zone 1: Start", "Zone 2: Intermediate", "Zone 3: Destination"];
    let regionDescription = "The Wild Lands of Avantris";
    let zoneDescriptions = [
        "Starting encampment or entry gateway.",
        "Intermediate wilderness paths, full of hazards.",
        "Core destination area where the final outcome awaits."
    ];

    if (activeQuestId === "witchlight-carnival-escape") {
        zones = ["Carriage Hub", "Hither Swamps", "Carnival Gates"];
        regionDescription = "Prismeer & Witchlight Carnival grounds";
        zoneDescriptions = [
            "Carriage Hub: The entry portal filled with sparkling tents.",
            "Hither Swamps: Thick foggy marshes where Chuckles the Clown lurks.",
            "Carnival Gates: The final threshold to freedom."
        ];
    } else if (activeQuestId === "dimwood-ambush") {
        zones = ["Oak Canopy", "Runic Archway", "Outpost"];
        regionDescription = "The Dimwood Forest, Year 0";
        zoneDescriptions = [
            "Oak Canopy: Dense, dark forest floor where shadows cling.",
            "Runic Archway: An ancient stone gate pulsing with ley energy.",
            "Outpost: The fortified sanctuary of the frontier wardens."
        ];
    } else if (activeQuestId === "icebound-survival") {
        zones = ["Crashsite", "Glaciers", "Survival Cave"];
        regionDescription = "Drakkar Glaciers, Northern Avantris";
        zoneDescriptions = [
            "Crashsite: The ship wreckage of the More Abound.",
            "Glaciers: Subzero mountain passes swept by freezing blizzards.",
            "Survival Cave: A natural hot-spring vault shielded from storm winds."
        ];
    } else if (activeQuestId === "curse-of-strahdanya-house") {
        zones = ["Entry Hall", "Dusty Attic", "Ravenloft Exit"];
        regionDescription = "The Realm of Barovia";
        zoneDescriptions = [
            "Entry Hall: The decaying foyer of Death House.",
            "Dusty Attic: Haunted storage rooms filled with ghost wards.",
            "Ravenloft Exit: The final escape tunnel leading to the misty gates."
        ];
    } else if (activeQuestId === "beneath-dark-wings-storm") {
        zones = ["Blockade", "Rigging Deck", "Skyport Stryga"];
        regionDescription = "The Skies above the Sunken Skyport";
        zoneDescriptions = [
            "Blockade: Sky-merchant customs post.",
            "Rigging Deck: High-altitude rigging of the airship Silver Kestrel.",
            "Skyport Stryga: A floating fortress landing dock."
        ];
    } else if (activeQuestId === "shroud-over-saltmarsh-reef") {
        zones = ["Ship Deck", "Sunken Reefs", "Saltmarsh Port"];
        regionDescription = "The Azure Sea & Saltmarsh";
        zoneDescriptions = [
            "Ship Deck: The deck of the smuggler vessel Azure Maiden.",
            "Sunken Reefs: Shipwreck ruins overgrown with magical corals.",
            "Saltmarsh Port: The rocky harbor of the coastal town."
        ];
    } else if (activeQuestId === "edge-of-midnight-hunt") {
        zones = ["Cobble Streets", "Steam Mill", "Lair Entrance"];
        regionDescription = "Mill Street, Steam-cyberpunk metropolis";
        zoneDescriptions = [
            "Cobble Streets: Victorian cobblestone alleyways shrouded in fog.",
            "Steam Mill: The gears and piping of the industrial factory.",
            "Lair Entrance: Sewer threshold where the alpha werewolf resides."
        ];
    } else if (activeQuestId === "prime-ley-line") {
        zones = ["Bayou Rift", "Stonehearth Forge", "Prime Seal"];
        regionDescription = "The Bayou, Year 800 (Prime)";
        zoneDescriptions = [
            "Bayou Rift: Swamp waters crackling with raw planar electricity.",
            "Stonehearth Forge: An ancient dwarven foundry built over lava.",
            "Prime Seal: The central monolith holding the timeline together."
        ];
    } else if (activeQuestId === "stardust-rhapsody-chase") {
        zones = ["Rhapsody", "Meteor Field", "Comet Core"];
        regionDescription = "The Deep Cosmos Space Portals";
        zoneDescriptions = [
            "Rhapsody: The command bridge of the starship Rhapsody.",
            "Meteor Field: Asteroid debris swarming with space pirates.",
            "Comet Core: A frozen comet containing concentrated magical dust."
        ];
    } else if (activeQuestId === "neon-odyssey-hack") {
        zones = ["Metropolis Vents", "Server Room", "Safehouse"];
        regionDescription = "Megacity 9 Cyberpunk Core";
        zoneDescriptions = [
            "Metropolis Vents: Narrow airshaft maintenance grids.",
            "Server Room: Main vault housing the corporate scanner AI.",
            "Safehouse: The hidden enclave of the hacker network."
        ];
    } else if (activeQuestId && activeQuestId.startsWith("quest-")) {
        const campId = activeQuestId.replace("quest-", "");
        const camp = db.campaigns.find(c => c.id === campId);
        if (camp) {
            regionDescription = `${camp.title} Custom Campaign Map`;
        }
    }

    // Determine active zone index
    let activeIndex = 0;
    if (nodeId === "victory") {
        activeIndex = 2;
    } else if (
        nodeId === "swamp-path" ||
        nodeId === "woodland-path" ||
        nodeId === "glacier-cave" ||
        nodeId === "attic" ||
        nodeId === "sky-board" ||
        nodeId === "sunken-core" ||
        nodeId === "werewolf-fight" ||
        nodeId === "bayou-beast" ||
        nodeId === "comet-extraction" ||
        nodeId === "escape-drone" ||
        nodeId === "final-stretch" ||
        nodeId === "final-check"
    ) {
        activeIndex = 1;
    }

    const details = document.getElementById("minimap-details");

    if (mapZoomedIn) {
        // Zoomed In View: Focus on active zone details
        container.style.gridTemplateColumns = "1fr";
        
        const div = document.createElement("div");
        div.className = "minimap-zone active";
        div.style.padding = "0.75rem";
        div.style.fontSize = "0.85rem";
        div.innerHTML = `📍 <strong>Active Zone:</strong> ${zones[activeIndex]}`;
        container.appendChild(div);

        if (details) {
            details.innerHTML = `
                <strong>Region:</strong> ${regionDescription}<br>
                <strong>Active Coordinates:</strong> Zone ${activeIndex + 1} of ${zones.length}<br>
                <strong>Zone Details:</strong> ${zoneDescriptions[activeIndex] || "Exploring area."}
            `;
        }
    } else {
        // Zoomed Out View: Show broad perspective (3 connected nodes)
        container.style.gridTemplateColumns = `repeat(${zones.length}, 1fr)`;

        zones.forEach((zoneName, index) => {
            const div = document.createElement("div");
            div.className = "minimap-zone";
            if (index === activeIndex) {
                div.className += " active";
            } else if (index < activeIndex) {
                div.className += " visited";
            }
            if (index < zones.length - 1) {
                div.className += " connected";
            }
            div.innerText = `${index + 1}. ${zoneName.split(":")[0]}`;
            container.appendChild(div);
        });

        if (details) {
            details.innerHTML = `
                <strong>Campaign Region Map:</strong> ${regionDescription}<br>
                <strong>Broad Perspective:</strong> Connected travel lanes. Unloaded sub-zones are disabled to conserve resources (Monster Hunter style loading triggers).
            `;
        }
    }
}

function startGridBattle() {
    battleActive = true;
    monsterHP = 25;
    maxMonsterHP = 25;
    heroPos = { x: 1, y: 1 };
    monsterPos = { x: 4, y: 4 };
    currentAction = "move";

    document.getElementById("tactical-battle-card").classList.remove("hidden");

    // D&D Initiative Roll
    const hero = db.characters.find(c => c.id === activeHeroId);
    const heroDex = hero.stats.DEX;
    const heroDexMod = Math.floor((heroDex - 10) / 2);
    const heroRoll = Math.floor(Math.random() * 20) + 1;
    heroInit = heroRoll + heroDexMod;

    const monsterRoll = Math.floor(Math.random() * 20) + 1;
    const monsterDexMod = Math.floor((monsterStats.DEX - 10) / 2);
    monsterInit = monsterRoll + monsterDexMod;

    const storyContainer = document.getElementById("story-log-container");
    const initBlock = document.createElement("div");
    initBlock.className = "story-block-event";
    initBlock.innerHTML = `🎲 <strong>D&D Initiative Roll!</strong><br>
    - 👤 You rolled: d20 (${heroRoll}) + Dex Mod (${heroDexMod >= 0 ? '+' + heroDexMod : heroDexMod}) = <strong>${heroInit}</strong><br>
    - 👹 Monster rolled: d20 (${monsterRoll}) + Dex Mod (${monsterDexMod >= 0 ? '+' + monsterDexMod : monsterDexMod}) = <strong>${monsterInit}</strong>`;
    storyContainer.appendChild(initBlock);

    if (heroInit >= monsterInit) {
        turnOrder = ['hero', 'monster'];
        activeTurn = 'hero';
        logCombatMessage(`⚔️ Initiative order: You go first!`);
        setTurnIndicator("Your Turn", "var(--color-green)", "rgba(74, 222, 128, 0.12)");
    } else {
        turnOrder = ['monster', 'hero'];
        activeTurn = 'monster';
        logCombatMessage(`👹 Initiative order: The monster goes first!`);
        setTurnIndicator("Monster Turn", "var(--color-red)", "rgba(239, 68, 68, 0.12)");
        triggerMonsterTurn();
    }

    initGridBoard();
    renderBattleAbilitySelector();
    storyContainer.scrollTop = storyContainer.scrollHeight;
}

function setTurnIndicator(text, color, bg) {
    const indicator = document.getElementById("battle-turn-indicator");
    if (indicator) {
        indicator.innerText = text;
        indicator.style.color = color;
        indicator.style.background = bg;
    }
}

function endGridBattle() {
    battleActive = false;
    if (gameMode !== "explore") {
        document.getElementById("tactical-battle-card").classList.add("hidden");
    }
}

function renderBattleAbilitySelector() {
    const selector = document.getElementById("battle-ability-selector");
    if (!selector) return;
    selector.innerHTML = "";

    const actions = [
        { id: "move", name: "Move (1 Space)" },
        { id: "strike", name: "Strike (Reach: 1)" },
        { id: "spell-firststrike", name: "First Strike (Bonus Turn)" },
        { id: "spell-cone", name: "Fire Cone (AoE: 3)" },
        { id: "spell-line", name: "Lightning Line (Range: 4)" },
        { id: "spell-blast", name: "Fireball Blast (Radius: 2)" }
    ];

    actions.forEach(act => {
        const btn = document.createElement("button");
        btn.className = `battle-action-btn ${currentAction === act.id ? "active" : ""}`;
        btn.innerText = act.name;
        btn.onclick = () => {
            currentAction = act.id;
            renderBattleAbilitySelector();
            clearHighlights();
        };
        selector.appendChild(btn);
    });
}

function initGridBoard() {
    const board = document.getElementById("battle-grid-board");
    if (!board) return;
    board.innerHTML = "";

    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.dataset.x = x;
            cell.dataset.y = y;

            if (x === heroPos.x && y === heroPos.y) {
                cell.className += " hero";
                cell.innerText = "H";
            } else if (x === monsterPos.x && y === monsterPos.y) {
                cell.className += " monster";
                cell.innerText = "M";
            } else if (obstacles.some(o => o.x === x && o.y === y)) {
                cell.className += " obstacle";
                cell.innerText = "█";
            }

            cell.onmouseenter = () => highlightAoE(x, y);
            cell.onmouseleave = clearHighlights;
            cell.onclick = () => executeGridAction(x, y);

            board.appendChild(cell);
        }
    }
}

function highlightAoE(targetX, targetY) {
    clearHighlights();
    const cells = document.querySelectorAll(".grid-cell");
    const hx = heroPos.x;
    const hy = heroPos.y;

    if (currentAction === "move") {
        cells.forEach(cell => {
            const cx = parseInt(cell.dataset.x);
            const cy = parseInt(cell.dataset.y);
            const dist = Math.max(Math.abs(cx - hx), Math.abs(cy - hy));
            if (dist === 1 && !obstacles.some(o => o.x === cx && o.y === cy) && !(cx === monsterPos.x && cy === monsterPos.y)) {
                cell.classList.add("range-highlight");
            }
        });
    } else if (currentAction === "strike") {
        const dist = Math.max(Math.abs(targetX - hx), Math.abs(targetY - hy));
        if (dist === 1) {
            cells.forEach(cell => {
                const cx = parseInt(cell.dataset.x);
                const cy = parseInt(cell.dataset.y);
                if (cx === targetX && cy === targetY) {
                    cell.classList.add("aoe-highlight");
                }
            });
        }
    } else if (currentAction === "spell-cone") {
        const dx = targetX - hx;
        const dy = targetY - hy;
        if (dx === 0 && dy === 0) return;

        const isHorizontal = Math.abs(dx) >= Math.abs(dy);
        const dir = isHorizontal ? Math.sign(dx) : Math.sign(dy);

        cells.forEach(cell => {
            const cx = parseInt(cell.dataset.x);
            const cy = parseInt(cell.dataset.y);
            if (isHorizontal) {
                const depth = (cx - hx) * dir;
                if (depth > 0 && depth <= 3) {
                    const offset = Math.abs(cy - hy);
                    if (offset < depth) {
                        cell.classList.add("aoe-highlight");
                    }
                }
            } else {
                const depth = (cy - hy) * dir;
                if (depth > 0 && depth <= 3) {
                    const offset = Math.abs(cx - hx);
                    if (offset < depth) {
                        cell.classList.add("aoe-highlight");
                    }
                }
            }
        });
    } else if (currentAction === "spell-line") {
        const dx = targetX - hx;
        const dy = targetY - hy;
        if (dx === 0 && dy === 0) return;

        const isHorizontal = Math.abs(dx) >= Math.abs(dy);
        const dir = isHorizontal ? Math.sign(dx) : Math.sign(dy);

        cells.forEach(cell => {
            const cx = parseInt(cell.dataset.x);
            const cy = parseInt(cell.dataset.y);
            if (isHorizontal) {
                const depth = (cx - hx) * dir;
                if (depth > 0 && depth <= 4 && cy === hy) {
                    cell.classList.add("aoe-highlight");
                }
            } else {
                const depth = (cy - hy) * dir;
                if (depth > 0 && depth <= 4 && cx === hx) {
                    cell.classList.add("aoe-highlight");
                }
            }
        });
    } else if (currentAction === "spell-blast") {
        cells.forEach(cell => {
            const cx = parseInt(cell.dataset.x);
            const cy = parseInt(cell.dataset.y);
            const dist = Math.abs(cx - targetX) + Math.abs(cy - targetY);
            if (dist <= 1) {
                cell.classList.add("aoe-highlight");
            }
        });
    }
}

function clearHighlights() {
    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.classList.remove("range-highlight");
        cell.classList.remove("aoe-highlight");
    });
}

function executeGridAction(targetX, targetY) {
    if (!battleActive || activeTurn !== 'hero') return;

    const hx = heroPos.x;
    const hy = heroPos.y;

    if (currentAction === "move") {
        const dist = Math.max(Math.abs(targetX - hx), Math.abs(targetY - hy));
        if (dist === 1 && !obstacles.some(o => o.x === targetX && o.y === targetY) && !(targetX === monsterPos.x && targetY === monsterPos.y)) {
            heroPos = { x: targetX, y: targetY };
            initGridBoard();
            logCombatMessage(`👤 You moved to tile [${targetX}, ${targetY}].`);
            triggerMonsterTurn();
        }
    } else if (currentAction === "strike") {
        const dist = Math.max(Math.abs(targetX - hx), Math.abs(targetY - hy));
        if (dist === 1 && targetX === monsterPos.x && targetY === monsterPos.y) {
            // Melee strike vs Monster AC
            const hero = db.characters.find(c => c.id === activeHeroId);
            const str = hero.stats.STR;
            const strMod = Math.floor((str - 10) / 2);
            
            const roll = Math.floor(Math.random() * 20) + 1;
            const totalRoll = roll + strMod;
            const hit = totalRoll >= monsterAC;

            logCombatMessage(`🎲 <strong>Attack Roll vs AC ${monsterAC}:</strong> d20 (${roll}) + Str Mod (${strMod >= 0 ? '+' + strMod : strMod}) = <strong>${totalRoll}</strong>`);

            if (hit) {
                const dmg = Math.floor(Math.random() * 6) + Math.max(1, strMod) + 2; // 1d6 + strMod + 2
                monsterHP = Math.max(0, monsterHP - dmg);
                logCombatMessage(`⚔️ MELEE HIT! You strike the monster for ${dmg} damage. (Monster HP: ${monsterHP}/${maxMonsterHP})`);
                if (monsterHP <= 0) {
                    resolveVictory();
                } else {
                    triggerMonsterTurn();
                }
            } else {
                logCombatMessage("❌ MISS! Your blade bounces off the monster's armor plates.");
                triggerMonsterTurn();
            }
        }
    } else if (currentAction === "spell-firststrike") {
        heroInit += 5;
        logCombatMessage(`✨ FIRST STRIKE! You quicken your speed, gaining +5 Initiative (New Initiative: ${heroInit}). You immediately take a bonus action!`);
        currentAction = "strike";
        renderBattleAbilitySelector();
        initGridBoard();
    } else if (currentAction === "spell-cone") {
        const isHit = targetX === monsterPos.x || targetY === monsterPos.y || (Math.abs(targetX - hx) === Math.abs(monsterPos.x - hx));
        if (isHit) {
            // Monster Dex save vs Spell DC 13
            const saveRoll = Math.floor(Math.random() * 20) + 1;
            const saveMod = Math.floor((monsterStats.DEX - 10) / 2);
            const totalSave = saveRoll + saveMod;
            const saveDC = 13;
            const saved = totalSave >= saveDC;

            const baseDmg = Math.floor(Math.random() * 10) + 4; // 1d10 + 4
            const finalDmg = saved ? Math.floor(baseDmg / 2) : baseDmg;

            logCombatMessage(`🎲 <strong>Monster Dex Save vs Spell DC ${saveDC}:</strong> d20 (${saveRoll}) + Dex Mod (+1) = <strong>${totalSave}</strong> -> ${saved ? "SUCCESS (Half Damage)" : "FAIL (Full Damage)"}`);
            monsterHP = Math.max(0, monsterHP - finalDmg);
            logCombatMessage(`🔥 FLAME CONE! You breathe a fan of fire, dealing ${finalDmg} fire damage. (Monster HP: ${monsterHP}/${maxMonsterHP})`);
            if (monsterHP <= 0) {
                resolveVictory();
            } else {
                triggerMonsterTurn();
            }
        } else {
            logCombatMessage("💨 Your Flame Cone did not reach the monster.");
            triggerMonsterTurn();
        }
    } else if (currentAction === "spell-line") {
        const isHit = (targetX === monsterPos.x && hx === monsterPos.x) || (targetY === monsterPos.y && hy === monsterPos.y);
        if (isHit) {
            // Monster Dex save vs Spell DC 13
            const saveRoll = Math.floor(Math.random() * 20) + 1;
            const saveMod = Math.floor((monsterStats.DEX - 10) / 2);
            const totalSave = saveRoll + saveMod;
            const saveDC = 13;
            const saved = totalSave >= saveDC;

            const baseDmg = Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + 2; // 2d8 + 2
            const finalDmg = saved ? Math.floor(baseDmg / 2) : baseDmg;

            logCombatMessage(`🎲 <strong>Monster Dex Save vs Spell DC ${saveDC}:</strong> d20 (${saveRoll}) + Dex Mod (+1) = <strong>${totalSave}</strong> -> ${saved ? "SUCCESS (Half Damage)" : "FAIL (Full Damage)"}`);
            monsterHP = Math.max(0, monsterHP - finalDmg);
            logCombatMessage(`⚡ LIGHTNING LINE! A straight lightning bolt surges, dealing ${finalDmg} damage. (Monster HP: ${monsterHP}/${maxMonsterHP})`);
            if (monsterHP <= 0) {
                resolveVictory();
            } else {
                triggerMonsterTurn();
            }
        } else {
            logCombatMessage("⚡ Your Lightning Line shot wide.");
            triggerMonsterTurn();
        }
    } else if (currentAction === "spell-blast") {
        const dist = Math.abs(targetX - monsterPos.x) + Math.abs(targetY - monsterPos.y);
        if (dist <= 1) {
            // Monster Con save vs Spell DC 13
            const saveRoll = Math.floor(Math.random() * 20) + 1;
            const saveMod = Math.floor((monsterStats.CON - 10) / 2);
            const totalSave = saveRoll + saveMod;
            const saveDC = 13;
            const saved = totalSave >= saveDC;

            const baseDmg = Math.floor(Math.random() * 12) + 6; // 1d12 + 6
            const finalDmg = saved ? Math.floor(baseDmg / 2) : baseDmg;

            logCombatMessage(`🎲 <strong>Monster Con Save vs Spell DC ${saveDC}:</strong> d20 (${saveRoll}) + Con Mod (+2) = <strong>${totalSave}</strong> -> ${saved ? "SUCCESS (Half Damage)" : "FAIL (Full Damage)"}`);
            monsterHP = Math.max(0, monsterHP - finalDmg);
            logCombatMessage(`💥 FIREBALL BLAST! The spell detonates, dealing ${finalDmg} damage. (Monster HP: ${monsterHP}/${maxMonsterHP})`);
            if (monsterHP <= 0) {
                resolveVictory();
            } else {
                triggerMonsterTurn();
            }
        } else {
            logCombatMessage("💥 The blast exploded away from the monster.");
            triggerMonsterTurn();
        }
    }
}

function rollD20Check(dc) {
    const roll = Math.floor(Math.random() * 20) + 1;
    return roll >= dc;
}

function triggerMonsterTurn() {
    activeTurn = 'monster';
    setTurnIndicator("Monster Turn", "var(--color-red)", "rgba(239, 68, 68, 0.12)");

    setTimeout(() => {
        if (!battleActive) return;

        const hx = heroPos.x;
        const hy = heroPos.y;
        const mx = monsterPos.x;
        const my = monsterPos.y;

        const dist = Math.max(Math.abs(mx - hx), Math.abs(my - hy));
        if (dist === 1) {
            // Monster Melee Attack vs Hero AC
            const hero = db.characters.find(c => c.id === activeHeroId);
            const heroDex = hero.stats.DEX;
            const heroDexMod = Math.floor((heroDex - 10) / 2);
            
            // Assume hero has leather armor (AC = 11 + Dex modifier) or chain mail (16)
            const heroClass = hero.class || hero.charClass || "";
            const heroAC = heroClass.toLowerCase().includes("fighter") || heroClass.toLowerCase().includes("paladin") ? 16 : (11 + heroDexMod);

            const roll = Math.floor(Math.random() * 20) + 1;
            const monsterStrMod = Math.floor((monsterStats.STR - 10) / 2);
            const totalRoll = roll + monsterStrMod;
            const hit = totalRoll >= heroAC;

            logCombatMessage(`🎲 <strong>Monster Attack vs your AC ${heroAC}:</strong> d20 (${roll}) + Str Mod (+1) = <strong>${totalRoll}</strong>`);

            if (hit) {
                const dmg = Math.floor(Math.random() * 6) + 2; // 1d6 + 2 damage
                activeQuestState.hp = Math.max(0, activeQuestState.hp - dmg);
                updateGameplayStatusPanel();
                logCombatMessage(`👹 MONSTER CLAW! The beast slashes you for ${dmg} damage! (Your HP: ${activeQuestState.hp})`);

                if (activeQuestState.hp <= 0) {
                    battleActive = false;
                    loadQuestNode("gameover");
                    return;
                }
            } else {
                logCombatMessage("🛡️ The monster's swipe deflects off your shield/armor!");
            }
        } else {
            // Move towards hero
            const stepX = Math.sign(hx - mx);
            const stepY = Math.sign(hy - my);
            const nextX = mx + stepX;
            const nextY = my + stepY;

            if (!obstacles.some(o => o.x === nextX && o.y === nextY)) {
                monsterPos = { x: nextX, y: nextY };
                logCombatMessage(`👹 The monster strides to [${nextX}, ${nextY}].`);
            }
        }

        activeTurn = 'hero';
        initGridBoard();
        setTurnIndicator("Your Turn", "var(--color-green)", "rgba(74, 222, 128, 0.12)");
    }, 1000);
}

function logCombatMessage(msg) {
    const storyContainer = document.getElementById("story-log-container");
    const block = document.createElement("div");
    block.className = "story-block-event";
    block.innerHTML = msg;
    storyContainer.appendChild(block);
    storyContainer.scrollTop = storyContainer.scrollHeight;
}

function resolveVictory() {
    battleActive = false;

    logCombatMessage("🏆 VICTORY! You have slain the monster!");

    if (combatMonsterRef) {
        exploreMonsters = exploreMonsters.filter(m => m.x !== combatMonsterRef.x || m.y !== combatMonsterRef.y);
        combatMonsterRef = null;
        gameMode = "explore";
        setTimeout(() => {
            document.getElementById("tactical-battle-card").classList.remove("hidden");
            renderExplorationGrid();
        }, 1500);
    } else {
        document.getElementById("tactical-battle-card").classList.add("hidden");
        const node = QUEST_NODES[activeQuestId][activeQuestState.currentNode];
        const nextNode = node.next || "victory";
        setTimeout(() => {
            loadQuestNode(nextNode);
        }, 1500);
    }
}

let mapZoomedIn = true;

function toggleMapZoom() {
    mapZoomedIn = !mapZoomedIn;
    const btn = document.getElementById("btn-toggle-zoom");
    if (btn) {
        btn.innerText = mapZoomedIn ? "View World Map" : "View Local Zone";
    }
    if (activeQuestState && activeQuestState.currentNode) {
        updateMinimap(activeQuestState.currentNode);
    }
}

function initializeCustomQuests() {
    if (!db) return;
    
    if (db.campaigns) {
        db.campaigns.forEach(c => {
            if (c.isCustom) {
                const questId = `quest-${c.id}`;
                if (!QUESTS_DATA[questId]) {
                    QUESTS_DATA[questId] = {
                        title: `The Chronicles of ${c.title}`,
                        description: `Explore and defend the realm of ${c.title} in a custom campaign.`,
                        campaign: c.id,
                        compatibleHeroes: []
                    };
                }
                if (!QUEST_NODES[questId]) {
                    QUEST_NODES[questId] = {
                        intro: {
                            text: `You have stepped into the custom campaign of ${c.title}. The air is rich with mystery and untamed adventure. A shadow hangs over the local outpost.`,
                            choices: [
                                { text: "Perform a scout check", check: { stat: "WIS", dc: 11 }, next: "investigate-success" },
                                { text: "Charge forward with steel", next: "combat-encounter" }
                            ]
                        },
                        "investigate-success": {
                            text: "You spot the creature's path and secure tactical positioning! You enter the clearing ready to strike.",
                            next: "combat-encounter"
                        },
                        "combat-encounter": {
                            text: "Suddenly, a shadow-beast leaps from the brush! Initiate tactical combat.",
                            next: "victory"
                        },
                        victory: {
                            text: `With a final blow, you defeat the shadow-beast. The realm of ${c.title} is secure for now, and your legacy begins!`,
                            isEnd: true
                        },
                        gameover: {
                            text: "You have fallen in combat. The history of this world will have to be written by another.",
                            isEnd: true
                        }
                    };
                }
            }
        });
    }

    if (db.customQuests) {
        db.customQuests.forEach(q => {
            const id = q.id;
            QUESTS_DATA[id] = {
                title: q.title,
                campaign: q.campaignId,
                description: q.introText.substring(0, 120) + "...",
                compatibleHeroes: db.characters.filter(ch => ch.campaignId === q.campaignId).map(ch => ch.id),
                startNode: "intro",
                isCustom: true
            };
            
            QUEST_NODES[id] = {
                "intro": {
                    text: q.introText,
                    choices: [
                        { text: `Perform ${q.checkStat} check`, check: { stat: q.checkStat, dc: q.checkDC }, next: "scout-success" },
                        { text: "Advance forward cautiously", next: "combat-encounter" }
                    ]
                },
                "scout-success": {
                    text: `${q.checkPassText} You secure a tactical advantage!`,
                    next: "combat-encounter"
                },
                "combat-encounter": {
                    text: `Suddenly, a fierce ${q.monsterName} lunges forward from the shadows! Draw your weapon!`,
                    next: "victory"
                },
                "victory": {
                    text: q.victoryText,
                    isEnd: true
                },
                "gameover": {
                    text: "You have fallen in combat. The history of this world will have to be written by another.",
                    isEnd: true
                }
            };

            const camp = db.campaigns.find(c => c.id === q.campaignId);
            QUEST_MAPS[id] = {
                width: 8,
                height: 8,
                start: { x: 0, y: 7 },
                goal: { x: 7, y: 0 },
                obstacles: [
                    { x: 1, y: 7 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 3 }, { x: 6, y: 3 }
                ],
                monsters: [
                    { id: `monster-${id}`, name: q.monsterName, x: 4, y: 3 }
                ],
                chests: [
                    { x: 2, y: 4, looted: false, item: q.lootItem }
                ],
                regionInfo: `${camp ? camp.title : "Custom"} Dungeon Grid`,
                obstacleChar: "🌲"
            };
        });
    }
}

function renderExplorationGrid() {
    const board = document.getElementById("battle-grid-board");
    if (!board) return;
    board.innerHTML = "";
    
    // Set 8x8 layout stylesheet inline
    board.style.gridTemplateColumns = "repeat(8, 1fr)";
    board.style.gridTemplateRows = "repeat(8, 1fr)";

    const map = QUEST_MAPS[activeQuestId] || QUEST_MAPS["default"];
    
    // Update headers
    const titleEl = document.getElementById("battle-mode-title");
    if (titleEl) {
        titleEl.innerHTML = `🌍 <strong>Exploration Map:</strong> ${map.regionInfo}`;
    }
    const turnEl = document.getElementById("battle-turn-indicator");
    if (turnEl) {
        turnEl.innerText = "Exploring";
        turnEl.style.color = "var(--color-green)";
        turnEl.style.backgroundColor = "rgba(74, 222, 128, 0.12)";
    }
    
    const selector = document.getElementById("battle-ability-selector");
    if (selector) {
        selector.innerHTML = `
            <div style="font-size: 0.8rem; padding: 0.5rem; text-align: center; color: var(--color-text-muted);">
                🎯 Click adjacent tiles to move your token. Defeat the monster (👹) blockading the path and reach the exit portal (🌀) to complete the quest!
            </div>
        `;
    }

    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.dataset.x = x;
            cell.dataset.y = y;

            const isHero = (x === exploreHeroPos.x && y === exploreHeroPos.y);
            const isGoal = (x === map.goal.x && y === map.goal.y);
            const monster = exploreMonsters.find(m => m.x === x && m.y === y);
            const chest = exploreChests.find(c => c.x === x && c.y === y);
            const isObstacle = map.obstacles.some(o => o.x === x && o.y === y);

            if (isHero) {
                cell.className += " hero";
                cell.innerText = "👤";
            } else if (isGoal) {
                cell.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
                cell.style.borderColor = "var(--color-primary)";
                cell.innerText = "🌀";
            } else if (monster) {
                cell.className += " monster";
                cell.innerText = "👹";
            } else if (chest && !chest.looted) {
                cell.style.backgroundColor = "rgba(234, 179, 8, 0.15)";
                cell.style.borderColor = "var(--color-amber)";
                cell.innerText = "🎁";
            } else if (isObstacle) {
                cell.className += " obstacle";
                cell.innerText = map.obstacleChar || "🌲";
            } else {
                cell.innerText = ".";
            }

            // Move highlight on hover
            cell.onmouseenter = () => {
                const dist = Math.max(Math.abs(x - exploreHeroPos.x), Math.abs(y - exploreHeroPos.y));
                if (dist === 1 && !isObstacle) {
                    cell.classList.add("range-highlight");
                }
            };
            cell.onmouseleave = () => {
                cell.classList.remove("range-highlight");
            };
            cell.onclick = () => {
                executeExploreAction(x, y);
            };

            board.appendChild(cell);
        }
    }
}

function executeExploreAction(x, y) {
    if (gameMode !== "explore") return;

    const map = QUEST_MAPS[activeQuestId] || QUEST_MAPS["default"];
    const isObstacle = map.obstacles.some(o => o.x === x && o.y === y);
    if (isObstacle) {
        logCombatMessage("🌲 You cannot pass through the dense environment obstacles!");
        return;
    }

    const dist = Math.max(Math.abs(x - exploreHeroPos.x), Math.abs(y - exploreHeroPos.y));
    if (dist > 1) {
        logCombatMessage("🚶 That tile is too far! You can only move to adjacent tiles.");
        return;
    }

    // Move
    exploreHeroPos = { x, y };
    
    logCombatMessage(`🚶 You traveled to coordinate [${x}, ${y}].`);

    // Check chest
    const chest = exploreChests.find(c => c.x === x && c.y === y);
    if (chest && !chest.looted) {
        chest.looted = true;
        activeQuestState.hp = activeQuestState.maxHp; // Restore health
        activeQuestState.inventory.push(chest.item);
        logCombatMessage(`🎁 <strong>Loot Found!</strong> You opened a supply chest and found: <strong>${chest.item}</strong>! Your HP has been restored to maximum.`);
        updateGameplayStatusPanel();
    }

    // Check monster
    const monster = exploreMonsters.find(m => m.x === x && m.y === y);
    if (monster) {
        logCombatMessage(`👹 <strong>Ambushed!</strong> A fierce ${monster.name} leaps from the shadows! Preparing for grid combat...`);
        
        // Save where this fight started so we can remove this monster on victory
        combatMonsterRef = { x, y };

        setTimeout(() => {
            gameMode = "combat";
            startGridBattle();
        }, 1200);
        return;
    }

    // Check goal
    if (x === map.goal.x && y === map.goal.y) {
        if (exploreMonsters.length > 0) {
            logCombatMessage("🌀 The exit portal is locked by the shadow-beast's presence! You must defeat the monster before you can escape.");
            renderExplorationGrid();
            return;
        }
        logCombatMessage("🌀 You step into the portal. The swirling energies stabilize and carry you to safety.");
        setTimeout(() => {
            loadQuestNode("victory");
        }, 1200);
        return;
    }

    renderExplorationGrid();
}

