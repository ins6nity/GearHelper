/**
 * IconProvider Service
 * Fetches icons from bdolytics.com CDN based on world (Kharazad/Edana)
 * Includes memory + localStorage cache
 */

export type World = 'Kharazad' | 'Edana';

export type SlotType =
    | 'HELMET' | 'CHEST' | 'GLOVES' | 'BOOTS'
    | 'WEAPON' | 'OFFHAND' | 'AWAKENING'
    | 'EARRING_LEFT' | 'EARRING_RIGHT'
    | 'RING_LEFT' | 'RING_RIGHT'
    | 'ARTEFACT_LEFT' | 'ARTEFACT_RIGHT'
    | 'NECKLACE' | 'BELT' | 'CRYSTAL';

// Item IDs for each world (from bdolytics)
// These are the actual item IDs used in the bdolytics CDN URLs
const WORLD_ITEM_IDS: Record<World, Record<SlotType, string>> = {
    Kharazad: {
        HELMET: '00012005', // Kharazad Helmet
        CHEST: '00012006', // Kharazad Armor
        GLOVES: '00012008', // Kharazad Gloves
        BOOTS: '00012009', // Kharazad Shoes
        WEAPON: '00747222', // Kharazad Main Weapon
        OFFHAND: '00014820', // Kharazad Sub Weapon
        AWAKENING: '00747427', // Awakening Weapon
        EARRING_LEFT: '00011855', // Dawn Earring
        EARRING_RIGHT: '00011855', // Dawn Earring
        RING_LEFT: '00012061', // Kharazad Ring
        RING_RIGHT: '00012061', // Kharazad Ring
        ARTEFACT_LEFT: '00757242', // Artefact
        ARTEFACT_RIGHT: '00757242', // Artefact
        NECKLACE: '00011628', // Kharazad Necklace
        BELT: '00012230', // Kharazad Belt
        CRYSTAL: '00768508', // Crystal
    },
    Edana: {
        HELMET: '00719897', // Edana Helmet
        CHEST: '00719898', // Edana Armor
        GLOVES: '00719899', // Edana Gloves
        BOOTS: '00719900', // Edana Shoes
        WEAPON: '00747222', // Edana Main Weapon
        OFFHAND: '00930020', // Edana Sub Weapon
        AWAKENING: '00747427', // Awakening Weapon
        EARRING_LEFT: '00011894', // Edana Earring
        EARRING_RIGHT: '00011894', // Edana Earring
        RING_LEFT: '00012141', // Edana Ring
        RING_RIGHT: '00012141', // Edana Ring
        ARTEFACT_LEFT: '00757242', // Artefact
        ARTEFACT_RIGHT: '00757242', // Artefact
        NECKLACE: '00011697', // Edana Necklace
        BELT: '00012294', // Edana Belt
        CRYSTAL: '00768508', // Crystal
    }
};

// Icon path prefixes on bdolytics CDN
const ICON_PATHS: Record<SlotType, string> = {
    HELMET: '06_pc_equipitem/00_common/13_hel',
    CHEST: '06_pc_equipitem/00_common/09_upperbody',
    GLOVES: '06_pc_equipitem/00_common/11_hand',
    BOOTS: '06_pc_equipitem/00_common/12_foot',
    WEAPON: '06_pc_equipitem/00_common/01_weapon',
    OFFHAND: '06_pc_equipitem/00_common/08_subweapon',
    AWAKENING: '06_pc_equipitem/00_common/01_weapon',
    EARRING_LEFT: '06_pc_equipitem/00_common/17_earring',
    EARRING_RIGHT: '06_pc_equipitem/00_common/17_earring',
    RING_LEFT: '06_pc_equipitem/00_common/16_ring',
    RING_RIGHT: '06_pc_equipitem/00_common/16_ring',
    ARTEFACT_LEFT: '03_etc',
    ARTEFACT_RIGHT: '03_etc',
    NECKLACE: '06_pc_equipitem/00_common/15_necklace',
    BELT: '06_pc_equipitem/00_common/18_belt',
    CRYSTAL: '03_etc',
};

const CDN_BASE = 'https://cdn.bdolytics.com/img/new_icon';
const PLACEHOLDER = '/placeholder-item.png';

// Memory cache
const iconCache = new Map<string, string>();

// LocalStorage cache key
const CACHE_KEY = 'bdo_icon_cache';

/**
 * Load cache from localStorage
 */
function loadCache(): void {
    if (typeof window === 'undefined') return;
    try {
        const stored = localStorage.getItem(CACHE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            Object.entries(data).forEach(([key, value]) => {
                iconCache.set(key, value as string);
            });
        }
    } catch {
        // Ignore errors
    }
}

/**
 * Save cache to localStorage
 */
function saveCache(): void {
    if (typeof window === 'undefined') return;
    try {
        const data: Record<string, string> = {};
        iconCache.forEach((value, key) => {
            data[key] = value;
        });
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
        // Ignore errors
    }
}

/**
 * Get cache key for a specific world + slot
 */
function getCacheKey(world: World, slotType: SlotType): string {
    return `${world}_${slotType}`;
}

/**
 * Get icon URL for a specific slot and world
 * @param world - Kharazad or Edana
 * @param slotType - The slot type (HELMET, RING_LEFT, etc)
 * @param customItemId - Optional custom item ID override
 * @returns Icon URL from bdolytics CDN
 */
export function getIconUrl(
    world: World,
    slotType: SlotType,
    customItemId?: string
): string {
    const cacheKey = customItemId
        ? `${world}_${slotType}_${customItemId}`
        : getCacheKey(world, slotType);

    // Check memory cache
    if (iconCache.has(cacheKey)) {
        return iconCache.get(cacheKey)!;
    }

    // Build URL
    const itemId = customItemId || WORLD_ITEM_IDS[world][slotType];
    const path = ICON_PATHS[slotType];

    if (!itemId || !path) {
        return PLACEHOLDER;
    }

    const url = `${CDN_BASE}/${path}/${itemId}.webp`;

    // Store in cache
    iconCache.set(cacheKey, url);
    saveCache();

    return url;
}

/**
 * Get all icons for a world
 */
export function getAllIcons(world: World): Record<SlotType, string> {
    const result: Partial<Record<SlotType, string>> = {};

    (Object.keys(WORLD_ITEM_IDS[world]) as SlotType[]).forEach(slot => {
        result[slot] = getIconUrl(world, slot);
    });

    return result as Record<SlotType, string>;
}

/**
 * Clear icon cache
 */
export function clearIconCache(): void {
    iconCache.clear();
    if (typeof window !== 'undefined') {
        localStorage.removeItem(CACHE_KEY);
    }
}

/**
 * Preload icons for a world
 */
export function preloadWorldIcons(world: World): void {
    const icons = getAllIcons(world);
    Object.values(icons).forEach(url => {
        if (url !== PLACEHOLDER) {
            const img = new Image();
            img.src = url;
        }
    });
}

// Initialize cache on load
if (typeof window !== 'undefined') {
    loadCache();
}

export { WORLD_ITEM_IDS, ICON_PATHS };
