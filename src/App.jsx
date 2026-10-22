
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./index.css";

const caseOptions = [
  {
    id: "gaming",
    name: "Gaming Tower",
    subtitle: "Игровой корпус",
    description: "Закрытая рама и прозрачная боковая панель.",
    price: 3990,
    icon: "🖥️",
  },
  {
    id: "bench",
    name: "Open Bench",
    subtitle: "Открытый стенд",
    description: "Открытая конструкция для удобной сборки.",
    price: 4990,
    icon: "🔧",
  },
];

function Desk() {
  return (
    <group>
      {/* Пол */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#202a38" roughness={0.9} />
      </mesh>

      {/* Столешница */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 0.18, 3.4]} />
        <meshStandardMaterial color="#78543b" roughness={0.65} />
      </mesh>

      {/* Ножки */}
      {[-3, 3].map((x) =>
        [-1.25, 1.25].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.43, z]}>
            <boxGeometry args={[0.13, 0.85, 0.13]} />
            <meshStandardMaterial color="#303b4b" />
          </mesh>
        ))
      )}

      {/* Клавиатура */}
      <mesh position={[-1.7, 1.02, 0.95]}>
        <boxGeometry args={[1.5, 0.07, 0.45]} />
        <meshStandardMaterial color="#101722" />
      </mesh>

      {/* Монитор */}
      <mesh position={[-2, 1.85, -0.85]} castShadow>
        <boxGeometry args={[1.65, 1.05, 0.12]} />
        <meshStandardMaterial color="#10151f" metalness={0.45} />
      </mesh>

      <mesh position={[-2, 1.85, -0.782]}>
        <planeGeometry args={[1.48, 0.87]} />
        <meshStandardMaterial
          color="#245b89"
          emissive="#102b50"
          emissiveIntensity={1.2}
        />
      </mesh>

      <mesh position={[-2, 1.25, -0.85]}>
        <boxGeometry args={[0.12, 0.4, 0.12]} />
        <meshStandardMaterial color="#343f4e" />
      </mesh>

      <mesh position={[-2, 1.04, -0.85]}>
        <boxGeometry args={[0.7, 0.06, 0.38]} />
        <meshStandardMaterial color="#343f4e" />
      </mesh>

      {/* Мышь */}
      <mesh position={[-0.65, 1.02, 0.92]}>
        <boxGeometry args={[0.22, 0.09, 0.32]} />
        <meshStandardMaterial color="#293446" />
      </mesh>
    </group>
  );
}

function Fan({ position, radius = 0.19, color = "#56baff" }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[radius, radius, 0.045, 32]} />
        <meshStandardMaterial
          color="#101923"
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>

      <mesh position={[0, 0.026, 0]}>
        <torusGeometry args={[radius * 0.78, 0.012, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>

      <mesh position={[0, 0.032, 0]}>
        <cylinderGeometry args={[radius * 0.18, radius * 0.18, 0.025, 16]} />
        <meshStandardMaterial color="#8999aa" metalness={0.7} />
      </mesh>
    </group>
  );
}

function CaseFeet() {
  return (
    <group>
      {[-0.58, 0.58].map((x) =>
        [-0.38, 0.38].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.05, z]}>
            <boxGeometry args={[0.13, 0.1, 0.13]} />
            <meshStandardMaterial color="#090d13" metalness={0.6} />
          </mesh>
        ))
      )}
    </group>
  );
}

