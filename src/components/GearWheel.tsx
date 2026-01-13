'use client';

import React from 'react';
import GearSlot from './GearSlot';
import {
    GearSlotType,
    EquippedItem,
    slotNames
} from '@/data/items';

interface GearWheelProps {
    gear: Map<GearSlotType, EquippedItem>;
    onSlotClick: (slot: GearSlotType) => void;
    onClearSlot: (slot: GearSlotType) => void;
}

// Define slot positions around the wheel (in degrees, 0 = top)
// Layout mimics BDO gear wheel: weapons on left, armor on right, accessories around
const slotPositions: { slot: GearSlotType; angle: number; ring: 'inner' | 'outer' }[] = [
    // Weapons (left side) - outer ring
    { slot: 'mainhand', angle: 225, ring: 'outer' },
    { slot: 'subhand', angle: 270, ring: 'outer' },
    { slot: 'awakening', angle: 315, ring: 'outer' },
    // Armor (right side) - outer ring
    { slot: 'helmet', angle: 0, ring: 'outer' },
    { slot: 'armor', angle: 45, ring: 'outer' },
    { slot: 'gloves', angle: 90, ring: 'outer' },
    { slot: 'shoes', angle: 135, ring: 'outer' },
    // Accessories - inner ring
    { slot: 'necklace', angle: 0, ring: 'inner' },
    { slot: 'earring1', angle: 60, ring: 'inner' },
    { slot: 'earring2', angle: 120, ring: 'inner' },
    { slot: 'belt', angle: 180, ring: 'inner' },
    { slot: 'ring1', angle: 240, ring: 'inner' },
    { slot: 'ring2', angle: 300, ring: 'inner' },
];

export default function GearWheel({ gear, onSlotClick, onClearSlot }: GearWheelProps) {
    const outerRadius = 180;
    const innerRadius = 100;

    return (
        <div className="gear-wheel-container">
            <div className="gear-wheel">
                {/* Center hub */}
                <div className="wheel-center">
                    <span className="center-icon">⚔️</span>
                    <span className="center-label">{gear.size}/13</span>
                </div>

                {/* Slot labels for sections */}
                <div className="section-label weapons-label">Weapons</div>
                <div className="section-label armor-label">Armor</div>
                <div className="section-label accessories-label">Accessories</div>

                {/* Gear slots positioned in a circle */}
                {slotPositions.map(({ slot, angle, ring }) => {
                    const radius = ring === 'outer' ? outerRadius : innerRadius;
                    const radians = (angle - 90) * (Math.PI / 180);
                    const x = Math.cos(radians) * radius;
                    const y = Math.sin(radians) * radius;

                    return (
                        <div
                            key={slot}
                            className="wheel-slot-wrapper"
                            style={{
                                transform: `translate(${x}px, ${y}px)`,
                            }}
                        >
                            <GearSlot
                                slot={slot}
                                equipped={gear.get(slot)}
                                onClick={() => onSlotClick(slot)}
                            />
                            <div className="wheel-slot-label">{slotNames[slot]}</div>
                            {gear.has(slot) && (
                                <button
                                    className="clear-slot-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClearSlot(slot);
                                    }}
                                    title="Remove item"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    );
                })}

                {/* Decorative rings */}
                <div className="wheel-ring outer-ring" />
                <div className="wheel-ring inner-ring" />
            </div>

            <style jsx>{`
                .gear-wheel-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: var(--spacing-xl);
                    min-height: 500px;
                }

                .gear-wheel {
                    position: relative;
                    width: 420px;
                    height: 420px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .wheel-center {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
                    border: 2px solid var(--accent-gold);
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                    box-shadow: 0 0 20px rgba(212, 168, 83, 0.3);
                }

                .center-icon {
                    font-size: 1.5rem;
                }

                .center-label {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    margin-top: 2px;
                }

                .wheel-ring {
                    position: absolute;
                    border: 1px solid var(--border-subtle);
                    border-radius: 50%;
                    pointer-events: none;
                }

                .outer-ring {
                    width: ${outerRadius * 2 + 70}px;
                    height: ${outerRadius * 2 + 70}px;
                    border-style: dashed;
                    opacity: 0.5;
                }

                .inner-ring {
                    width: ${innerRadius * 2 + 70}px;
                    height: ${innerRadius * 2 + 70}px;
                    border-style: dotted;
                    opacity: 0.3;
                }

                .wheel-slot-wrapper {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    z-index: 5;
                }

                .wheel-slot-label {
                    font-size: 0.6rem;
                    color: var(--text-muted);
                    text-align: center;
                    white-space: nowrap;
                    max-width: 70px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .clear-slot-btn {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    width: 18px;
                    height: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-medium);
                    border-radius: 50%;
                    color: var(--text-muted);
                    font-size: 0.6rem;
                    cursor: pointer;
                    opacity: 0;
                    transition: all 0.15s ease;
                    z-index: 15;
                }

                .wheel-slot-wrapper:hover .clear-slot-btn {
                    opacity: 1;
                }

                .clear-slot-btn:hover {
                    background: var(--enhance-red);
                    border-color: var(--enhance-red);
                    color: white;
                }

                .section-label {
                    position: absolute;
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--text-muted);
                    opacity: 0.6;
                    pointer-events: none;
                }

                .weapons-label {
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%) rotate(-90deg);
                }

                .armor-label {
                    right: -10px;
                    top: 50%;
                    transform: translateY(-50%) rotate(90deg);
                }

                .accessories-label {
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                }

                @media (max-width: 500px) {
                    .gear-wheel-container {
                        transform: scale(0.8);
                        transform-origin: center;
                        padding: var(--spacing-md);
                        min-height: 400px;
                    }
                }
            `}</style>
        </div>
    );
}
