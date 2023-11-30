# AdventOfCode2023
Advent of code 2023

Folders are organized by day.

Within each day is a bundle of scripts / node modules, notably a script named `solution.js` and a text file named `input.txt`. Within each day's solution module, `runPart1` is the method for solving part 1 of the day, and `runPart2` is the method for solving part 2 of the day. Solution modules may also define a `parseInput` method. If this method is defined, input from the `input.txt` file will be automatically run through that method before being passed to the solvers.

To run a given solution, from the top-level folder, run `npm run solution [X]`. Where `X` is one of the advent days. If a single number is specified, (e.g. `npm run solution 12`), both parts of the solution will be run and their output will be put in the console. Alternatively, you can run a single part of the solution, by specifying `1` or `2` after a dash (e.g. `npm run solution 7-1` or `npm run solution 20-2`).

To run all tests I've written, you can run `npm run test`. You can also specify tests to run for a certain day by including that as an argument (e.g. `npm run test 5`)

To scaffold out folders and files for each day at the start of a new year, you can run `npm run scaffold`. This creates folders `01` - `25` and copies the solution and input templates into each folder.
