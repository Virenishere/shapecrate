export * from "./types";

export { auroraGradient, AuroraGradientPreview } from "./elements/gradients/aurora-gradient";
export { radialSpotlight, RadialSpotlightPreview } from "./elements/gradients/radial-spotlight";
export { softGrid, SoftGridPreview } from "./elements/backgrounds/soft-grid";
export { simpleButton, SimpleButtonPreview } from "./elements/buttons/simple-button";
export { popupButton, PopupButtonPreview } from "./elements/buttons/popup-button";

import { auroraGradient } from "./elements/gradients/aurora-gradient";
import { radialSpotlight } from "./elements/gradients/radial-spotlight";
import { softGrid } from "./elements/backgrounds/soft-grid";
import { simpleButton } from "./elements/buttons/simple-button";
import { popupButton } from "./elements/buttons/popup-button";
import type { ComponentItem } from "./types";

export const componentsRegistry: ComponentItem[] = [
  simpleButton,
  popupButton,
  // auroraGradient,
  // radialSpotlight,
  // softGrid,
];
