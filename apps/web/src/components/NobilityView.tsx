// NOBILITY v1 — 4D Research Engine (Beryl AI Labs)
// Embedded iframe pointing at the local FastAPI server on port 8890.
import { useEffect, useState } from 'react';

const URL = 'http://localhost:8890';

export function NobilityView() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    fetch(URL + '/api/kb', { signal: AbortSignal.timeout(3000) })
      .then(() => setOk(true)).catch(() => setOk(false));
  }, []);

  if (ok === null) return <EmbedShell><p style={hint}>Connecting to NOBILITY v1…</p></EmbedShell>;
  if (!ok) return (
    <EmbedShell>
      <div style={card}>
        <div style={{fontSize:42,marginBottom:12}}>🧬</div>
        <h2 style={cardTitle}>NOBILITY v1 — offline</h2>
        <p style={body}>Start the engine:</p>
        <pre style={code}>cd berylllm\nobility-ide{'
'}python app.py</pre>
        <button style={btn} type="button" onClick={() => setOk(null)}>Retry</button>
      </div>
    </EmbedShell>
  );
  return <iframe src={URL} title="NOBILITY v1" style={frame} allow="clipboard-read; clipboard-write" />;
}

function EmbedShell({ children }: { children: React.ReactNode }) {
  return <div style={shell}>{children}</div>;
}

const shell: React.CSSProperties = { width:'100%', height:'100%', background:'#07090d', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' };
const frame: React.CSSProperties = { width:'100%', height:'100%', border:'none', display:'block', background:'#07090d' };
const hint: React.CSSProperties = { color:'#6b7a90', fontSize:13 };
const card: React.CSSProperties = { background:'#0d1117', border:'1px solid #1e2a3d', borderRadius:14, padding:'36px 48px', textAlign:'center', maxWidth:420 };
const cardTitle: React.CSSProperties = { color:'#3fe0a8', fontSize:20, fontWeight:800, marginBottom:10 };
const body: React.CSSProperties = { color:'#6b7a90', fontSize:13, marginBottom:8 };
const code: React.CSSProperties = { background:'#060a10', border:'1px solid #1e2a3d', borderRadius:8, padding:'10px 16px', color:'#9fd8bf', fontSize:12, fontFamily:'Consolas,monospace', textAlign:'left', margin:'10px 0' };
const btn: React.CSSProperties = { marginTop:16, background:'#3fe0a8', border:'none', borderRadius:8, padding:'8px 24px', color:'#04120c', fontWeight:800, cursor:'pointer', fontSize:13 };
