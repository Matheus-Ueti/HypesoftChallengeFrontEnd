import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Tag, type LucideIcon } from 'lucide-react'

interface NavItem {
  icon: LucideIcon
  label: string
  to: string
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard',  to: '/' },
  { icon: Package,         label: 'Produtos',   to: '/products' },
  { icon: Tag,             label: 'Categorias', to: '/categories' },
]

const navBase   = 'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors'
const sidebar   = 'w-60 h-screen bg-white border-r border-slate-100 flex flex-col p-4'
const brand     = 'flex items-center gap-2 px-2 mb-8'
const brandIcon = 'w-8 h-8 bg-indigo-600 rounded-lg'
const brandName = 'text-lg font-bold text-slate-800'
const nav       = 'flex flex-col gap-1'
const navLink   = `${navBase} text-slate-500 hover:bg-slate-50 hover:text-slate-800`
const navActive = `${navBase} bg-indigo-50 text-indigo-600`

export const Sidebar = () => (
  <aside className={sidebar}>

    <div className={brand}>
      <div className={brandIcon} />
      <span className={brandName}>ShopSense</span>
    </div>

    <nav className={nav}>
      {NAV_ITEMS.map(({ icon: Icon, label, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => isActive ? navActive : navLink}
        >
          <Icon size={18} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>

  </aside>
)