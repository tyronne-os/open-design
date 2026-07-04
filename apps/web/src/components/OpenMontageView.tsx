// OpenMontage — Diffusion Engine (Beryl AI Labs)
// Loads the OpenMontage project in an iframe.
// Local: expects the user to run the OpenMontage dev server.
// Fallback: shows a launch card.
import { useEffect, useState } from 'react';

const MONTAGE_URL = 'http://localhost:7860';
const GITHUB_URL = 'https://github.com/tyronne-os/OpenMontage';

export function OpenMontageView() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    fetch(MONTAGE_URL, { signal: AbortSignal.timeout(3000), mode: 'no-cors' })
      .then(() => setOk(true)).catch(() => setOk(false));
  }, []);

  if (ok === null) return <Shell><p style={hint}>Connecting to OpenMontage…</p></Shell>;
  if (!ok) return (
    <Shell>
      <div style={card}>
        <div style={{fontSize:42,marginBottom:12}}>⚡</div>
        <h2 style={cardTitle}>OpenMontage — Diffusion Engine</h2>
        <p style={body}>Start the OpenMontage Gradio server locally, or launch it on HuggingFace.</p>
        <pre style={code}>cd open-design/OpenMontage{'
'}python app.py   # starts on :7860</pre>
        <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:16}}>
          <button style={btn} type="button" onClick={() => setOk(null)}>Retry</button>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{...btn, textDecoration:'none', background:'#1e2a3d', color:'#d7e2f0'}}>GitHub</a>
        </div>
      </div>
    </Shell>
  );
  return <iframe src={MONTAGE_URL} title="OpenMontage" style={frame} allow="clipboard-read; clipboard-write; camera; microphone" />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div style={shell}>{children}</div>;
}

const shell: React.CSSProperties = { width:'100%', height:'100%', background:'#07090d', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' };
const frame: React.CSSProperties = { width:'100%', height:'100%', border:'none', display:'block', background:'#07090d' };
const hint: React.CSSProperties = { color:'#6b7a90', fontSize:13 };
const card: React.CSSProperties = { background:'#0d1117', border:'1px solid #1e2a3d', borderRadius:14, padding:'36px 48px', textAlign:'center', maxWidth:440 };
const cardTitle: React.CSSProperties = { color:'#4da3ff', fontSize:20, fontWeight:800, marginBottom:10 };
const body: React.CSSProperties = { color:'#6b7a90', fontSize:13, marginBottom:8 };
const code: React.CSSProperties = { background:'#060a10', border:'1px solid #1e2a3d', borderRadius:8, padding:'10px 16px', color:'#9fd8bf', fontSize:12, fontFamily:'Consolas,monospace', textAlign:'left', margin:'10px 0' };
const btn: React.CSSProperties = { background:'#4da3ff', border:'none', borderRadius:8, padding:'8px 24px', color:'#04120c', fontWeight:800, cursor:'pointer', fontSize:13, display:'inline-block' };
