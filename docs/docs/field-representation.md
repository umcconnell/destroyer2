# Field Representation

The battleship "sea" or field is represented as a string with the length 100
(10x10).
The first ten letters/numbers correspond to the first row (A-row).
So for example the letter/number at index 24 (starting at 0) corresponds to C5
(0-9 A-row, 10-19 B-row, 20-29 C-row).

Different "sea"/field states are represented in the following way:

- `0` - Empty field
- `1` - Hit field
- `2` - Miss field
- `A` - Aircraft carrier (size: 5)
- `B` - Battleship (size: 4)
- `C` - Cruiser (size: 3)
- `D` - Submarine (size: 3)
- `E` - Destroyer (size: 2)

A game field is valid if all the ships are placed horizontally or vertically.
Ships may only be in one row or one column and may not have blanks or gaps in
them.

## Example

A valid field like this...

<img :src="$withBase('/screenshots/valid-field.png')" alt="Valid Field">

... would be represented as follows (line breaks added for readability):

```
0200000D00
0BBBB02D00
0000000D00
0000200000
0200100200
0000100000
0000A0000E
CCC0A0000E
0000A20000
0000000000
```
