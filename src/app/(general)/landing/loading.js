import styles from "./landing.module.scss";
import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Loader color="yellow" size="xl" cl classNames={{ root: styles.loading }} />
  );
}
