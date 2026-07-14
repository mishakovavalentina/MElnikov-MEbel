import { motion } from "framer-motion";

/**
 * CartoonIntro — заглавная сцена мультзаставки «Юра-Северянин».
 *
 * Сцена сопки: на сопке стоят цветные дома (все сидят на склоне, ни один
 * не висит в воздухе), слева стоит вывеска «НЕРЮНГРИ», справа — угольный
 * разрез с самосвалами. Хореография: Юра выходит справа с чемоданом, видит
 * идущих слева медведей, бросает чемодан и убегает вправо — до того, как
 * они успевают до него дойти.
 *
 * Вся сцена нарисована векторно (SVG) и анимируется через Framer Motion,
 * поэтому легко правится и не требует видеофайла.
 */

// Полная длительность проигрывания сцены (сек). Ключевые кадры ниже заданы
// в долях от этой длительности, чтобы все актёры шли по единому таймлайну.
const D = 9;

const once = {
  duration: D,
  ease: "linear" as const,
  repeat: 0,
};

/* -------------------------------------------------------------------------- */
/*  Фоновые элементы                                                          */
/* -------------------------------------------------------------------------- */

const Sun = () => (
  <g>
    <motion.g
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, ease: "linear", repeat: Infinity }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={68}
          y={22}
          width={4}
          height={12}
          rx={2}
          fill="#FBC02D"
          transform={`rotate(${i * 30} 70 70)`}
        />
      ))}
    </motion.g>
    <circle cx={70} cy={70} r={26} fill="#FDD835" />
  </g>
);

const Cloud = ({ x, y, s = 1, dur = 60 }: { x: number; y: number; s?: number; dur?: number }) => (
  <motion.g
    initial={{ x }}
    animate={{ x: x + 40 }}
    transition={{ duration: dur, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
  >
    <g transform={`translate(0 ${y}) scale(${s})`} fill="#FFFFFF">
      <circle cx={0} cy={10} r={14} />
      <circle cx={16} cy={4} r={18} />
      <circle cx={36} cy={12} r={14} />
      <rect x={-4} y={12} width={44} height={14} rx={7} />
    </g>
  </motion.g>
);

// Дом на сопке. base — точка низа дома, лежащая на склоне сопки.
const Building = ({
  x,
  base,
  h,
  color,
  delay,
}: {
  x: number;
  base: number;
  h: number;
  color: string;
  delay: number;
}) => {
  const w = 44;
  const top = base - h;
  const cols = [x - 13, x + 1];
  const rows = Array.from({ length: Math.floor((h - 24) / 22) }).map((_, i) => top + 16 + i * 22);
  return (
    <motion.g
      style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* корпус, слегка утоплен в склон, чтобы не было щели */}
      <rect x={x - w / 2} y={top} width={w} height={h + 6} rx={3} fill={color} />
      {/* окна */}
      {rows.map((ry) =>
        cols.map((cx) => (
          <rect key={`${ry}-${cx}`} x={cx} y={ry} width={12} height={12} rx={1.5} fill="#FFF6D8" opacity={0.9} />
        )),
      )}
    </motion.g>
  );
};

const DumpTruck = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 L34 0 L34 -12 L20 -12 L14 -20 L0 -20 Z" fill="#F9A825" />
    <rect x={-2} y={-30} width={16} height={12} rx={2} fill="#F9A825" />
    <circle cx={8} cy={4} r={6} fill="#37474F" />
    <circle cx={28} cy={4} r={6} fill="#37474F" />
  </g>
);

const Sign = () => (
  <g>
    <rect x={72} y={352} width={8} height={120} fill="#6D4C41" />
    <rect x={26} y={336} width={104} height={30} rx={4} fill="#B24B33" />
    <text
      x={78}
      y={356}
      textAnchor="middle"
      fontSize={15}
      fontWeight={700}
      fill="#FFFFFF"
      fontFamily="'Inter', sans-serif"
      letterSpacing={0.5}
    >
      НЕРЮНГРИ
    </text>
  </g>
);

/* -------------------------------------------------------------------------- */
/*  Актёры                                                                    */
/* -------------------------------------------------------------------------- */