function GamingCase() {
  return (
    <group>
      {/* Нижняя панель */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.12, 1.2]} />
        <meshStandardMaterial color="#171e29" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Верхняя панель */}
      <mesh position={[0, 1.52, 0]}>
        <boxGeometry args={[1.6, 0.07, 1.2]} />
        <meshStandardMaterial color="#202a37" metalness={0.55} />
      </mesh>

      {/* Задняя стенка */}
      <mesh position={[0, 0.8, -0.56]}>
        <boxGeometry args={[1.6, 1.38, 0.07]} />
        <meshStandardMaterial color="#293544" metalness={0.5} />
      </mesh>

      {/* Передняя панель */}
      <mesh position={[0, 0.8, 0.56]}>
        <boxGeometry args={[1.6, 1.38, 0.07]} />
        <meshStandardMaterial color="#121923" metalness={0.35} />
      </mesh>

      {/* Передняя вентиляционная область */}
      <mesh position={[0, 0.8, 0.603]}>
        <boxGeometry args={[0.82, 1.05, 0.018]} />
        <meshStandardMaterial color="#202d3d" />
      </mesh>

      {[0.4, 0.8, 1.2].map((y) => (
        <Fan
          key={y}
          position={[0, y, 0.62]}
          radius={0.15}
        />
      ))}

      {/* Боковые стойки */}
      {[-0.76, 0.76].map((x) => (
        <mesh key={x} position={[x, 0.8, 0]}>
          <boxGeometry args={[0.08, 1.42, 1.2]} />
          <meshStandardMaterial color="#171f2b" metalness={0.65} />
        </mesh>
      ))}

      {/* Прозрачное боковое стекло */}
      <mesh position={[-0.38, 0.82, 0.635]}>
        <boxGeometry args={[0.68, 1.25, 0.018]} />
        <meshPhysicalMaterial
          color="#6b9db8"
          transparent
          opacity={0.19}
          roughness={0.12}
          metalness={0.25}
          depthWrite={false}
        />
      </mesh>

      {/* Внутренняя монтажная панель */}
      <mesh position={[0, 0.8, -0.49]}>
        <boxGeometry args={[1.25, 1.12, 0.025]} />
        <meshStandardMaterial color="#303c4b" metalness={0.35} />
      </mesh>

      {/* Условный блок питания */}
      <mesh position={[0.4, 0.24, -0.28]}>
        <boxGeometry args={[0.65, 0.27, 0.45]} />
        <meshStandardMaterial color="#111720" metalness={0.45} />
      </mesh>

      {/* Задний вытяжной вентилятор */}
      <Fan position={[0, 1.25, -0.515]} radius={0.17} color="#42a5ff" />

      {/* Слоты расширения */}
      {[-0.25, -0.13, -0.01, 0.11].map((y) => (
        <mesh key={y} position={[0.49, 0.65 + y, -0.465]}>
          <boxGeometry args={[0.28, 0.035, 0.025]} />
          <meshStandardMaterial color="#9ba9b7" metalness={0.6} />
        </mesh>
      ))}

      <CaseFeet />
    </group>
  );
}

function OpenBench() {
  return (
    <group>
      {/* Основание открытого стенда */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.85, 0.13, 1.4]} />
        <meshStandardMaterial color="#273748" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Четыре стойки */}
      {[-0.83, 0.83].map((x) =>
        [-0.58, 0.58].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.48, z]}>
            <boxGeometry args={[0.07, 0.75, 0.07]} />
            <meshStandardMaterial color="#7d8d9d" metalness={0.8} />
          </mesh>
        ))
      )}

      {/* Верхние направляющие */}
      {[-0.83, 0.83].map((x) => (
        <mesh key={x} position={[x, 0.87, 0]}>
          <boxGeometry args={[0.065, 0.06, 1.25]} />
          <meshStandardMaterial color="#738599" metalness={0.8} />
        </mesh>
      ))}

      {[-0.58, 0.58].map((z) => (
        <mesh key={z} position={[0, 0.87, z]}>
          <boxGeometry args={[1.72, 0.06, 0.065]} />
          <meshStandardMaterial color="#738599" metalness={0.8} />
        </mesh>
      ))}

      {/* Монтажная плата */}
      <mesh position={[-0.2, 0.18, -0.12]}>
        <boxGeometry args={[1.12, 0.045, 0.95]} />
        <meshStandardMaterial color="#1d5147" metalness={0.25} roughness={0.6} />
      </mesh>

      {/* Декоративные дорожки платы */}
      {[-0.45, -0.2, 0.05, 0.3].map((x) => (
        <mesh key={x} position={[x, 0.207, -0.1]}>
          <boxGeometry args={[0.018, 0.006, 0.7]} />
          <meshStandardMaterial color="#4aab83" emissive="#174c38" />
        </mesh>
      ))}

      {/* Открытый вентилятор */}
      <Fan position={[0.58, 0.25, 0.39]} radius={0.23} color="#53c7ff" />

      {/* Передняя панель блока питания */}
      <mesh position={[0.48, 0.3, -0.42]}>
        <boxGeometry args={[0.42, 0.24, 0.35]} />
        <meshStandardMaterial color="#111923" metalness={0.5} />
      </mesh>

      <CaseFeet />
    </group>
  );
}


