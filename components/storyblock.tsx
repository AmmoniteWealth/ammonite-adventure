import styles from "./storyblock.module.css";

interface StoryblockProps {
  children: React.ReactNode;
}

export default function Storyblock({ children }: StoryblockProps) {
  return <div className={styles.text}>{children}</div>;
}
