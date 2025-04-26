import { ThemeProvider } from '../../context/ThemeContext'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default Layout
