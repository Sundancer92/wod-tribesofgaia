import Image from "next/image";
import styles from "./CombatantBattleCardBGImage.module.css";

export default function CombatantBattleCardBGImage({ customImagePath }) {
	return (
		<Image
			className={styles.battleCardBGImage}
			src={"/../public/Glyph/Teams/" + customImagePath + ".png"}
			alt={customImagePath}
			fill
			style={{ objectFit: "contain", objectPosition: "right" }}
			// width={40}
			// height={40}
		/>
	);
}
