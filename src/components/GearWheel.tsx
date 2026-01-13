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
}

// Configuration
const WHEEL_SIZE = 400;
const CENTER = WHEEL_SIZE / 2;
const MAIN_RADIUS = 140;
const SLOT_SIZE = 56;

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
    { id: 'ARTEFACT_RIGHT', label: 'Art R', angle: 90, radiusMult: 1, gearSlot: null },
    { id: 'NECKLACE', label: 'Amulet', angle: 120, radiusMult: 1, gearSlot: 'necklace' },
    { id: 'BOOTS', label: 'Boots', angle: 150, radiusMult: 1, gearSlot: 'shoes' },
    { id: 'WEAPON', label: 'Weapon', angle: 180, radiusMult: 1, gearSlot: 'mainhand' },
    { id: 'OFFHAND', label: 'Offhand', angle: 210, radiusMult: 1, gearSlot: 'subhand' },
    { id: 'GLOVES', label: 'Gloves', angle: 240, radiusMult: 1, gearSlot: 'gloves' },
    { id: 'ARTEFACT_LEFT', label: 'Art L', angle: 270, radiusMult: 1, gearSlot: null },
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

export default function GearWheel({ gear, onSlotClick }: GearWheelProps) {
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
                {/* Outer Ring Guide */}
                <div style={{
                    position: 'absolute',
                    top: CENTER - MAIN_RADIUS - SLOT_SIZE / 2 - 8,
                    left: CENTER - MAIN_RADIUS - SLOT_SIZE / 2 - 8,
                    width: (MAIN_RADIUS + SLOT_SIZE / 2) * 2 + 16,
                    height: (MAIN_RADIUS + SLOT_SIZE / 2) * 2 + 16,
                    border: '2px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
                }} />
                {/* Inner Ring Guide */}
                <div style={{
                    position: 'absolute',
                    top: CENTER - MAIN_RADIUS + SLOT_SIZE / 2 + 8,
                    left: CENTER - MAIN_RADIUS + SLOT_SIZE / 2 + 8,
                    width: (MAIN_RADIUS - SLOT_SIZE / 2) * 2 - 16,
                    height: (MAIN_RADIUS - SLOT_SIZE / 2) * 2 - 16,
                    border: '1px solid rgba(255, 215, 0, 0.15)',
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
                                background: 'radial-gradient(circle at 30% 30%, #2a2a2a 0%, #0d0d0d 100%)',
                                border: `3px solid ${borderColor}`,
                                borderRadius: '50%',
                                boxShadow: `0 0 8px ${borderColor}40, inset 0 2px 4px rgba(255,255,255,0.05)`,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                            }}
                        >
                            <img
                                src={icon}
                                alt={s.label}
                                style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: '50%' }}
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
                    width: 80, height: 80,
                    background: 'radial-gradient(circle at 30% 30%, #1a3a1a 0%, #0a1a0a 100%)',
                    border: '3px solid #4ade80',
                    borderRadius: '50%',
                    boxShadow: '0 0 20px rgba(74, 222, 128, 0.3), inset 0 2px 6px rgba(255,255,255,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <span style={{ fontSize: '28px', filter: 'drop-shadow(0 0 10px rgba(80,200,120,0.6))' }}>💎</span>
                    <span style={{ fontSize: '8px', color: '#4ade80', fontWeight: 600, marginTop: '2px' }}>Crystal</span>
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
