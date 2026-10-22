import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './index.css';

function Desk() {
  return (
    <group>
      {/* Пол */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.08, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#202b3a" />
      </mesh>

      {/* Столешница */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 0.18, 3.4]} />
        <meshStandardMaterial color="#805638" roughness={0.65} />
      </mesh>

      {/* Ножки стола */}
      {[-3, 3].map((x) =>
        [-1.25, 1.25].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.43, z]}>
            <boxGeometry args={[0.13, 0.85, 0.13]} />
            <meshStandardMaterial color="#303b4b" />
          </mesh>
        ))
      )}

      {/* Клавиатура */}
      <mesh position={[-1.7, 1.02, 0.9]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[1.5, 0.08, 0.48]} />
        <meshStandardMaterial color="#151b26" />
      </mesh>

      {/* Монитор */}
      <mesh position={[-2, 1.9, -0.85]} castShadow>
        <boxGeometry args={[1.65, 1.05, 0.12]} />
        <meshStandardMaterial color="#10151f" metalness={0.4} />
      </mesh>

      {/* Экран */}
      <mesh position={[-2, 1.9, -0.78]}>
        <planeGeometry args={[1.48, 0.87]} />
        <meshStandardMaterial
          color="#245b89"
          emissive="#102b50"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Подставка монитора */}
      <mesh position={[-2, 1.25, -0.85]}>
        <boxGeometry args={[0.12, 0.4, 0.12]} />
        <meshStandardMaterial color="#343f4e" />
      </mesh>

      <mesh position={[-2, 1.04, -0.85]}>
        <boxGeometry args={[0.7, 0.06, 0.38]} />
        <meshStandardMaterial color="#343f4e" />
      </mesh>
    </group>
  );
}

function PCCase() {
  return (
    <group position={[1.35, 1, -0.05]}>
      {/* Нижняя часть корпуса */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[1.55, 0.18, 1.15]} />
        <meshStandardMaterial color="#151b25" metalness={0.55} />
      </mesh>

      {/* Задняя стенка */}
      <mesh position={[0, 0.85, -0.53]}>
        <boxGeometry args={[1.55, 1.3, 0.08]} />
        <meshStandardMaterial color="#303b49" metalness={0.5} />
      </mesh>

      {/* Боковая стенка */}
      <mesh position={[0.74, 0.85, 0]}>
        <boxGeometry args={[0.07, 1.3, 1.1]} />
        <meshStandardMaterial color="#252f3e" metalness={0.5} />
      </mesh>

      {/* Верхняя панель */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.55, 0.08, 1.15]} />
        <meshStandardMaterial color="#202a38" metalness={0.4} />
      </mesh>

      {/* Прозрачная боковая панель */}
      <mesh position={[-0.02, 0.85, 0.56]}>
        <boxGeometry args={[1.45, 1.2, 0.025]} />
        <meshStandardMaterial
          color="#6fa9cb"
          transparent
          opacity={0.18}
          roughness={0.15}
          metalness={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Контур боковой панели */}
      {[
        { p: [0, 0.24, 0.59], s: [1.5, 0.035, 0.035] },
        { p: [0, 1.46, 0.59], s: [1.5, 0.035, 0.035] },
        { p: [-0.73, 0.85, 0.59], s: [0.035, 1.25, 0.035] },
        { p: [0.73, 0.85, 0.59], s: [0.035, 1.25, 0.035] },
      ].map((bar, i) => (
        <mesh key={i} position={bar.p}>
          <boxGeometry args={bar.s} />
          <meshStandardMaterial color="#71869b" metalness={0.6} />
        </mesh>
      ))}

      {/* Пустое место для материнской платы */}
      <mesh position={[-0.2, 0.85, -0.43]}>
        <boxGeometry args={[0.85, 0.95, 0.025]} />
        <meshStandardMaterial color="#273b48" />
      </mesh>

      {/* Слоты расширения */}
      {[-0.35, -0.17, 0.01, 0.19].map((y) => (
        <mesh key={y} position={[0.5, 0.85 + y, -0.35]}>
          <boxGeometry args={[0.23, 0.045, 0.025]} />
          <meshStandardMaterial color="#78889a" />
        </mesh>
      ))}

      {/* Передняя панель с вентиляторами */}
      <mesh position={[0, 0.85, -0.52]}>
        <boxGeometry args={[0.7, 1.05, 0.015]} />
        <meshStandardMaterial color="#1b2634" />
      </mesh>

      {[0.48, 0.85, 1.22].map((y) => (
        <group key={y} position={[0, y, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.025, 32]} />
            <meshStandardMaterial color="#526b83" emissive="#153f61" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Workshop() {
  return (
    <>
      <color attach="background" args={['#101824']} />
      <fog attach="fog" args={['#101824', 12, 25]} />

      <ambientLight intensity={1.1} />

      <directionalLight position={[4, 8, 5]} intensity={2.5} castShadow />

      <pointLight position={[-3, 4, -2]} intensity={35} color="#4daeff" />
      <pointLight position={[2, 3, 3]} intensity={20} color="#ffbc78" />

      <Desk />
      <PCCase />

      <OrbitControls
        makeDefault
        target={[0, 1.1, 0]}
        minDistance={3}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2 - 0.03}
      />
    </>
  );
}

export default function App() {
  return (
    <main className="workshop-page">
      <header className="workshop-header">
        <div>
          <span className="brand-icon">⬡</span>
          <strong>
            PC Builder <span>Lab</span>
          </strong>
        </div>
        <span className="status">3D WORKSHOP · PROTOTYPE</span>
      </header>

      <section className="scene-heading">
        <div>
          <p className="eyebrow">ВИРТУАЛЬНАЯ МАСТЕРСКАЯ</p>
          <h1>Твоя будущая сборка</h1>
          <p>Исследуй рабочее место и подготовься к сборке ПК.</p>
        </div>
      </section>

      <section className="scene-container">
        <Canvas
          shadows
          camera={{
            position: [5, 4.2, 7],
            fov: 45,
          }}
          gl={{ antialias: true }}
        >
          <Workshop />
        </Canvas>

        <div className="scene-hint">
          <span>🖱️</span>
          Вращай сцену мышью · Колесо — приближение
        </div>
      </section>

      <footer className="workshop-footer">
        <span>PC Builder Lab</span>
        <span>Этап 1 · Создание 3D-мастерской</span>
      </footer>
    </main>
  );
}
