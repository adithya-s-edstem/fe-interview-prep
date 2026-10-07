import { NavLink, Outlet, ScrollRestoration } from 'react-router';
import styles from './Layout.module.css';
import { questionPages } from './questionPages';

export function Layout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <nav aria-label="Questions">
          <ul className={styles.links}>
            {questionPages.map(({ path, title }) => (
              <li key={path}>
                <NavLink to={path} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
