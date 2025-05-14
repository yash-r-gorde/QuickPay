import { lazy } from 'react';
const Signup = lazy(() => import('./pages/Signup'));
const Signin = lazy(() => import('./pages/Signin'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SendMoney = lazy(() => import('./pages/SendMoney'));
const MeRedirect = lazy(() => import('./pages/MeRedirect'));
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'))

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense } from "react"

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={'/'} element={<Suspense fallback={'loading..'}><MeRedirect /></Suspense>} />
					<Route path={'/signup'} element={<Suspense fallback={'loading..'}><Signup /></Suspense>} />
					<Route path={'/signin'} element={<Suspense fallback={'loading..'}><Signin /></Suspense>} />

					<Route path="/dashboard" element={
						<ProtectedRoute>
							<Suspense fallback={'loading...'}><Dashboard /></Suspense>
						</ProtectedRoute>
					} />

					<Route path="/sendmoney" element={
						<ProtectedRoute>
							<Suspense fallback={'loading...'}><SendMoney /></Suspense>
						</ProtectedRoute>
					} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
