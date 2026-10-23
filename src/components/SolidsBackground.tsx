import tetraedro from '../assets/solidos/tetraedro.png';
import cubo from '../assets/solidos/cubo.png';
import dodecaedro from '../assets/solidos/dodecaedro.png';
import icosaedro from '../assets/solidos/icosaedro.png';

// ─────────────────────────────────────────────────────────────
// Escolhe aqui a versão dos sólidos no fundo das secções claras:
//   'grandes'  → 3 sólidos grandes por secção (tamanho parecido com o do início da página)
//   'pequenos' → vários sólidos pequenos espalhados
// ─────────────────────────────────────────────────────────────
const VERSAO: 'grandes' | 'pequenos' = 'grandes';

const SOLIDS = [tetraedro, cubo, dodecaedro, icosaedro];

// s = qual sólido (0 a 3) · x, y = centro, em % da secção · size = largura em px (ecrã grande)
// rot = rotação em graus · o = opacidade (opcional)
type Item = { s: number; x: number; y: number; size: number; rot: number; o?: number };

// Versão 'grandes': uma disposição diferente por secção, para não repetir sempre o mesmo padrão
const GRANDES: Item[][] = [
  [{ s: 1, x: 98, y: 5, size: 300, rot: 15 }, { s: 0, x: 1, y: 97, size: 270, rot: -12 }, { s: 3, x: 93, y: 62, size: 150, rot: 25 }],
  [{ s: 2, x: 2, y: 6, size: 280, rot: -10 }, { s: 0, x: 99, y: 94, size: 300, rot: 20 }, { s: 3, x: 8, y: 75, size: 140, rot: -28 }],
  [{ s: 0, x: 97, y: 4, size: 290, rot: 10 }, { s: 1, x: 3, y: 92, size: 290, rot: -18 }, { s: 2, x: 95, y: 68, size: 160, rot: 30 }],
  [{ s: 3, x: 3, y: 10, size: 260, rot: 12 }, { s: 2, x: 98, y: 90, size: 280, rot: -15 }, { s: 0, x: 90, y: 12, size: 130, rot: 35 }],
  [{ s: 1, x: 99, y: 8, size: 280, rot: -8 }, { s: 3, x: 2, y: 88, size: 270, rot: 22 }, { s: 2, x: 6, y: 30, size: 140, rot: -20 }],
  [{ s: 0, x: 2, y: 8, size: 290, rot: 18 }, { s: 2, x: 98, y: 85, size: 290, rot: -10 }, { s: 1, x: 94, y: 20, size: 140, rot: 28 }],
];

// Versão 'pequenos': posições geradas com uma semente fixa (o resultado é sempre o mesmo)
function pequenos(seed: number): Item[] {
  let a = seed * 9301 + 49297;
  const rnd = () => {
    a = (a * 9301 + 49297) % 233280;
    return a / 233280;
  };
  const cols = 6;
  const rows = 3;
  const items: Item[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rnd() < 0.35) continue; // salta algumas células para não ficar uma grelha certinha
      items.push({
        s: (r * cols + c + seed) % SOLIDS.length,
        x: ((c + 0.15 + rnd() * 0.7) / cols) * 100,
        y: ((r + 0.15 + rnd() * 0.7) / rows) * 100,
        size: 44 + rnd() * 52,
        rot: -40 + rnd() * 80,
      });
    }
  }
  return items;
}

export default function SolidsBackground({ layout = 0 }: { layout?: number }) {
  const grandes = VERSAO === 'grandes';
  const items = grandes ? GRANDES[layout % GRANDES.length] : pequenos(layout + 1);
  const opacidade = grandes ? 0.09 : 0.12;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {items.map((it, i) => (
        <img
          key={i}
          src={SOLIDS[it.s % SOLIDS.length]}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            left: `${it.x}%`,
            top: `${it.y}%`,
            // encolhe em ecrãs mais pequenos: ~1440px de largura = tamanho completo
            width: `clamp(${Math.round(it.size * 0.55)}px, ${(it.size / 14.4).toFixed(1)}vw, ${Math.round(it.size)}px)`,
            height: 'auto',
            transform: `translate(-50%, -50%) rotate(${Math.round(it.rot)}deg)`,
            opacity: it.o ?? opacidade,
          }}
        />
      ))}
    </div>
  );
}
