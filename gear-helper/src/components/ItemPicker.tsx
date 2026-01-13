'use client';

import React from 'react';
import {
    GearItem,
    GearSlotType,
    getItemsForSlot,
    getEnhanceLabel,
    slotNames
} from '@/data/items';

interface ItemPickerProps {
    slot: GearSlotType;
    onSelect: (item: GearItem, enhanceLevel: number) => void;
    onClose: () => void;
}

export default function ItemPicker({ slot, onSelect, onClose }: ItemPickerProps) {
    const [selectedItem, setSelectedItem] = React.useState<GearItem | null>(null);
    const [enhanceLevel, setEnhanceLevel] = React.useState(0);

    const items = getItemsForSlot(slot);

    const handleItemClick = (item: GearItem) => {
        setSelectedItem(item);
        setEnhanceLevel(0);
    };

    const handleConfirm = () => {
        if (selectedItem) {
            onSelect(selectedItem, enhanceLevel);
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Selecionar {slotNames[slot]}</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <div className="item-list">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`item-option ${selectedItem?.id === item.id ? 'selected' : ''}`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className={`item-icon rarity-${item.rarity}`}>
                                    {item.icon}
                                </div>
                                <div className="item-info">
                                    <div className={`item-name rarity-text-${item.rarity}`}>{item.name}</div>
                                    <div className="item-stats">
                                        {item.baseAP && `AP: ${item.enhanceAP?.[item.maxEnhance] || item.baseAP}`}
                                        {item.baseAAP && ` AAP: ${item.enhanceAAP?.[item.maxEnhance] || item.baseAAP}`}
                                        {item.baseDP && ` DP: ${item.enhanceDP?.[item.maxEnhance] || item.baseDP}`}
                                        {` (Max: ${getEnhanceLabel(item.maxEnhance, item.maxEnhance)})`}
                                    </div>
                                </div>
                                <div className="item-rarity-badge">{item.rarity}</div>
                            </div>
                        ))}
                    </div>

                    {selectedItem && (
                        <div className="enhance-section">
                            <h3 className="enhance-title">Nível de Enhancement</h3>
                            <div className="enhance-selector">
                                {Array.from({ length: selectedItem.maxEnhance + 1 }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`enhance-btn ${enhanceLevel === i ? 'active' : ''}`}
                                        onClick={() => setEnhanceLevel(i)}
                                    >
                                        {getEnhanceLabel(i, selectedItem.maxEnhance)}
                                    </button>
                                ))}
                            </div>

                            <div className="selected-stats">
                                <h4>Stats at {getEnhanceLabel(enhanceLevel, selectedItem.maxEnhance)}:</h4>
                                <div className="stats-preview">
                                    {selectedItem.enhanceAP && (
                                        <span className="stat ap">AP: {selectedItem.enhanceAP[enhanceLevel]}</span>
                                    )}
                                    {selectedItem.enhanceAAP && (
                                        <span className="stat aap">AAP: {selectedItem.enhanceAAP[enhanceLevel]}</span>
                                    )}
                                    {selectedItem.enhanceDP && (
                                        <span className="stat dp">DP: {selectedItem.enhanceDP[enhanceLevel]}</span>
                                    )}
                                </div>
                            </div>

                            <button className="btn btn-primary confirm-btn" onClick={handleConfirm}>
                                Confirmar Seleção
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          width: 90%;
          max-width: 550px;
          max-height: 85vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--border-subtle);
        }
        
        .modal-title {
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        .modal-close {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
          font-size: 1rem;
        }
        
        .modal-close:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
          border-color: var(--accent-gold);
        }
        
        .modal-body {
          padding: var(--spacing-lg);
          overflow-y: auto;
          flex: 1;
        }
        
        .item-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        
        .item-option {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border: 2px solid var(--border-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .item-option:hover {
          background: var(--bg-hover);
          border-color: var(--accent-gold);
          transform: translateX(4px);
        }
        
        .item-option.selected {
          border-color: var(--accent-gold);
          background: rgba(212, 168, 83, 0.1);
        }
        
        .item-icon {
          width: 48px;
          height: 48px;
          background: var(--bg-tertiary);
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        
        .item-icon.rarity-legendary {
          border-color: var(--rarity-legendary);
          box-shadow: 0 0 10px rgba(250, 204, 21, 0.2);
        }
        
        .item-icon.rarity-mythic {
          border-color: var(--rarity-mythic);
          box-shadow: 0 0 10px rgba(251, 146, 60, 0.2);
        }
        
        .item-info {
          flex: 1;
        }
        
        .item-name {
          font-weight: 600;
          margin-bottom: 2px;
        }
        
        .rarity-text-legendary { color: var(--rarity-legendary); }
        .rarity-text-mythic { color: var(--rarity-mythic); }
        
        .item-stats {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        .item-rarity-badge {
          font-size: 0.65rem;
          text-transform: uppercase;
          padding: 4px 8px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          color: var(--text-muted);
        }
        
        .enhance-section {
          margin-top: var(--spacing-lg);
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border-subtle);
        }
        
        .enhance-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
          color: var(--text-secondary);
        }
        
        .enhance-selector {
          display: flex;
          gap: var(--spacing-xs);
          flex-wrap: wrap;
        }
        
        .enhance-btn {
          min-width: 40px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          padding: 0 8px;
        }
        
        .enhance-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-gold);
          background: var(--bg-hover);
        }
        
        .enhance-btn.active {
          background: var(--accent-gold);
          color: var(--bg-primary);
          border-color: var(--accent-gold);
        }
        
        .selected-stats {
          margin-top: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
        }
        
        .selected-stats h4 {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: var(--spacing-sm);
        }
        
        .stats-preview {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .stat {
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .stat.ap { color: var(--enhance-red); }
        .stat.aap { color: var(--enhance-orange); }
        .stat.dp { color: var(--enhance-blue); }
        
        .confirm-btn {
          width: 100%;
          margin-top: var(--spacing-md);
          padding: var(--spacing-md);
          font-size: 1rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--accent-gold), var(--accent-purple));
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 168, 83, 0.4);
        }
      `}</style>
        </div>
    );
}
