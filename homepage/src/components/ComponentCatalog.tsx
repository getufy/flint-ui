import React, { useState, useMemo } from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, row } from '../tokens';

interface CatalogItem {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    icon: string;
}

interface ComponentCatalogProps {
    items: CatalogItem[];
    onSelect?: (item: CatalogItem) => void;
}

export function ComponentCatalog({ items, onSelect }: ComponentCatalogProps) {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'name' | 'popularity'>('name');

    const categories = useMemo(() => {
        const cats = new Set(items.map(item => item.category));
        return Array.from(cats).sort();
    }, [items]);

    const filteredItems = useMemo(() => {
        let results = items;

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            results = results.filter(item => item.category === selectedCategory);
        }

        // Sort
        if (sortBy === 'name') {
            results.sort((a, b) => a.name.localeCompare(b.name));
        }

        return results;
    }, [items, searchQuery, selectedCategory, sortBy]);

    return (
        <div>
            {/* Search Bar */}
            <div style={{
                marginBottom: 32,
                padding: '20px',
                background: c.surface,
                borderRadius: 12,
                border: `1px solid ${c.border}`
            }}>
                <input
                    type="text"
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: 16,
                        border: `1px solid ${c.border}`,
                        borderRadius: 8,
                        background: c.bg,
                        color: c.text,
                        outline: 'none',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            {/* Filters */}
            <div style={{
                marginBottom: 32,
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                {/* Category Filter */}
                <div style={row(8)}>
                    <label style={{ fontSize: 14, fontWeight: 600, color: c.muted }}>Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            fontSize: 14,
                            border: `1px solid ${c.border}`,
                            borderRadius: 6,
                            background: c.surface,
                            color: c.text,
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div style={row(8)}>
                    <label style={{ fontSize: 14, fontWeight: 600, color: c.muted }}>Sort:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'popularity')}
                        style={{
                            padding: '8px 12px',
                            fontSize: 14,
                            border: `1px solid ${c.border}`,
                            borderRadius: 6,
                            background: c.surface,
                            color: c.text,
                            cursor: 'pointer'
                        }}
                    >
                        <option value="name">Name (A-Z)</option>
                        <option value="popularity">Popularity</option>
                    </select>
                </div>

                {/* Results count */}
                <div style={{ fontSize: 14, color: c.muted, marginLeft: 'auto' }}>
                    {filteredItems.length} component{filteredItems.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Component Grid */}
            {filteredItems.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 16
                }}>
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            onClick={() => onSelect?.(item)}
                            style={{
                                padding: 16,
                                border: `1px solid ${c.border}`,
                                borderRadius: 8,
                                background: c.surface,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.boxShadow = `0 4px 12px rgba(0,0,0,0.08)`;
                                el.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.boxShadow = 'none';
                                el.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                            <h4 style={{
                                margin: '0 0 8px 0',
                                fontSize: 15,
                                fontWeight: 600,
                                color: c.text
                            }}>
                                {item.name}
                            </h4>
                            <p style={{
                                margin: '0 0 12px 0',
                                fontSize: 12,
                                color: c.muted,
                                lineHeight: 1.4
                            }}>
                                {item.description}
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: 4,
                                flexWrap: 'wrap'
                            }}>
                                <span style={{
                                    fontSize: 11,
                                    padding: '2px 8px',
                                    borderRadius: 4,
                                    background: `${c.primary}20`,
                                    color: c.primary,
                                    fontWeight: 500
                                }}>
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: 40,
                    color: c.muted
                }}>
                    <p style={{ fontSize: 16, margin: 0 }}>No components found</p>
                    <p style={{ fontSize: 14, margin: '8px 0 0 0' }}>Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
}
