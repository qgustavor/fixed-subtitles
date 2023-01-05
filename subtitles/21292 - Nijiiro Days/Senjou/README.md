---
language: en-us
---

- Fixes a wrong honorific in episode 2: he says "さあ", not "さん".
- Fixes typos in episodes 3, 8, 11, 13, 16 and 22.
- Fixes inconsistent name order (change everything to Eastern order).
- Translate missing sign translation in episode 9.
- Remove positioning that used to account for messages shown in the HDTV version and aren't shown in the BD.

The below changes were partially automated and, because of that, they changed a lot of lines (around 2200 lines):

- Translate missing songs using [Douki](https://github.com/qgustavor/douki/) for timing and [subtitle-tools](https://github.com/qgustavor/subtitle-tools) for merging.
- Attempt improving timing by snapping times to keyframes using a custom script.
