import { ReactNode } from "react";
import styles from '@/app/(beforeLogin)/_component/main.module.css';

type Props = { children: ReactNode, modal: ReactNode };
function Layout({ children, modal }: any) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  )
}

export default Layout;