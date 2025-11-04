import Topbar from './components/Topbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import MainContent from './components/MainContent.jsx'
import PreviewToolbar from './components/PreviewToolbar.jsx'

export default function App() {
    return (
        <div className="min-h-dvh bg-[#1D202A] text-zinc-200">
            <PreviewToolbar />
            <div className="mx-5 border border-white/10 rounded-2xl">
                <Topbar />
                <div className="mx-auto flex">
                    <Sidebar />
                    <MainContent />
                </div>
            </div>
        </div>
    )
}