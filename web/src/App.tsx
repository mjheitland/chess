import { useEffect, useRef, useState } from 'react';
import { Board } from './Board';
import { Settings } from './modals/Settings';
import { initialTheme } from './lib/theme';
import { GameOver } from './modals/GameOver';
import { Promotion } from './modals/Promotion';
import { PromotionPiece } from './lib/types';
import { Modal } from 'bootstrap';

function App() {
	const [theme, setTheme] = useState(initialTheme());
	const [depth, setDepth] = useState(3);
	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-bs-theme', theme);
	}, [theme]);
	const resolvePromise = useRef<((piece: PromotionPiece) => void) | null>(null);

	return (
		<>
			<Settings
				id="settings-modal"
				theme={theme}
				setTheme={setTheme}
				depth={depth}
				setDepth={setDepth}
			/>
			<GameOver id="game-over-modal" />
			<Promotion
				id="promotion-modal"
				onHide={piece => resolvePromise.current?.(piece)}
			/>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col">
						<h1 className="text-center">Chess</h1>
					</div>
				</div>
				<Board
					promote={() => {
						return new Promise(resolve => {
							new Modal(document.getElementById('promotion-modal')!).show();
							resolvePromise.current = resolve;
						});
					}}
					depth={depth}
				/>
			</div>
		</>
	);
}

export default App;
