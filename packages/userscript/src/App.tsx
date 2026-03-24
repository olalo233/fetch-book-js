import React, { useState, useRef, useEffect } from 'react';

function useDraggable() {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const startPosRef = useRef({ x: 0, y: 0 });

	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);
		startPosRef.current = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		};
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			setPosition({
				x: e.clientX - startPosRef.current.x,
				y: e.clientY - startPosRef.current.y,
			});
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging]);

	return { position, handleMouseDown, isDragging };
}

export default function App() {
	const { position, handleMouseDown } = useDraggable();
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div
			style={{
				position: 'fixed',
				top: position.y || 100,
				left: position.x || 100,
				zIndex: 9999,
				background: 'white',
				border: '1px solid #ccc',
				borderRadius: '8px',
				boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
				minWidth: 300,
			}}
		>
			<div
				style={{
					padding: '8px 12px',
					background: '#f0f0f0',
					borderBottom: '1px solid #ccc',
					borderRadius: '8px 8px 0 0',
					cursor: 'move',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				onMouseDown={handleMouseDown}
			>
				<span style={{ fontWeight: 'bold' }}>Fetch Book</span>
				<button
					style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px' }}
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					{isCollapsed ? '+' : '−'}
				</button>
			</div>
			{!isCollapsed && (
				<div style={{ padding: 12 }}>
					<div style={{ marginBottom: 12 }}>
						<button style={{ marginRight: 8, padding: '6px 12px' }}>抓取小说主页</button>
						<button style={{ padding: '6px 12px' }}>抓取当前章节</button>
					</div>
					<div style={{ marginBottom: 8 }}>
						<input type="text" placeholder="API URL" style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
					</div>
					<div style={{ marginBottom: 8 }}>
						<input type="password" placeholder="Token" style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
					</div>
					<button style={{ width: '100%', padding: '6px 12px' }}>登录</button>
				</div>
			)}
		</div>
	);
}
