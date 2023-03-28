import styles from "./header.module.css";

interface HeaderProps {
  title: string;
  zoom?: boolean;
}

export default function Header({ title, zoom }: HeaderProps): JSX.Element {
  return (
    <>
      <h1 className={`${styles.title} ${zoom ? styles.zoom : ""}`}>{title}</h1>
    </>
  );
}
