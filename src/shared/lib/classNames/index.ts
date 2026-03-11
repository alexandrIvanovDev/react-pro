type Mods = Record<string, boolean | string | undefined>;

export const classNames = (
  cls: string,
  additional: Array<string | false | undefined> = [],
  mods: Mods = {},
): string =>
  [
    cls,
    ...Object.keys(mods).filter((key) => mods[key]),
    ...additional.filter(Boolean),
  ].join(' ');
