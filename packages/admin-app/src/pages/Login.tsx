import { useState } from 'react';

export default function Login() {
	const [apiUrl, setApiUrl] = useState('');
	const [token, setToken] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement login logic
		console.log('Login:', { apiUrl, token });
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center">Fetch Book Admin</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">API URL</label>
						<input
							type="text"
							value={apiUrl}
							onChange={(e) => setApiUrl(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="http://localhost:3000"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Token</label>
						<input
							type="password"
							value={token}
							onChange={(e) => setToken(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your token"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
