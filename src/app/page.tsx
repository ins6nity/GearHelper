'use client';

import React, { useState, useEffect, useRef } from 'react';
import GearWheel from '@/components/GearWheel';
import ItemPicker from '@/components/ItemPicker';
import StatsPanel from '@/components/StatsPanel';
import {
  GearSlotType,
  EquippedItem,
  GearItem
} from '@/data/items';

const STORAGE_KEY = 'bdo-gear-helper-gear';

interface StoredGear {
  slot: GearSlotType;
  item: GearItem;
  enhanceLevel: number;
}

function saveGearToStorage(gear: Map<GearSlotType, EquippedItem>): void {
  try {
    const gearArray: StoredGear[] = [];
    gear.forEach((equipped, slot) => {
      gearArray.push({
        slot,
        item: equipped.item,
        enhanceLevel: equipped.enhanceLevel,
      });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gearArray));
  } catch {
    // localStorage may be unavailable or full
  }
}

function loadGearFromStorage(): Map<GearSlotType, EquippedItem> {
  try {
    if (typeof window === 'undefined') return new Map();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return new Map();

    const gearArray: StoredGear[] = JSON.parse(stored);
    const gearMap = new Map<GearSlotType, EquippedItem>();

    gearArray.forEach(({ slot, item, enhanceLevel }) => {
      gearMap.set(slot, { item, enhanceLevel });
    });

    return gearMap;
  } catch {
    // localStorage may be unavailable or data corrupted
    return new Map();
  }
}

export default function Home() {
  const [gear, setGear] = useState<Map<GearSlotType, EquippedItem>>(() => loadGearFromStorage());
  const [selectedSlot, setSelectedSlot] = useState<GearSlotType | null>(null);
  const isInitialMount = useRef(true);

  // Save gear to localStorage whenever it changes (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    saveGearToStorage(gear);
  }, [gear]);

  const handleSlotClick = (slot: GearSlotType) => {
    setSelectedSlot(slot);
  };

  const handleItemSelect = (item: GearItem, enhanceLevel: number) => {
    // Adjust slot for accessories (earrings and rings share items)
    const adjustedItem = { ...item, slot: selectedSlot! };

    setGear(prev => {
      const newGear = new Map(prev);
      newGear.set(selectedSlot!, { item: adjustedItem, enhanceLevel });
      return newGear;
    });
    setSelectedSlot(null);
  };

  const handleClearSlot = (slot: GearSlotType) => {
    setGear(prev => {
      const newGear = new Map(prev);
      newGear.delete(slot);
      return newGear;
    });
  };

  const handleClearAll = () => {
    setGear(new Map());
  };

  return (
    <main className="main-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <span className="logo-icon">⚔️</span>
            BDO Gear Helper
          </h1>
          <p className="header-subtitle">
            Análise de gear com recomendações de upgrade baseadas em custo-benefício
          </p>
        </div>
        <button className="btn btn-secondary" onClick={handleClearAll}>
          🗑️ Limpar Tudo
        </button>
      </header>

      {/* Main Grid */}
      <div className="app-grid">
        {/* Gear Builder */}
        <section className="gear-builder">
          <div className="gear-builder-header">
            <h2 className="gear-builder-title">Current Gear</h2>
          </div>

          <GearWheel
            gear={gear}
            onSlotClick={handleSlotClick}
            onClearSlot={handleClearSlot}
          />

          {/* Quick Tips */}
          <div className="tips-section">
            <h3 className="tips-title">💡 Dicas</h3>
            <ul className="tips-list">
              <li>Clica nos slots para adicionar o teu gear atual</li>
              <li>O sistema calcula automaticamente o próximo upgrade mais barato</li>
              <li>Os custos são baseados nos cálculos do BairogHaan</li>
              <li>O teu gear é guardado automaticamente no browser</li>
            </ul>
          </div>
        </section>

        {/* Stats Panel */}
        <aside className="stats-sidebar">
          <StatsPanel gear={gear} />
        </aside>
      </div>

      {/* Item Picker Modal */}
      {selectedSlot && (
        <ItemPicker
          slot={selectedSlot}
          onSelect={handleItemSelect}
          onClose={() => setSelectedSlot(null)}
        />
      )}

      <style jsx>{`
        .main-container {
          min-height: 100vh;
          padding: var(--spacing-lg);
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }
        
        .header-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--accent-gold), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .logo-icon {
          font-size: 1.75rem;
          -webkit-text-fill-color: initial;
        }
        
        .header-subtitle {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        .btn {
          padding: var(--spacing-sm) var(--spacing-md);
          font-size: 0.875rem;
          font-weight: 600;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .btn-secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-medium);
        }
        
        .btn-secondary:hover {
          background: var(--bg-hover);
          border-color: var(--accent-gold);
        }
        
        .app-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: var(--spacing-xl);
        }
        
        @media (max-width: 1024px) {
          .app-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-sidebar {
            order: -1;
          }
        }
        
        .gear-builder {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
        }
        
        .gear-builder-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border-subtle);
        }
        
        .gear-builder-title {
          font-size: 1.125rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .gear-builder-title::before {
          content: '';
          width: 4px;
          height: 20px;
          background: linear-gradient(to bottom, var(--accent-gold), var(--accent-purple));
          border-radius: 2px;
        }

        .tips-section {
          margin-top: var(--spacing-xl);
          padding: var(--spacing-lg);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
        }
        
        .tips-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
          color: var(--accent-blue);
        }
        
        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .tips-list li {
          font-size: 0.8rem;
          color: var(--text-secondary);
          padding: var(--spacing-xs) 0;
          padding-left: var(--spacing-md);
          position: relative;
        }
        
        .tips-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-purple);
        }
      `}</style>
    </main>
  );
}
