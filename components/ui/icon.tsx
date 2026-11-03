import type { CSSProperties, ReactNode } from "react";

export type MaterialSymbolName =
  | "arrow_forward"
  | "arrow_outward"
  | "trophy"
  | "event"
  | "mic"
  | "menu"
  | "close"
  | "dark_mode"
  | "light_mode"
  | "mail"
  | "check"
  | "content_copy"
  | "location_on"
  | "play_arrow"
  | "podcasts"
  | "movie"
  | "groups"
  | "menu_book"
  | "assignment"
  | "handshake"
  | "account_balance"
  | "lightbulb"
  | "campaign"
  | "inventory_2"
  | "rss_feed"
  | "visibility"
  | "visibility_off";

type IconProps = {
  name: MaterialSymbolName;
  className?: string;
  fill?: boolean;
  weight?: number;
  ariaHidden?: boolean;
  style?: CSSProperties;
};

export function Icon({
  name,
  className,
  fill = false,
  weight = 400,
  ariaHidden = true,
  style,
}: IconProps): ReactNode {
  return (
    <span
      aria-hidden={ariaHidden ? "true" : undefined}
      className={`material-symbols-rounded ${className ?? ""}`}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