// Юра рисуется в локальных координатах: ступни в y=0, лицом вправо.
const Yura = () => {
  const legSwing = { rotate: [12, -12, 12] };
  const legTrans = { duration: 0.45, ease: "easeInOut" as const, repeat: Infinity };
  return (
    <g>
      {/* задняя нога */}
      <motion.rect
        x={-9}
        y={-24}
        width={8}
        height={24}
        rx={3}
        fill="#4E5A3C"
        style={{ transformBox: "fill-box", transformOrigin: "top" }}
        animate={legSwing}
        transition={{ ...legTrans, delay: 0.22 }}
      />
      {/* передняя нога */}
      <motion.rect
        x={1}
        y={-24}
        width={8}
        height={24}
        rx={3}
        fill="#5C6B45"
        style={{ transformBox: "fill-box", transformOrigin: "top" }}
        animate={legSwing}
        transition={legTrans}
      />
      {/* рубашка */}
      <rect x={-11} y={-52} width={22} height={30} rx={5} fill="#D7CCC8" />
      {/* жилет */}
      <rect x={-11} y={-50} width={22} height={22} rx={5} fill="#7A8450" />
      {/* рука с чемоданом (ведущая, впереди) */}
      <rect x={8} y={-50} width={7} height={22} rx={3.5} fill="#7A8450" />
      {/* голова */}
      <circle cx={0} cy={-60} r={9} fill="#E0A97E" />
      {/* седые волосы */}
      <path d="M-9 -62 Q0 -74 9 -62 L9 -60 Q0 -68 -9 -60 Z" fill="#CFCFCF" />
      <rect x={-9} y={-63} width={18} height={5} rx={2.5} fill="#CFCFCF" />
    </g>
  );
};

// Медведь — бурый, с круглыми ушами и мордой. Лицом вправо.
const Bear = ({ scale = 1, color = "#6D4C41" }: { scale?: number; color?: string }) => {
  const snout = "#C8A27C";
  const legSwing = { rotate: [10, -10, 10] };
  const legTrans = { duration: 0.4, ease: "easeInOut" as const, repeat: Infinity };
  return (
    <g transform={`scale(${scale})`}>
      {/* задние ноги */}
      <motion.rect
        x={-20}
        y={-13}
        width={7}
        height={14}
        rx={3}
        fill={color}
        style={{ transformBox: "fill-box", transformOrigin: "top" }}
        animate={legSwing}
        transition={{ ...legTrans, delay: 0.2 }}
      />
      <motion.rect
        x={-11}
        y={-13}
        width={7}
        height={14}
        rx={3}
        fill={color}
        style={{ transformBox: "fill-box", transformOrigin: "top" }}
        animate={legSwing}
        transition={legTrans}
      />
      {/* передние ноги */}
      <motion.rect
        x={10}
        y={-13}
        width={7}
        height={14}
        rx={3}
        fill={color}
        style={{ transformBox: "fill-box", transformOrigin: "top" }}
        animate={legSwing}
        transition={legTrans}
      />
      <motion.rect
        x={18}
        y={-13}
        width={7}
        height={14}
        rx={3}
        fill={color}
        style={{ transformBox: "fill-box", transformOrigin: "top" }}
        animate={legSwing}
        transition={{ ...legTrans, delay: 0.2 }}
      />
      {/* туловище — крупное, округлое */}
      <rect x={-22} y={-30} width={44} height={22} rx={11} fill={color} />
      {/* хвостик */}
      <circle cx={-22} cy={-22} r={4} fill={color} />
      {/* голова */}
      <circle cx={22} cy={-30} r={12} fill={color} />
      {/* уши */}
      <circle cx={15} cy={-40} r={5} fill={color} />
      <circle cx={27} cy={-41} r={5} fill={color} />
      <circle cx={15} cy={-40} r={2.4} fill={snout} />
      <circle cx={27} cy={-41} r={2.4} fill={snout} />
      {/* морда */}
      <ellipse cx={30} cy={-27} rx={8} ry={6} fill={snout} />
      <circle cx={34} cy={-29} r={2.4} fill="#2B1B14" />
      {/* глаз */}
      <circle cx={24} cy={-33} r={1.8} fill="#2B1B14" />
    </g>
  );
};

const Suitcase = () => (
  <g>
    <rect x={-12} y={-16} width={24} height={16} rx={3} fill="#8D5A2B" />
    <rect x={-12} y={-9} width={24} height={3} fill="#6E4420" />
    <rect x={-5} y={-21} width={10} height={6} rx={2} fill="none" stroke="#6E4420" strokeWidth={2.5} />
  </g>
);

/* -------------------------------------------------------------------------- */
/*  Сцена                                                                     */
/* -------------------------------------------------------------------------- */

