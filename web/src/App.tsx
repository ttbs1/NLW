import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import Ads from './screens/Ads';
import Games from './screens/Games';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Games />} />
                <Route path="games/:id/ads" element={<Ads />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App