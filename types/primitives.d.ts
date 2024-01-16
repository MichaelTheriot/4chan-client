export type Integer = number; // approximation

export type Tripcode = `!${string}` | `!!${string}`;

type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
type ZeroPrefixableInt = `0${bigint}` | `${bigint}`;
type DateNoSeconds = `${ZeroPrefixableInt}/${ZeroPrefixableInt}/${ZeroPrefixableInt}(${Day})${ZeroPrefixableInt}:${ZeroPrefixableInt}`;
export type DateString = DateNoSeconds | `${DateNoSeconds}:${ZeroPrefixableInt}`; // approximation

export type Id = string; // approximation

export type Capcode = 'mod' | 'admin' | 'admin_highlight' | 'manager' | 'developer' | 'founder';

type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
export type CountryCode = `${Letter}${Letter}`;

export type FileExtension = `.${string}`; // approximation

export type Md5 = `${string}` | `${string}=` | `${string}==`; // approximation

export type Since4Pass = `${bigint}`; // approximation
