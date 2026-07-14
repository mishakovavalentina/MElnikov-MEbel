import { motion } from "framer-motion";

/**
 * FamilyScene — финальная сцена мультзаставки «Юра-Северянин»: семья за
 * длинным столом у избы. Пересобрана векторно (SVG), чтобы у людей не было
 * зазора между туловищем и столом — тела уходят за стол, стол рисуется
 * поверх них, поэтому никто не «висит» в воздухе.
 */

type Hair = "short" | "bob" | "bald" | "blondeBob";

interface PersonProps {
  cx: number;
  skin?: string;
  hairColor: string;
  hair: Hair;
  shirt: string;
  child?: boolean;
  mouthOpen?: boolean;
  plaid?: boolean;
}

const TABLE_TOP = 452; // верхняя кромка столешницы — ниже неё туловище скрыто

const Person = ({
  cx,
  skin = "#F0C39B",
  hairColor,
  hair,
  shirt,
  child = false,
  mouthOpen = false,
  plaid = false,
}: PersonProps) => {
  const headR = child ? 13 : 17;
  const headCy = child ? 404 : 388;
  const shoulderY = headCy + headR + 2;
  const bodyW = child ? 30 : 40;
  const bodyBottom = 466; // уходит за стол (TABLE_TOP=452)

  return (
    <g>
      {/* руки — вдоль тела к столу */}
      <rect x={cx - bodyW / 2 - 7} y={shoulderY + 4} width={9} height={40} rx={4.5} fill={shirt} />
      <rect x={cx + bodyW / 2 - 2} y={shoulderY + 4} width={9} height={40} rx={4.5} fill={shirt} />
      {/* кисти на столе */}
      <circle cx={cx - bodyW / 2 - 2.5} cy={shoulderY + 42} r={5} fill={skin} />
      <circle cx={cx + bodyW / 2 + 2.5} cy={shoulderY + 42} r={5} fill={skin} />

      {/* туловище */}
      <rect x={cx - bodyW / 2} y={shoulderY} width={bodyW} height={bodyBottom - shoulderY} rx={7} fill={shirt} />
      {plaid && (
        <g stroke="#8C7A3A" strokeWidth={3} opacity={0.7}>
          <line x1={cx - bodyW / 2} y1={shoulderY + 12} x2={cx + bodyW / 2} y2={shoulderY + 12} />
          <line x1={cx - bodyW / 2} y1={shoulderY + 24} x2={cx + bodyW / 2} y2={shoulderY + 24} />
          <line x1={cx - 8} y1={shoulderY} x2={cx - 8} y2={bodyBottom} />
          <line x1={cx + 8} y1={shoulderY} x2={cx + 8} y2={bodyBottom} />
        </g>
      )}

      {/* шея */}
      <rect x={cx - 5} y={headCy + headR - 3} width={10} height={8} fill={skin} />

      {/* голова */}
      <circle cx={cx} cy={headCy} r={headR} fill={skin} />

      {/* волосы */}
      {hair === "short" && (
        <path
          d={`M ${cx - headR} ${headCy - 2} A ${headR} ${headR} 0 0 1 ${cx + headR} ${headCy - 2} L ${cx + headR} ${headCy - 5} Q ${cx} ${headCy - headR - 5} ${cx - headR} ${headCy - 5} Z`}
          fill={hairColor}
        />
      )}
      {hair === "bob" && (
        <path
          d={`M ${cx - headR - 1} ${headCy + headR - 4} L ${cx - headR - 1} ${headCy - 3} Q ${cx} ${headCy - headR - 6} ${cx + headR + 1} ${headCy - 3} L ${cx + headR + 1} ${headCy + headR - 4} L ${cx + headR - 3} ${headCy + headR - 4} L ${cx + headR - 3} ${headCy - 2} Q ${cx} ${headCy - headR + 1} ${cx - headR + 3} ${headCy - 2} L ${cx - headR + 3} ${headCy + headR - 4} Z`}
          fill={hairColor}
        />
      )}
      {hair === "blondeBob" && (
        <path
          d={`M ${cx - headR - 1} ${headCy + headR - 2} L ${cx - headR - 1} ${headCy - 3} Q ${cx} ${headCy - headR - 6} ${cx + headR + 1} ${headCy - 3} L ${cx + headR + 1} ${headCy + headR - 2} L ${cx + headR - 3} ${headCy + headR - 2} L ${cx + headR - 3} ${headCy - 2} Q ${cx} ${headCy - headR + 1} ${cx - headR + 3} ${headCy - 2} L ${cx - headR + 3} ${headCy + headR - 2} Z`}
          fill={hairColor}
        />
      )}
      {hair === "bald" && (
        <>
          {/* седые виски, лысина сверху */}
          <path
            d={`M ${cx - headR} ${headCy + 2} Q ${cx - headR - 2} ${headCy - headR + 4} ${cx - headR + 5} ${headCy - headR + 3}`}
            fill="none"
            stroke={hairColor}
            strokeWidth={5}
            strokeLinecap="round"
          />
          <path
            d={`M ${cx + headR} ${headCy + 2} Q ${cx + headR + 2} ${headCy - headR + 4} ${cx + headR - 5} ${headCy - headR + 3}`}
            fill="none"
            stroke={hairColor}
            strokeWidth={5}
            strokeLinecap="round"
          />
        </>
      )}

      {/* глаза */}
      <circle cx={cx - 5} cy={headCy - 1} r={1.8} fill="#3A2A22" />
      <circle cx={cx + 5} cy={headCy - 1} r={1.8} fill="#3A2A22" />
      {/* рот */}
      {mouthOpen ? (
        <ellipse cx={cx} cy={headCy + 7} rx={3.5} ry={5} fill="#7A3B34" />
      ) : (
        <rect x={cx - 3} y={headCy + 7} width={6} height={2} rx={1} fill="#7A3B34" />
      )}
      {child && (
        <>
          <circle cx={cx - 8} cy={headCy + 4} r={2.4} fill="#F2A9A0" opacity={0.7} />
          <circle cx={cx + 8} cy={headCy + 4} r={2.4} fill="#F2A9A0" opacity={0.7} />
        </>
      )}
    </g>
  );
};

