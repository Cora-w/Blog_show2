export default function BackButton({ onClick, area = 'stu' }) {
  return <button className={`back-link back-link--${area}`} onClick={onClick} aria-label="返回首页" title="返回首页"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14.5 5-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>;
}
