import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { colors } from '../constants/colors';
import BackButton from '../components/BackButton';
import { technicalLibrary } from '../data/technical-library';

const tabs = [{ id: 'projects', label: 'PROJECTS', title: '项目实践' }, { id: 'notes', label: 'NOTES', title: '技术笔记' }, { id: 'resources', label: 'RESOURCES', title: '资料收藏' }];

function LibraryContent({ tab }) {
    const [query, setQuery] = useState('');
    const [tag, setTag] = useState('全部');
    const [expanded, setExpanded] = useState(null);
    const items = technicalLibrary[tab.id];
    const tags = ['全部', ...new Set(items.flatMap(item => item.tags))];
    const filtered = items.filter(item => (tag === '全部' || item.tags.includes(tag)) &&
        [item.title, item.summary, ...item.tags, ...(item.body || [])].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
    return <div className="stu-library">
        <h2 style={{ color: colors.accent, marginBottom: '1rem', fontSize: '2rem' }}>{tab.title}</h2>
        <p className="library-intro">记录技术，收藏灵感，慢慢把想法变成作品。</p>
        <label className="library-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索标题、标签或内容" aria-label="搜索技术内容" /></label>
        <div className="library-filters" aria-label="按技术标签筛选">{tags.map(value => <button key={value} aria-pressed={tag === value} className={tag === value ? 'is-active' : ''} onClick={() => setTag(value)}>{value}</button>)}</div>
        <p className="library-count" role="status">{filtered.length} 条内容</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filtered.map((item, index) => <Motion.article key={item.id} className="library-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.25 }} whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(54,91,214,0.07)' }}
                style={{ backgroundColor: colors.cardBg, padding: '2rem', borderRadius: '6px', boxShadow: '0 2px 8px rgba(23,26,32,0.025)' }}>
                <p className="library-kind">{item.type}</p>
                <h3 style={{ color: colors.accent, fontSize: '1.2rem' }}>{item.title}</h3>
                <p style={{ margin: '1rem 0', lineHeight: 1.8, color: colors.text }}>{item.summary}</p>
                <div className="library-tags">{item.tags.map(value => <span key={value}>{value}</span>)}</div>
                {item.url ? <a className="library-action" href={item.url} target="_blank" rel="noreferrer">访问资料 ↗<span className="sr-only">（在新标签页打开）</span></a> :
                    <button className="library-action" aria-expanded={expanded === item.id} aria-controls={'detail-' + item.id} onClick={() => setExpanded(expanded === item.id ? null : item.id)}>{expanded === item.id ? '收起内容 −' : '展开阅读 ＋'}</button>}
                <AnimatePresence initial={false}>{expanded === item.id && <Motion.div id={'detail-' + item.id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                    <div className="library-body">{item.body?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}{item.code && <pre tabIndex={0} aria-label="代码示例"><code>{item.code}</code></pre>}</div>
                </Motion.div>}</AnimatePresence>
            </Motion.article>)}
            {!filtered.length && <div className="library-empty"><p>没有匹配的内容，换个关键词试试。</p><button className="library-action" onClick={() => { setQuery(''); setTag('全部'); }}>清除筛选</button></div>}
        </div>
    </div>;
}

function StuPage({ onBack }) {
    const [activeTab, setActiveTab] = useState('projects');
    const tab = tabs.find(item => item.id === activeTab);
    return <div style={{ width: '100%', height: '100%', backgroundColor: colors.mainBg, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <BackButton onClick={onBack} />
        <div className="hide-scrollbar stu-scroll"><div className="stu-content-shell">
            <nav className="stu-text-nav" aria-label="技术资料分类">{tabs.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} aria-pressed={activeTab === item.id} className={activeTab === item.id ? 'is-active' : ''}>{item.label}{activeTab === item.id && <Motion.span layoutId="stu-underline" className="stu-nav-line" transition={{ duration: .22 }} />}</button>)}</nav>
            <AnimatePresence mode="wait"><Motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: .2 }}><LibraryContent tab={tab} /></Motion.div></AnimatePresence>
        </div></div>
    </div>;
}
export default StuPage;
