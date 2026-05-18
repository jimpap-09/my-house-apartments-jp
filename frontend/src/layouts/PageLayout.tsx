import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Outlet } from 'react-router-dom'

export function PageLayout() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <main className="page-main">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}
