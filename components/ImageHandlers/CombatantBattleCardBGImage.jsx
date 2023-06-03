import Image from "next/image";
import styles from "./CombatantBattleCardBGImage.module.css";

export default function CombatantBattleCardBGImage({ customImagePath }) {
	return (
		<Image
			className={styles.battleCardBGImage}
			src={"/static/public/Glyph/Teams/" + customImagePath + ".png"}
			// src={"/../public/Glyph/Teams/" + customImagePath + ".png"}
			alt={customImagePath}
			fill
			style={{ objectFit: "scale-down", objectPosition: "125px 0px" }}
		/>
	);
}
