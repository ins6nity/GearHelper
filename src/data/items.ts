// BDO Items Database
export type GearSlotType =
    | 'mainhand' | 'subhand' | 'awakening'
    | 'helmet' | 'armor' | 'gloves' | 'shoes'
    | 'necklace' | 'earring1' | 'earring2' | 'ring1' | 'ring2' | 'belt';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface GearItem {
    id: string;
    name: string;
    slot: GearSlotType;
    rarity: Rarity;
    icon: string;
    baseAP?: number;
    baseAAP?: number;
    baseDP?: number;
    enhanceAP?: number[];   // AP per enhancement level
    enhanceAAP?: number[];  // Awakening AP per enhancement level
    enhanceDP?: number[];   // DP per enhancement level
    maxEnhance: number;     // Max enhancement level (usually 5 for PEN or 10 for X)
}

export interface EquippedItem {
    item: GearItem;
    enhanceLevel: number;
}

// Weapon Items
export const weapons: GearItem[] = [
    {
        id: 'blackstar_mainhand',
        name: 'Blackstar Weapon',
        slot: 'mainhand',
        rarity: 'legendary',
        icon: '⚔️',
        baseAP: 100,
        enhanceAP: [100, 107, 114, 121, 128, 135, 144, 153, 162, 171, 180],
        maxEnhance: 10
    },
    {
        id: 'kzarka_mainhand',
        name: 'Kzarka Weapon',
        slot: 'mainhand',
        rarity: 'legendary',
        icon: '🗡️',
        baseAP: 90,
        enhanceAP: [90, 97, 104, 111, 118, 125, 132, 139, 146, 153, 160],
        maxEnhance: 10
    },
    {
        id: 'godr_ayed_mainhand',
        name: "Godr-Ayed's Weapon",
        slot: 'mainhand',
        rarity: 'mythic',
        icon: '✨',
        baseAP: 140,
        enhanceAP: [140, 150, 160, 170, 180, 190],
        maxEnhance: 5
    },
    // Subhand
    {
        id: 'blackstar_subhand',
        name: 'Blackstar Sub-weapon',
        slot: 'subhand',
        rarity: 'legendary',
        icon: '🛡️',
        baseAP: 50,
        enhanceAP: [50, 54, 58, 62, 66, 70, 75, 80, 85, 90, 95],
        maxEnhance: 10
    },
    {
        id: 'kutum_subhand',
        name: 'Kutum Sub-weapon',
        slot: 'subhand',
        rarity: 'legendary',
        icon: '🔰',
        baseAP: 45,
        baseDP: 10,
        enhanceAP: [45, 49, 53, 57, 61, 65, 69, 73, 77, 81, 85],
        enhanceDP: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        maxEnhance: 10
    },
    {
        id: 'nouver_subhand',
        name: 'Nouver Sub-weapon',
        slot: 'subhand',
        rarity: 'legendary',
        icon: '⭐',
        baseAP: 55,
        enhanceAP: [55, 59, 63, 67, 71, 75, 80, 85, 90, 95, 100],
        maxEnhance: 10
    },
    // Awakening
    {
        id: 'blackstar_awakening',
        name: 'Blackstar Awakening',
        slot: 'awakening',
        rarity: 'legendary',
        icon: '🌟',
        baseAAP: 100,
        enhanceAAP: [100, 107, 114, 121, 128, 135, 144, 153, 162, 171, 180],
        maxEnhance: 10
    },
    {
        id: 'dandelion_awakening',
        name: 'Dandelion Awakening',
        slot: 'awakening',
        rarity: 'legendary',
        icon: '💫',
        baseAAP: 95,
        enhanceAAP: [95, 102, 109, 116, 123, 130, 137, 144, 151, 158, 165],
        maxEnhance: 10
    },
];

