/**
 * Slot Configuration for Gear Wheel
 * 12 clock positions + CHEST (extra) + CRYSTAL (center)
 */

import { SlotType } from '@/services/IconProvider';

export interface SlotConfig {
    id: SlotType;
    label: string;
    hour: number | null; // null for non-clock positions (CHEST, CRYSTAL)
    radius?: number;     // Custom radius override
    angle?: number;      // Custom angle override (degrees)
}

// 12 Clock Slots (using hours as positions)
// Each hour = 30 degrees (360 / 12)
export const CLOCK_SLOTS: SlotConfig[] = [
    { id: 'HELMET', label: 'Helmet', hour: 12 },
    { id: 'EARRING_RIGHT', label: 'Earring R', hour: 1 },
    { id: 'RING_RIGHT', label: 'Ring R', hour: 2 },
    { id: 'AWAKENING', label: 'Awakening', hour: 3 },
    // 4h, 5h empty for future items
    { id: 'WEAPON', label: 'Weapon', hour: 6 },
    // 7h, 8h empty for future items  
    { id: 'BELT', label: 'Belt', hour: 9 },
    { id: 'RING_LEFT', label: 'Ring L', hour: 10 },
    { id: 'EARRING_LEFT', label: 'Earring L', hour: 11 },
];

// Extra slots not on the main clock ring
export const EXTRA_SLOTS: SlotConfig[] = [
    // CHEST positioned between HELMET and rings (upper arc, slightly inward)
    { id: 'CHEST', label: 'Armor', hour: null, angle: 0, radius: 0.55 },
];

// Center slot
export const CENTER_SLOT: SlotConfig = {
    id: 'CRYSTAL',
    label: 'Crystal',
    hour: null,
    radius: 0,
    angle: 0,
};

// All visible slots
export const ALL_SLOTS: SlotConfig[] = [
    ...CLOCK_SLOTS,
    ...EXTRA_SLOTS,
];

// Convert clock hour to angle (12h = 0deg at top, clockwise)
export function hourToAngle(hour: number): number {
    return (hour % 12) * 30;
}

// Get position on circle using trigonometry
export function getRadialPosition(
    angleDeg: number,
    radius: number,
    centerX: number,
    centerY: number,
    slotSize: number
): { x: number; y: number } {
    const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 so 0deg is at top
    return {
        x: centerX + Math.cos(angleRad) * radius - slotSize / 2,
        y: centerY + Math.sin(angleRad) * radius - slotSize / 2,
    };
}

// Rarity colors for borders
export const RARITY_COLORS: Record<string, string> = {
    common: '#9d9d9d',
    uncommon: '#1EFF00',
    rare: '#0070DD',
    epic: '#A335EE',
    legendary: '#FF8000',
    mythic: '#E6CC80',
};

// Enhancement level to Roman numeral
export function toRoman(level: number): string {
    const numerals = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return level <= 10 ? numerals[level] : `+${level}`;
}