function ComputerCase({ type, motherboardInstalled }) {
  return (
    <group position={[1.35, 1, -0.05]} scale={1.08}>
      {type === "gaming" ? <GamingCase /> : <OpenBench />}

      {motherboardInstalled && (
  <group
    position={
      type === "gaming"
        ? [0, 0.82, -0.42]
        : [0, 0.23, -0.12]
    }
    rotation={
      type === "gaming"
        ? [-Math.PI / 2, 0, 0]
        : [0, 0, 0]
    }
    scale={type === "gaming" ? 0.85 : 0.9}
  >
    <Motherboard />
  </group>
)}
    </group>
  );
}



function Motherboard({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Основа платы */}
      <mesh>
        <boxGeometry args={[1.02, 0.045, 0.88]} />
        <meshStandardMaterial
          color="#17634c"
          metalness={0.25}
          roughness={0.65}
        />
      </mesh>

      {/* Декоративные дорожки */}
      {[-0.38, -0.18, 0.05, 0.28].map((x) => (
        <mesh
          key={x}
          position={[x, 0.026, 0]}
        >
          <boxGeometry args={[0.012, 0.006, 0.68]} />
          <meshStandardMaterial color="#74c6a0" />
        </mesh>
      ))}

      {/* Сокет процессора */}
      <mesh position={[-0.12, 0.04, -0.12]}>
        <boxGeometry args={[0.3, 0.035, 0.3]} />
        <meshStandardMaterial color="#8995a3" metalness={0.6} />
      </mesh>

      <mesh position={[-0.12, 0.062, -0.12]}>
        <boxGeometry args={[0.2, 0.012, 0.2]} />
        <meshStandardMaterial color="#252e3b" />
      </mesh>

      {/* Слоты оперативной памяти */}
      {[-0.3, -0.19, -0.08, 0.03].map((z) => (
        <mesh
          key={z}
          position={[0.24, 0.05, z]}
        >
          <boxGeometry args={[0.055, 0.035, 0.09]} />
          <meshStandardMaterial color="#111923" />
        </mesh>
      ))}

      {/* Радиаторы питания */}
      <mesh position={[-0.38, 0.055, -0.2]}>
        <boxGeometry args={[0.12, 0.06, 0.34]} />
        <meshStandardMaterial color="#a1adbb" metalness={0.7} />
      </mesh>

      {/* Слот видеокарты */}
      <mesh position={[0.02, 0.055, 0.22]}>
        <boxGeometry args={[0.63, 0.035, 0.07]} />
        <meshStandardMaterial color="#b8a36b" metalness={0.65} />
      </mesh>

      {/* Разъёмы у края платы */}
      {[-0.25, -0.1, 0.05, 0.2].map((x) => (
        <mesh key={x} position={[x, 0.045, 0.39]}>
          <boxGeometry args={[0.08, 0.045, 0.1]} />
          <meshStandardMaterial color="#111722" />
        </mesh>
      ))}

      {/* Крепёжные отверстия */}
      {[
        [-0.45, 0.45],
        [0.45, 0.45],
        [-0.45, -0.36],
        [0.45, -0.36],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.027, z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.012, 16]} />
          <meshStandardMaterial color="#d4c69a" metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Workshop({ caseType, motherboardInstalled }) {
  return (
    <>
      <color attach="background" args={["#101824"]} />
      <fog attach="fog" args={["#101824", 12, 25]} />

      <ambientLight intensity={1.2} />

      <directionalLight
        position={[4, 8, 5]}
        intensity={2.5}
        castShadow
      />

      <pointLight position={[-3, 4, -2]} intensity={35} color="#4daeff" />
      <pointLight position={[2, 3, 3]} intensity={20} color="#ffbc78" />

      <Desk />
      <ComputerCase
  type={caseType}
  motherboardInstalled={motherboardInstalled}
/>

      <OrbitControls
        makeDefault
        target={[0, 1.1, 0]}
        minDistance={3}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2 - 0.03}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

export default function App() {
  const [caseType, setCaseType] = useState("gaming");
  const [motherboardInstalled, setMotherboardInstalled] = useState(false);

  const selected = caseOptions.find((item) => item.id === caseType);

  return (
    <main className="workshop-page">
      <header className="workshop-header">
        <div>
          <span className="brand-icon">⬡</span>
          <strong>PC Builder <span>Lab</span></strong>
        </div>
        <span className="status">3D WORKSHOP</span>
      </header>

      <section className="scene-heading">
        <div>
          <p className="eyebrow">ВИРТУАЛЬНАЯ МАСТЕРСКАЯ</p>
          <h1>Выбери свой корпус</h1>
          <p>Переключай модели и осматривай их в 3D.</p>
        </div>
      </section>

      <section className="builder-layout">
        <aside className="case-sidebar">
          <p className="eyebrow">КАТАЛОГ</p>
          <h2>Корпуса</h2>

          {caseOptions.map((item) => (
            <button
              key={item.id}
              className={
                caseType === item.id
                  ? "case-card selected"
                  : "case-card"
              }
              onClick={() => setCaseType(item.id)}
            >
              <span className="case-card-icon">{item.icon}</span>
              <span className="case-card-info">
                <strong>{item.name}</strong>
                <small>{item.subtitle}</small>
                <span className="case-price">{item.price.toLocaleString("ru-RU")} ₽</span>
              </span>
              {caseType === item.id && (
                <span className="selected-mark">✓</span>
              )}
            </button>
          ))}

          <div className="selected-info">
            <p className="eyebrow">ВЫБРАННАЯ МОДЕЛЬ</p>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <strong>{selected.price.toLocaleString("ru-RU")} ₽</strong>
          </div>
        </aside>

        <section className="scene-container">
          <Canvas
            shadows
            camera={{
              position: [5, 4.2, 7],
              fov: 45,
            }}
            gl={{ antialias: true }}
          >
            <Workshop
  caseType={caseType}
  motherboardInstalled={motherboardInstalled}
/>
          </Canvas>

          <div className="scene-hint">
            🖱️ Вращай сцену · Колесо мыши — масштаб
          </div>

          <div className="scene-badge">
            {selected.name}
          </div>
        </section>
      </section>
      
<section className="parts-panel">
  <div>
    <p className="eyebrow">КОМПЛЕКТУЮЩИЕ</p>
    <h2>Материнская плата</h2>
    <p>
      Основа компьютера: к ней подключаются процессор,
      память и видеокарта.
    </p>
  </div>

  <div className="part-action">
    <strong>MSI B650 · ATX</strong>

    <button
      className="install-button"
      onClick={() =>
        setMotherboardInstalled((current) => !current)
      }
    >
      {motherboardInstalled
        ? "Снять материнскую плату"
        : "Установить материнскую плату"}
    </button>

    <span className="part-status">
      {motherboardInstalled
        ? "✓ Плата установлена"
        : "○ Плата ещё не установлена"}
    </span>
  </div>
</section>

      <footer className="workshop-footer">
        <span>PC Builder Lab</span>
        <span>Этап 2 · Выбор корпуса</span>
      </footer>
    </main>
  );
}
