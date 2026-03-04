import { Search, LogOut } from 'lucide-react'
interface HeaderProps {
  onLogout: () => void
}

const header       = 'h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6'
const searchBar    = 'flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 w-72'
const searchInput  = 'bg-transparent text-sm text-slate-600 outline-none w-full placeholder:text-slate-400'
const actions      = 'flex items-center gap-1'
const iconButton   = 'p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors'
const logoutButton = 'p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors'

export const Header = ({ onLogout }: HeaderProps) => (
  <header className={header}>
    <div className={searchBar}>
      <Search size={16} className="text-slate-400" />
      <input type="text" placeholder="Search..." className={searchInput} />
    </div>
    <div className={actions}>

      <button className={logoutButton} onClick={onLogout} aria-label="Sair">
        <LogOut size={20} />
      </button>
    </div>
  </header>
)
