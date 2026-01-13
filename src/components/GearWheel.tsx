'use client';

import React, { useState, useEffect } from 'react';
import {
    World,
    SlotType,
    getIconUrl,
    preloadWorldIcons
} from '@/services/IconProvider';
import { RARITY_COLORS, toRoman } from '@/data/slotConfig';
import { GearSlotType, EquippedItem } from '@/data/items';

interface GearWheelProps {
    gear: Map<GearSlotType, EquippedItem>;
    onSlotClick: (slot: GearSlotType) => void;
    onClearSlot: (slot: GearSlotType) => void;
}

// Configuration
const WHEEL_SIZE = 400;
const CENTER = WHEEL_SIZE / 2;
const MAIN_RADIUS = 150;
const SLOT_SIZE = 50;

// Slot definition
interface SlotDef {
    id: SlotType;
    label: string;
    angle: number;
    radiusMult: number;
    gearSlot: GearSlotType | null;
}

// 12 slots at 30° intervals
const SLOTS: SlotDef[] = [
    { id: 'HELMET', label: 'Helmet', angle: 0, radiusMult: 1, gearSlot: 'helmet' },
    { id: 'EARRING_RIGHT', label: 'Ear R', angle: 30, radiusMult: 1, gearSlot: 'earring2' },
    { id: 'RING_RIGHT', label: 'Ring R', angle: 60, radiusMult: 1, gearSlot: 'ring2' },
    { id: 'BELT', label: 'Belt', angle: 90, radiusMult: 1, gearSlot: 'belt' },
    { id: 'NECKLACE', label: 'Amulet', angle: 120, radiusMult: 1, gearSlot: 'necklace' },
    { id: 'BOOTS', label: 'Boots', angle: 150, radiusMult: 1, gearSlot: 'shoes' },
    { id: 'WEAPON', label: 'Weapon', angle: 180, radiusMult: 1, gearSlot: 'mainhand' },
    { id: 'OFFHAND', label: 'Offhand', angle: 210, radiusMult: 1, gearSlot: 'subhand' },
    { id: 'GLOVES', label: 'Gloves', angle: 240, radiusMult: 1, gearSlot: 'gloves' },
    { id: 'AWAKENING', label: 'Awaken', angle: 270, radiusMult: 1, gearSlot: 'awakening' },
    { id: 'RING_LEFT', label: 'Ring L', angle: 300, radiusMult: 1, gearSlot: 'ring1' },
    { id: 'EARRING_LEFT', label: 'Ear L', angle: 330, radiusMult: 1, gearSlot: 'earring1' },
];

const CHEST_SLOT: SlotDef = {
    id: 'CHEST', label: 'Armor', angle: 0, radiusMult: 0.45, gearSlot: 'armor'
};

// Calculate position via trigonometry
function calcPos(angle: number, radiusMult: number) {
    const radius = MAIN_RADIUS * radiusMult;
    const rad = (angle - 90) * (Math.PI / 180);
    return {
        x: Math.round(CENTER + Math.cos(rad) * radius - SLOT_SIZE / 2),
        y: Math.round(CENTER + Math.sin(rad) * radius - SLOT_SIZE / 2),
    };
}