const Fir = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-5} y={0} width={10} height={16} fill="#6E4A2B" />
    <polygon points="0,-56 26,-16 -26,-16" fill="#2F7D33" />
    <polygon points="0,-72 22,-36 -22,-36" fill="#37913C" />
    <polygon points="0,-86 18,-54 -18,-54" fill="#2F7D33" />
  </g>
);

const Note = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.g
    initial={{ x, y, opacity: 0.85 }}
    animate={{ y: [y, y - 16, y], opacity: [0.85, 1, 0.85] }}
    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay }}
    fill="#3F5060"
  >
    <rect x={-2} y={-16} width={3.5} height={18} rx={1} />
    <rect x={8} y={-19} width={3.5} height={18} rx={1} />
    <path d="M-0.5 -16 L11.5 -19 L11.5 -13 L-0.5 -10 Z" />
    <ellipse cx={-4} cy={2} rx={6} ry={4.5} transform="rotate(-20 -4 2)" />
    <ellipse cx={7} cy={-1} rx={6} ry={4.5} transform="rotate(-20 7 -1)" />
  </motion.g>
);

const FamilyScene = () => (
  <div className="w-full overflow-hidden rounded-xl shadow-card">
    <svg viewBox="0 0 960 540" className="w-full h-auto block" role="img" aria-label="Финальная сцена: семья за столом">
      <defs>
        <linearGradient id="famSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#82BFE8" />
          <stop offset="100%" stopColor="#AED6EE" />
        </linearGradient>
      </defs>
      <rect width="960" height="540" fill="url(#famSky)" />

      {/* трава */}
      <rect x={0} y={250} width={960} height={290} fill="#86BE55" />
      <rect x={0} y={250} width={960} height={4} fill="#79B048" />

      {/* солнце */}
      <g>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={68} y={22} width={4} height={12} rx={2} fill="#FBC02D" transform={`rotate(${i * 30} 70 70)`} />
        ))}
        <circle cx={70} cy={70} r={26} fill="#FDD835" />
      </g>

      {/* облака */}
      {[
        [150, 60, 0.9],
        [370, 40, 0.8],
        [820, 55, 1],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF">
          <circle cx={0} cy={10} r={13} />
          <circle cx={15} cy={4} r={17} />
          <circle cx={33} cy={11} r={13} />
          <rect x={-3} y={11} width={40} height={13} rx={6.5} />
        </g>
      ))}

      {/* деревья */}
      <Fir x={45} y={330} s={1} />
      <Fir x={150} y={318} s={1.15} />
      <Fir x={850} y={322} s={1.15} />
      <Fir x={915} y={335} s={0.95} />

      {/* изба */}
      <g>
        <rect x={70} y={352} width={140} height={112} fill="#8A5A2E" />
        {[366, 382, 398, 414, 430, 446].map((y) => (
          <line key={y} x1={70} y1={y} x2={210} y2={y} stroke="#734A25" strokeWidth={2} />
        ))}
        <rect x={58} y={338} width={164} height={16} rx={3} fill="#5F3D1F" />
        <rect x={130} y={318} width={12} height={22} fill="#5F3D1F" />
        {/* окно */}
        <rect x={104} y={392} width={40} height={44} rx={2} fill="#CFE9F5" />
        <rect x={104} y={392} width={40} height={44} rx={2} fill="none" stroke="#F3F6F7" strokeWidth={4} />
      </g>

      {/* ЛЮДИ (рисуются до стола, чтобы стол их подрезал) */}
      <Person cx={285} hairColor="#5A3A28" hair="short" shirt="#C0392B" mouthOpen />
      <Person cx={343} hairColor="#9A5A34" hair="bob" shirt="#E8799B" mouthOpen />
      <Person cx={397} hairColor="#5A3A28" hair="short" shirt="#C0392B" child />
      <Person cx={460} hairColor="#B9BEC2" hair="bald" shirt="#B7A75A" mouthOpen plaid />
      <Person cx={520} hairColor="#B5533A" hair="short" shirt="#EFEFEF" mouthOpen />
      <Person cx={567} hairColor="#E7C766" hair="short" shirt="#5AA0C0" child />
      <Person cx={627} hairColor="#93A4AD" hair="short" shirt="#3E6B47" mouthOpen />
      <Person cx={682} hairColor="#E7C766" hair="blondeBob" shirt="#7E6BC0" mouthOpen />
      <Person cx={728} hairColor="#4A3226" hair="short" shirt="#E0A030" child />

      {/* самовар справа */}
      <g>
        <ellipse cx={758} cy={438} rx={13} ry={16} fill="#E0B24A" />
        <rect x={752} y={418} width={12} height={8} rx={2} fill="#E0B24A" />
        <circle cx={758} cy={414} r={4} fill="#CFA23E" />
      </g>

      {/* СТОЛ поверх людей */}
      <g>
        <rect x={222} y={452} width={520} height={12} rx={3} fill="#CDA06A" />
        <rect x={232} y={464} width={500} height={16} fill="#A87A44" />
        <rect x={252} y={480} width={16} height={30} fill="#8A5E30" />
        <rect x={700} y={480} width={16} height={30} fill="#8A5E30" />
        {/* посуда на столе */}
        <ellipse cx={330} cy={456} rx={16} ry={5} fill="#EFEFEF" />
        <ellipse cx={300} cy={457} rx={11} ry={4} fill="#6EA9D6" />
        <ellipse cx={470} cy={456} rx={13} ry={4.5} fill="#EFEFEF" />
        <ellipse cx={560} cy={457} rx={13} ry={4.5} fill="#EFEFEF" />
        <ellipse cx={640} cy={456} rx={12} ry={4} fill="#EFEFEF" />
      </g>

      {/* нотки */}
      <Note x={352} y={300} delay={0} />
      <Note x={452} y={262} delay={0.8} />
      <Note x={560} y={300} delay={1.5} />
    </svg>
  </div>
);

export default FamilyScene;
