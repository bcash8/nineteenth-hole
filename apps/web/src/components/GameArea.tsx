import { EagleMountain } from "@repo/shared/maps/EagleMountain";
import { GolfMapCanvas } from "./GolfMapCanvas";
import { squareMap } from "@repo/shared/maps/square";
import { testMap } from "@repo/shared/maps/test";
export function GameArea() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GolfMapCanvas map={EagleMountain} />
    </div>
  );
}