export default function GearWheel({ gear, onSlotClick, onClearSlot }: GearWheelProps) {
    const [world, setWorld] = useState<World>('Kharazad');

    useEffect(() => {
        preloadWorldIcons(world);
    }, [world]);

    // Calculate stats
    let ap = 0, aap = 0, dp = 0;
    gear.forEach((eq) => {
        const { item, enhanceLevel } = eq;
        ap += item.enhanceAP?.[enhanceLevel] ?? item.baseAP ?? 0;
        aap += item.enhanceAAP?.[enhanceLevel] ?? item.baseAAP ?? 0;
        dp += item.enhanceDP?.[enhanceLevel] ?? item.baseDP ?? 0;
    });
    const gs = ap + aap + dp;

    const allSlots = [...SLOTS, CHEST_SLOT];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            {/* World Selector */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 12px', background: '#1a1a1a',
                border: '1px solid #333', borderRadius: '6px'
            }}>
                <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>World:</span>
                <select
                    value={world}
                    onChange={(e) => setWorld(e.target.value as World)}
                    style={{
                        background: '#222', border: '1px solid #444', color: '#fff',
                        padding: '5px 10px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer'
                    }}
                >
                    <option value="Kharazad">Kharazad</option>
                    <option value="Edana">Edana</option>
                </select>
            </div>

            {/* Gear Wheel */}
            <div style={{ position: 'relative', width: WHEEL_SIZE, height: WHEEL_SIZE }}>
                {/* Circle Guide */}
                <div style={{
                    position: 'absolute',
                    top: CENTER - MAIN_RADIUS,
                    left: CENTER - MAIN_RADIUS,
                    width: MAIN_RADIUS * 2,
                    height: MAIN_RADIUS * 2,
                    border: '2px dashed rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }} />

                {/* Slots */}
                {allSlots.map((s) => {
                    const pos = calcPos(s.angle, s.radiusMult);
                    const eq = s.gearSlot ? gear.get(s.gearSlot) : undefined;
                    const rarity = eq?.item.rarity || 'common';
                    const borderColor = RARITY_COLORS[rarity] || '#444';
                    const lvl = eq?.enhanceLevel || 0;
                    const icon = getIconUrl(world, s.id);

                    return (
                        <div
                            key={s.id}
                            onClick={() => s.gearSlot && onSlotClick(s.gearSlot)}
                            title={s.label}
                            style={{
                                position: 'absolute',
                                left: pos.x,
                                top: pos.y,
                                width: SLOT_SIZE,
                                height: SLOT_SIZE,
                                background: '#121212',
                                border: `2px solid ${borderColor}`,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={icon}
                                alt={s.label}
                                style={{ width: 42, height: 42, objectFit: 'contain' }}
                                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                            />
                            {eq && lvl > 0 && (
                                <span style={{
                                    position: 'absolute', bottom: 1, left: '50%', transform: 'translateX(-50%)',
                                    fontSize: '12px', fontWeight: 'bold', color: '#fff', textShadow: '0 0 3px #000'
                                }}>
                                    {toRoman(lvl)}
                                </span>
                            )}
                        </div>
                    );
                })}

                {/* Crystal Center */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 70, height: 70,
                    background: 'radial-gradient(circle, #1a2a1a 0%, #121212 100%)',
                    border: '2px solid #4ade80',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <span style={{ fontSize: '24px', filter: 'drop-shadow(0 0 8px rgba(80,200,120,0.5))' }}>💎</span>
                    <span style={{ fontSize: '7px', color: '#666', marginTop: '2px' }}>Crystal</span>
                    <span style={{ fontSize: '9px', color: '#4ade80', fontWeight: 600 }}>Nenhum</span>
                </div>
            </div>

            {/* Stats Bar */}
            <div style={{
                display: 'flex', gap: '20px', padding: '10px 20px',
                background: 'linear-gradient(180deg, #1a1a1a, #111)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px'
            }}>
                <div style={{ textAlign: 'center', minWidth: 50 }}>
                    <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, color: '#ef4444' }}>{ap}</span>
                    <span style={{ fontSize: '8px', color: '#666', textTransform: 'uppercase' }}>PA</span>
                </div>
                <div style={{ textAlign: 'center', minWidth: 50 }}>
                    <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, color: '#fb923c' }}>{aap}</span>
                    <span style={{ fontSize: '8px', color: '#666', textTransform: 'uppercase' }}>PA Desp.</span>
                </div>
                <div style={{ textAlign: 'center', minWidth: 50 }}>
                    <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, color: '#60a5fa' }}>{dp}</span>
                    <span style={{ fontSize: '8px', color: '#666', textTransform: 'uppercase' }}>PD</span>
                </div>
                <div style={{ textAlign: 'center', minWidth: 50 }}>
                    <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24' }}>{gs}</span>
                    <span style={{ fontSize: '8px', color: '#666', textTransform: 'uppercase' }}>GS</span>
                </div>
            </div>
        </div>
    );
}