const CartoonIntro = () => {
  const groundY = 478; // линия земли, по которой ходят актёры

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-card">
      <svg viewBox="0 0 960 540" className="w-full h-auto block" role="img" aria-label="Мультзаставка: Юра-Северянин">
        {/* небо */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9BD3F0" />
            <stop offset="100%" stopColor="#CFEAF7" />
          </linearGradient>
        </defs>
        <rect width="960" height="540" fill="url(#sky)" />

        <Sun />
        <Cloud x={250} y={40} s={0.9} dur={70} />
        <Cloud x={640} y={70} s={1.1} dur={90} />
        <Cloud x={820} y={30} s={0.8} dur={80} />

        {/* сопка */}
        <ellipse cx={300} cy={520} rx={360} ry={380} fill="#6FA83E" />

        {/* дома на сопке — все базы лежат на склоне */}
        <Building x={120} base={197} h={95} color="#E0603E" delay={0.1} />
        <Building x={190} base={165} h={122} color="#3FA9A0" delay={0.2} />
        <Building x={262} base={146} h={140} color="#F2C14E" delay={0.3} />
        <Building x={336} base={142} h={146} color="#D95D9A" delay={0.4} />
        <Building x={410} base={160} h={122} color="#6A5AC9" delay={0.5} />
        <Building x={482} base={192} h={96} color="#5BB85B" delay={0.6} />

        {/* угольный разрез справа (фон) */}
        <path d="M600 380 L960 380 L960 300 L720 300 L660 340 L600 360 Z" fill="#5D4037" />
        <path d="M690 380 L960 380 L960 335 L760 335 L710 358 Z" fill="#4E342E" />
        <DumpTruck x={800} y={332} s={0.8} />
        <DumpTruck x={700} y={372} s={0.9} />

        {/* передний план — ровная земля, по которой идут актёры */}
        <rect x={0} y={groundY - 8} width={960} height={80} fill="#8BC34A" />
        <rect x={0} y={groundY - 8} width={960} height={5} fill="#7CB342" />

        <Sign />

        {/* заголовок */}
        <motion.text
          x={480}
          y={110}
          textAnchor="middle"
          fontSize={64}
          fontWeight={700}
          fill="#1F2D3D"
          fontFamily="'Playfair Display', serif"
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: [0, 1, 1, 0], y: [95, 110, 110, 110] }}
          transition={{ duration: D, ease: "easeOut", times: [0, 0.06, 0.28, 0.4], repeat: 0 }}
          style={{ paintOrder: "stroke" }}
          stroke="#FFFFFF"
          strokeWidth={6}
        >
          ЮРА-СЕВЕРЯНИН
        </motion.text>

        {/* медведи идут слева направо */}
        <motion.g
          initial={{ x: -160, y: groundY }}
          animate={{ x: [-160, -160, 660, 680] }}
          transition={{ ...once, times: [0, 0.3, 0.97, 1] }}
        >
          <Bear scale={1.05} color="#6D4C41" />
        </motion.g>
        <motion.g
          initial={{ x: -280, y: groundY }}
          animate={{ x: [-280, -280, 560, 580] }}
          transition={{ ...once, times: [0, 0.3, 0.97, 1] }}
        >
          <Bear scale={0.85} color="#5B3A2E" />
        </motion.g>

        {/* брошенный чемодан */}
        <motion.g
          initial={{ x: 1010, y: groundY - 22 }}
          animate={{
            x: [1010, 1010, 622, 622, 622],
            y: [groundY - 22, groundY - 22, groundY - 22, groundY - 4, groundY - 4],
          }}
          transition={{ ...once, times: [0, 0.15, 0.45, 0.6, 1] }}
        >
          <Suitcase />
        </motion.g>

        {/* Юра: выходит справа, видит медведей, бросает чемодан, убегает вправо */}
        <motion.g
          initial={{ x: 1030, y: groundY }}
          animate={{ x: [1030, 1030, 640, 640, 1060, 1060] }}
          transition={{ ...once, times: [0, 0.15, 0.45, 0.6, 0.9, 1] }}
        >
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ scaleX: [-1, -1, 1, 1] }}
            transition={{ ...once, times: [0, 0.59, 0.6, 1] }}
          >
            <Yura />
          </motion.g>
        </motion.g>

        {/* «!» — Юра заметил медведей */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0, 0, 1.1, 1, 0.6, 0] }}
          transition={{ ...once, times: [0, 0.47, 0.5, 0.58, 0.62, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx={632} cy={392} r={17} fill="#FFFFFF" stroke="#E53935" strokeWidth={3} />
          <text
            x={632}
            y={404}
            textAnchor="middle"
            fontSize={26}
            fontWeight={800}
            fill="#E53935"
            fontFamily="'Inter', sans-serif"
          >
            !
          </text>
        </motion.g>
      </svg>
    </div>
  );
};

export default CartoonIntro;
