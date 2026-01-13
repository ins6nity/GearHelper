'use client';

import React from 'react';
import {
    GearSlotType,
    EquippedItem,
    getEnhanceLabel,
    getEnhanceColor,
    slotIcons
} from '@/data/items';

interface GearSlotProps {
    slot: GearSlotType;
    equipped?: EquippedItem;
    onClick: () => void;
}

export default function GearSlot({ slot, equipped, onClick }: GearSlotProps) {
    const isEmpty = !equipped;
    const rarityClass = equipped ? `rarity-${equipped.item.rarity}` : '';
    const enhanceColor = equipped
        ? getEnhanceColor(equipped.enhanceLevel, equipped.item.maxEnhance)
        : '';
    const enhanceLabel = equipped
        ? getEnhanceLabel(equipped.enhanceLevel, equipped.item.maxEnhance)
        : '';

    return (
        <div
            className={`gear-slot ${isEmpty ? 'empty' : 'filled'} ${rarityClass}`}
            onClick={onClick}
            title={equipped ? `${equipped.item.name} ${enhanceLabel}` : `Select ${slot}`}
        >
            {equipped && (
                <>
                    <span className="gear-icon">{equipped.item.icon}</span>
                    {equipped.enhanceLevel > 0 && (
                        <span className={`enhance-badge ${enhanceColor}`}>
                            {enhanceLabel}
                        </span>
                    )}
                </>
            )}
            {isEmpty && (
                <span className="slot-icon">{slotIcons[slot]}</span>
            )}

            <style jsx>{`
        .gear-slot {
          position: relative;
          width: 70px;
          height: 70px;
          background: var(--bg-secondary);
          border: 2px solid var(--border-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-normal);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .gear-slot:hover {
          border-color: var(--accent-gold);
          transform: translateY(-2px);
          box-shadow: var(--glow-gold);
        }
        
        .gear-slot.empty {
          border-style: dashed;
        }
        
        .slot-icon {
          font-size: 1.5rem;
          opacity: 0.4;
        }
        
        .gear-slot.empty:hover .slot-icon {
          opacity: 0.7;
        }
        
        .gear-icon {
          font-size: 2rem;
        }
        
        .enhance-badge {
          position: absolute;
          bottom: 2px;
          right: 2px;
          min-width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          background: var(--bg-primary);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          padding: 0 4px;
        }
        
        .enhance-badge.green { color: var(--enhance-green); border-color: var(--enhance-green); }
        .enhance-badge.blue { color: var(--enhance-blue); border-color: var(--enhance-blue); }
        .enhance-badge.yellow { color: var(--enhance-yellow); border-color: var(--enhance-yellow); }
        .enhance-badge.orange { color: var(--enhance-orange); border-color: var(--enhance-orange); }
        .enhance-badge.red { color: var(--enhance-red); border-color: var(--enhance-red); }
        
        .gear-slot.rarity-common { border-color: var(--rarity-common); }
        .gear-slot.rarity-uncommon { border-color: var(--rarity-uncommon); }
        .gear-slot.rarity-rare { border-color: var(--rarity-rare); }
        .gear-slot.rarity-epic { border-color: var(--rarity-epic); }
        .gear-slot.rarity-legendary { 
          border-color: var(--rarity-legendary); 
          box-shadow: 0 0 15px rgba(250, 204, 21, 0.15); 
        }
        .gear-slot.rarity-mythic { 
          border-color: var(--rarity-mythic); 
          box-shadow: 0 0 15px rgba(251, 146, 60, 0.2); 
        }
      `}</style>
        </div>
    );
}
