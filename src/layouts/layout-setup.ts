import { layoutSetup as extendedSidebarLayoutSetup } from "./variants/extended-sidebar-layout/layout-setup";
import { layoutSetup as minimalSidebarLayoutSetup } from "./variants/minimal-sidebar-layout/layout-setup";

export enum LAYOUT_NAMES {
  ExtendedSidebarLayout = "extended-sidebar-layout",
  MinimalSidebarLayout = "minimal-sidebar-layout",
}

export const layoutSetup = {
  [LAYOUT_NAMES.ExtendedSidebarLayout]: extendedSidebarLayoutSetup,
  [LAYOUT_NAMES.MinimalSidebarLayout]: minimalSidebarLayoutSetup,
  undefined: minimalSidebarLayoutSetup,
};