// Armor Items
export const armors: GearItem[] = [
    {
        id: 'blackstar_helmet',
        name: 'Blackstar Helmet',
        slot: 'helmet',
        rarity: 'legendary',
        icon: '⛑️',
        baseDP: 75,
        enhanceDP: [75, 80, 85, 90, 95, 100, 106, 112, 118, 124, 130],
        maxEnhance: 10
    },
    {
        id: 'giath_helmet',
        name: "Giath's Helmet",
        slot: 'helmet',
        rarity: 'legendary',
        icon: '🪖',
        baseDP: 65,
        enhanceDP: [65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
        maxEnhance: 10
    },
    {
        id: 'fallen_god_armor',
        name: 'Fallen God Armor',
        slot: 'armor',
        rarity: 'mythic',
        icon: '🔥',
        baseDP: 130,
        enhanceDP: [130, 140, 150, 160, 170, 180],
        maxEnhance: 5
    },
    {
        id: 'blackstar_armor',
        name: 'Blackstar Armor',
        slot: 'armor',
        rarity: 'legendary',
        icon: '🎽',
        baseDP: 85,
        enhanceDP: [85, 91, 97, 103, 109, 115, 122, 129, 136, 143, 150],
        maxEnhance: 10
    },
    {
        id: 'dim_tree_armor',
        name: 'Dim Tree Spirit Armor',
        slot: 'armor',
        rarity: 'legendary',
        icon: '🌳',
        baseDP: 75,
        enhanceDP: [75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
        maxEnhance: 10
    },
    {
        id: 'blackstar_gloves',
        name: 'Blackstar Gloves',
        slot: 'gloves',
        rarity: 'legendary',
        icon: '🧤',
        baseDP: 70,
        enhanceDP: [70, 75, 80, 85, 90, 95, 101, 107, 113, 119, 125],
        maxEnhance: 10
    },
    {
        id: 'bheg_gloves',
        name: "Bheg's Gloves",
        slot: 'gloves',
        rarity: 'legendary',
        icon: '✋',
        baseDP: 60,
        enhanceDP: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
        maxEnhance: 10
    },
    {
        id: 'blackstar_shoes',
        name: 'Blackstar Shoes',
        slot: 'shoes',
        rarity: 'legendary',
        icon: '👢',
        baseDP: 70,
        enhanceDP: [70, 75, 80, 85, 90, 95, 101, 107, 113, 119, 125],
        maxEnhance: 10
    },
    {
        id: 'muskan_shoes',
        name: "Muskan's Shoes",
        slot: 'shoes',
        rarity: 'legendary',
        icon: '🥾',
        baseDP: 60,
        enhanceDP: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
        maxEnhance: 10
    },
];

// Accessories
export const accessories: GearItem[] = [
    {
        id: 'deboreka_necklace',
        name: 'Deboreka Necklace',
        slot: 'necklace',
        rarity: 'mythic',
        icon: '📿',
        baseAP: 30,
        enhanceAP: [30, 35, 40, 45, 50, 55],
        maxEnhance: 5
    },
    {
        id: 'ogre_necklace',
        name: 'Ogre Ring',
        slot: 'necklace',
        rarity: 'legendary',
        icon: '💎',
        baseAP: 25,
        enhanceAP: [25, 28, 31, 34, 37, 40],
        maxEnhance: 5
    },
    {
        id: 'laytenn_necklace',
        name: "Laytenn's Power Stone",
        slot: 'necklace',
        rarity: 'legendary',
        icon: '🔮',
        baseAP: 27,
        enhanceAP: [27, 30, 33, 36, 39, 42],
        maxEnhance: 5
    },
    {
        id: 'dawn_earring',
        name: 'Dawn Earring',
        slot: 'earring1',
        rarity: 'legendary',
        icon: '✨',
        baseAP: 14,
        enhanceAP: [14, 16, 18, 20, 22, 24],
        maxEnhance: 5
    },
    {
        id: 'tungrad_earring',
        name: 'Tungrad Earring',
        slot: 'earring1',
        rarity: 'legendary',
        icon: '💫',
        baseAP: 13,
        enhanceAP: [13, 15, 17, 19, 21, 23],
        maxEnhance: 5
    },
    {
        id: 'disto_earring',
        name: 'Distortion Earring',
        slot: 'earring1',
        rarity: 'legendary',
        icon: '🌀',
        baseAP: 17,
        baseDP: -10,
        enhanceAP: [17, 19, 21, 23, 25, 27],
        enhanceDP: [-10, -11, -12, -13, -14, -15],
        maxEnhance: 5
    },
    {
        id: 'edana_earring',
        name: "Edana's Earring",
        slot: 'earring1',
        rarity: 'mythic',
        icon: '💠',
        baseAP: 19,
        enhanceAP: [19, 22, 25, 28, 31, 34],
        maxEnhance: 5
    },
    {
        id: 'crescent_ring',
        name: 'Crescent Ring',
        slot: 'ring1',
        rarity: 'legendary',
        icon: '🌙',
        baseAP: 12,
        enhanceAP: [12, 14, 16, 18, 20, 22],
        maxEnhance: 5
    },
    {
        id: 'tungrad_ring',
        name: 'Tungrad Ring',
        slot: 'ring1',
        rarity: 'legendary',
        icon: '💍',
        baseAP: 13,
        enhanceAP: [13, 15, 17, 19, 21, 23],
        maxEnhance: 5
    },
    {
        id: 'eye_of_ruins',
        name: 'Eye of the Ruins Ring',
        slot: 'ring1',
        rarity: 'legendary',
        icon: '👁️',
        baseAP: 15,
        enhanceAP: [15, 17, 19, 21, 23, 25],
        maxEnhance: 5
    },
    {
        id: 'kharazad_ring',
        name: 'Ring of the Crescent Guardian (Kharazad)',
        slot: 'ring1',
        rarity: 'mythic',
        icon: '🌓',
        baseAP: 20,
        enhanceAP: [20, 23, 26, 29, 32, 35],
        maxEnhance: 5
    },
    {
        id: 'valtarra_belt',
        name: 'Valtarra Belt',
        slot: 'belt',
        rarity: 'legendary',
        icon: '🎀',
        baseAP: 12,
        baseDP: 5,
        enhanceAP: [12, 14, 16, 18, 20, 22],
        enhanceDP: [5, 6, 7, 8, 9, 10],
        maxEnhance: 5
    },
    {
        id: 'tungrad_belt',
        name: 'Tungrad Belt',
        slot: 'belt',
        rarity: 'legendary',
        icon: '⚡',
        baseAP: 15,
        enhanceAP: [15, 17, 19, 21, 23, 25],
        maxEnhance: 5
    },
    {
        id: 'basilisk_belt',
        name: 'Basilisk Belt',
        slot: 'belt',
        rarity: 'legendary',
        icon: '🐍',
        baseAP: 10,
        enhanceAP: [10, 12, 14, 16, 18, 20],
        maxEnhance: 5
    },
];

// Get all items for a specific slot
export function getItemsForSlot(slot: GearSlotType): GearItem[] {
    // Handle earrings and rings that share items
    const normalizedSlot = slot.replace(/[12]$/, '1') as GearSlotType;

    const allItems = [...weapons, ...armors, ...accessories];
    return allItems.filter(item => {
        const itemSlot = item.slot.replace(/[12]$/, '1');
        return itemSlot === normalizedSlot || item.slot === slot;
    });
}

// Calculate stats for an equipped item
export function getItemStats(equipped: EquippedItem): { ap: number; aap: number; dp: number } {
    const { item, enhanceLevel } = equipped;

    const ap = item.enhanceAP?.[enhanceLevel] ?? item.baseAP ?? 0;
    const aap = item.enhanceAAP?.[enhanceLevel] ?? item.baseAAP ?? 0;
    const dp = item.enhanceDP?.[enhanceLevel] ?? item.baseDP ?? 0;

    return { ap, aap, dp };
}

// Get enhancement level label
export function getEnhanceLabel(level: number, maxEnhance: number): string {
    if (maxEnhance === 5) {
        const labels = ['0', 'PRI', 'DUO', 'TRI', 'TET', 'PEN'];
        return labels[level] || level.toString();
    } else if (maxEnhance === 10) {
        if (level <= 5) {
            const labels = ['0', 'PRI', 'DUO', 'TRI', 'TET', 'PEN'];
            return labels[level] || level.toString();
        } else {
            const romanNumerals = ['VI', 'VII', 'VIII', 'IX', 'X'];
            return romanNumerals[level - 6] || level.toString();
        }
    }
    return level.toString();
}

// Get enhancement color
export function getEnhanceColor(level: number, maxEnhance: number): string {
    const percentage = level / maxEnhance;
    if (percentage === 0) return '';
    if (percentage <= 0.2) return 'green';
    if (percentage <= 0.4) return 'blue';
    if (percentage <= 0.6) return 'yellow';
    if (percentage <= 0.8) return 'orange';
    return 'red';
}

// Slot display names
export const slotNames: Record<GearSlotType, string> = {
    mainhand: 'Main Weapon',
    subhand: 'Sub-weapon',
    awakening: 'Awakening',
    helmet: 'Helmet',
    armor: 'Armor',
    gloves: 'Gloves',
    shoes: 'Shoes',
    necklace: 'Necklace',
    earring1: 'Earring',
    earring2: 'Earring',
    ring1: 'Ring',
    ring2: 'Ring',
    belt: 'Belt',
};

// Slot icons
export const slotIcons: Record<GearSlotType, string> = {
    mainhand: '⚔️',
    subhand: '🛡️',
    awakening: '🌟',
    helmet: '⛑️',
    armor: '🎽',
    gloves: '🧤',
    shoes: '👢',
    necklace: '📿',
    earring1: '✨',
    earring2: '✨',
    ring1: '💍',
    ring2: '💍',
    belt: '🎀',
};
