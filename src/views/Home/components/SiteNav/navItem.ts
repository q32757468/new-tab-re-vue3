import { formatUrlPrefix } from "@/utils";
import hash from "object-hash";

export enum NavItemType {
  custom,
  history,
}

class NavItem {
  name;
  url;
  icon;
  type;
  id;

  constructor(
    name: string,
    url: string,
    icon: string,
    type = NavItemType.custom
  ) {
    this.name = name;
    this.url = formatUrlPrefix(url);
    this.icon = icon;
    this.type = type;
    this.id = hash({
      name,
      url: formatUrlPrefix(url),
    });
  }
}

export default NavItem;
