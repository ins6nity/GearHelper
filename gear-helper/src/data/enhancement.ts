// Enhancement Cost Calculations based on BairogHaan's data
// Source: https://docs.google.com/spreadsheets/d/e/2PACX-1vTExJovn3FFx-S0HJmdCXYR1MTHjqQrEJkz-OoPOyb2r7-1t12EIIpHHqsVfzJUfZra4kkkW6X5E0PS/pubhtml

import { EquippedItem, GearItem, getItemStats, GearSlotType } from './items';

// Average silver cost to enhance items (in billions)
// Based on BairogHaan's enhancement calculations
export const enhancementCosts = {
    // Boss gear enhancement costs (billions of silver)
    bossGear: {
        0: 0,
        1: 0.3,   // PRI
        2: 0.8,   // DUO
        3: 2.5,   // TRI
        4: 8,     // TET
        5: 35,    // PEN
    },
    // Blackstar enhancement costs (billions)
    blackstar: {
        0: 0,
        1: 0.5,
        2: 1.2,
        3: 4,
        4: 15,
        5: 60,
        6: 100,   // VI
        7: 180,   // VII
        8: 300,   // VIII
        9: 500,   // IX
        10: 850,  // X
    },
    // Accessory enhancement costs (billions)
    accessories: {
        common: { 0: 0, 1: 0.1, 2: 0.3, 3: 0.8, 4: 2.5, 5: 8 },
        legendary: { 0: 0, 1: 0.5, 2: 1.5, 3: 4, 4: 12, 5: 45 },
        mythic: { 0: 0, 1: 2, 2: 6, 3: 18, 4: 55, 5: 150 },
    },
};

// Silver per AP calculations (in millions per AP)
// Lower is better - this is the cost efficiency
export function calculateSilverPerAP(cost: number, apGain: number): number {
    if (apGain === 0) return Infinity;
    return cost / apGain;
}

export interface UpgradeOption {
    slot: GearSlotType;
    currentItem?: EquippedItem;
    newEnhanceLevel: number;
    apGain: number;
    aapGain: number;
    dpGain: number;
    estimatedCost: number; // in billions
    silverPerStat: number; // in millions per stat point
    priority: number; // Higher is better
}

// Get the estimated enhancement cost for an item
export function getEnhancementCost(item: GearItem, fromLevel: number, toLevel: number): number {
    const isBlackstar = item.id.includes('blackstar');
    const isAccessory = ['necklace', 'earring1', 'earring2', 'ring1', 'ring2', 'belt'].includes(item.slot);

    let totalCost = 0;

    for (let level = fromLevel + 1; level <= toLevel; level++) {
        if (isBlackstar) {
            totalCost += enhancementCosts.blackstar[level as keyof typeof enhancementCosts.blackstar] || 0;
        } else if (isAccessory) {
            const rarity = item.rarity === 'mythic' ? 'mythic' : item.rarity === 'legendary' ? 'legendary' : 'common';
            totalCost += enhancementCosts.accessories[rarity][level as keyof typeof enhancementCosts.accessories.common] || 0;
        } else {
            totalCost += enhancementCosts.bossGear[level as keyof typeof enhancementCosts.bossGear] || 0;
        }
    }

    return totalCost;
}

// Calculate all possible upgrade options for current gear
export function calculateUpgradeOptions(
    currentGear: Map<GearSlotType, EquippedItem>
): UpgradeOption[] {
    const options: UpgradeOption[] = [];

    currentGear.forEach((equipped, slot) => {
        const { item, enhanceLevel } = equipped;

        // Check if can enhance further
        if (enhanceLevel < item.maxEnhance) {
            const nextLevel = enhanceLevel + 1;
            const currentStats = getItemStats(equipped);
            const nextStats = getItemStats({ item, enhanceLevel: nextLevel });

            const apGain = (nextStats.ap || 0) - (currentStats.ap || 0);
            const aapGain = (nextStats.aap || 0) - (currentStats.aap || 0);
            const dpGain = (nextStats.dp || 0) - (currentStats.dp || 0);
            const totalStatGain = apGain + aapGain + Math.abs(dpGain);

            const cost = getEnhancementCost(item, enhanceLevel, nextLevel);
            const silverPerStat = totalStatGain > 0 ? (cost * 1000) / totalStatGain : Infinity;

            // Priority: lower silverPerStat = higher priority
            const priority = silverPerStat > 0 ? 1000 / silverPerStat : 0;

            options.push({
                slot,
                currentItem: equipped,
                newEnhanceLevel: nextLevel,
                apGain,
                aapGain,
                dpGain,
                estimatedCost: cost,
                silverPerStat,
                priority,
            });
        }
    });

    // Sort by priority (highest first = cheapest upgrade per stat)
    return options.sort((a, b) => b.priority - a.priority);
}

// Get the best upgrade recommendation
export function getBestUpgrade(currentGear: Map<GearSlotType, EquippedItem>): UpgradeOption | null {
    const options = calculateUpgradeOptions(currentGear);
    return options.length > 0 ? options[0] : null;
}

// Format cost for display
export function formatCost(billionsOfSilver: number): string {
    if (billionsOfSilver >= 1) {
        return `${billionsOfSilver.toFixed(1)}B`;
    }
    const millions = billionsOfSilver * 1000;
    return `${millions.toFixed(0)}M`;
}

// Format silver per stat
export function formatSilverPerStat(millionsPerStat: number): string {
    if (millionsPerStat === Infinity) return '∞';
    if (millionsPerStat >= 1000) {
        return `${(millionsPerStat / 1000).toFixed(1)}B/stat`;
    }
    return `${millionsPerStat.toFixed(0)}M/stat`;
}
