import React, { useState, useMemo } from 'react';
import { ThemeProvider, useTheme } from '../ThemeContext';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { getColors, maxW } from '../tokens';
import { AnimatedSection } from '../components/AnimatedSection';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: number;
    image?: string;
    tags: string[];
    content: string;
}

const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Introducing Lite: A Modern Component Library',
        excerpt: 'We are excited to announce the launch of Lite, a comprehensive component library built on Lit and React.',
        category: 'Release',
        author: 'Team',
        date: '2026-03-07',
        readTime: 5,
        tags: ['release', 'announcement'],
        content: 'Lite is a modern, fully-typed component library that works with any framework...'
    },
    {
        id: '2',
        title: 'Best Practices for Building Accessible Components',
        excerpt: 'Learn how to build accessible components that work for everyone, following WCAG guidelines.',
        category: 'Guide',
        author: 'Developer',
        date: '2026-03-05',
        readTime: 8,
        tags: ['accessibility', 'best-practices'],
        content: 'Accessibility is not an afterthought, it should be built in from the start...'
    },
    {
        id: '3',
        title: 'Theming Lite Components with CSS Custom Properties',
        excerpt: 'Master the theming system in Lite using CSS custom properties for full customization.',
        category: 'Tutorial',
        author: 'Developer',
        date: '2026-03-03',
        readTime: 6,
        tags: ['theming', 'css'],
        content: 'CSS custom properties provide a powerful way to theme components...'
    },
    {
        id: '4',
        title: 'Migrating from Material UI to Lite',
        excerpt: 'A step-by-step guide to migrating your existing Material UI project to Lite.',
        category: 'Guide',
        author: 'Team',
        date: '2026-02-28',
        readTime: 10,
        tags: ['migration', 'guide'],
        content: 'Migrating to a new component library can seem daunting, but with Lite it is straightforward...'
    }
];

function BlogPageInner() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = useMemo(() => {
        const cats = new Set(blogPosts.map(post => post.category));
        return Array.from(cats).sort();
    }, []);

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchCategory = selectedCategory === 'all' || post.category === selectedCategory;
            const matchSearch = searchQuery === '' ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [selectedCategory, searchQuery]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div style={{ fontFamily: 'system-ui,-apple-system,sans-serif', color: c.text, background: c.bg, minHeight: '100vh', transition: 'background 0.2s, color 0.2s' }}>
            <Header />

            {/* Hero */}
            <section style={{
                padding: '80px 24px',
                background: `linear-gradient(135deg, ${dark ? c.bg : '#f8fafc'} 0%, ${dark ? c.surface : '#f1f5f9'} 100%)`
            }}>
                <div style={maxW()}>
                    <AnimatedSection animation="slideUp">
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 900,
                            margin: 0,
                            color: c.text
                        }}>
                            Lite Blog
                        </h1>
                        <p style={{
                            fontSize: 18,
                            color: c.muted,
                            marginTop: 16,
                            maxWidth: 600
                        }}>
                            Tips, tutorials, and updates about building modern UIs with Lite
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content */}
            <section style={{ padding: '80px 24px' }}>
                <div style={maxW()}>
                    {/* Search and Filter */}
                    <div style={{ marginBottom: 48 }}>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                fontSize: 16,
                                border: `1px solid ${c.border}`,
                                borderRadius: 8,
                                background: c.surface,
                                color: c.text,
                                marginBottom: 24,
                                boxSizing: 'border-box'
                            }}
                        />

                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setSelectedCategory('all')}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 6,
                                    border: `1px solid ${selectedCategory === 'all' ? c.primary : c.border}`,
                                    background: selectedCategory === 'all' ? c.primary : 'transparent',
                                    color: selectedCategory === 'all' ? '#ffffff' : c.text,
                                    cursor: 'pointer',
                                    fontWeight: 500
                                }}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: 6,
                                        border: `1px solid ${selectedCategory === cat ? c.primary : c.border}`,
                                        background: selectedCategory === cat ? c.primary : 'transparent',
                                        color: selectedCategory === cat ? '#ffffff' : c.text,
                                        cursor: 'pointer',
                                        fontWeight: 500
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blog Posts Grid */}
                    {filteredPosts.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 32
                        }}>
                            {filteredPosts.map((post, idx) => (
                                <AnimatedSection key={post.id} animation="slideUp" delay={idx * 0.1}>
                                    <div style={{
                                        padding: 24,
                                        border: `1px solid ${c.border}`,
                                        borderRadius: 12,
                                        background: c.surface,
                                        transition: 'all 0.3s',
                                        cursor: 'pointer',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.boxShadow = `0 12px 24px rgba(0,0,0,0.08)`;
                                        el.style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.boxShadow = 'none';
                                        el.style.transform = 'translateY(0)';
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            gap: 8,
                                            marginBottom: 16,
                                            flexWrap: 'wrap'
                                        }}>
                                            <span style={{
                                                fontSize: 12,
                                                padding: '4px 12px',
                                                borderRadius: 4,
                                                background: `${c.primary}20`,
                                                color: c.primary,
                                                fontWeight: 600
                                            }}>
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 style={{
                                            fontSize: 18,
                                            fontWeight: 700,
                                            margin: '0 0 12px 0',
                                            color: c.text
                                        }}>
                                            {post.title}
                                        </h3>
                                        <p style={{
                                            fontSize: 14,
                                            color: c.muted,
                                            lineHeight: 1.6,
                                            margin: '0 0 16px 0',
                                            flex: 1
                                        }}>
                                            {post.excerpt}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: 12,
                                            color: c.muted,
                                            paddingTop: 16,
                                            borderTop: `1px solid ${c.border}`
                                        }}>
                                            <span>{post.author}</span>
                                            <span>{formatDate(post.date)}</span>
                                            <span>{post.readTime} min read</span>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: c.muted }}>
                            <p>No articles found. Try adjusting your search.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export function BlogPage() {
    return (
        <ThemeProvider>
            <BlogPageInner />
        </ThemeProvider>
    );
}
