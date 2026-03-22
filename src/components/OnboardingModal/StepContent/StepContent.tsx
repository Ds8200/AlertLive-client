import styles from './StepContent.module.scss';

interface StepContentProps {
  icon: string;
  title: string;
  description: string;
}

export const StepContent = ({ icon, title, description }: StepContentProps) => (
  <>
    <div className={styles.stepIcon}>{icon}</div>
    <div className={styles.body}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  </>
);
