machine-code
============

Machine code parser for a Turing machine.

Language Specification
----------------------

Below is the language specification for Turing machine code.

```peg
program = statement*

statement = current:state ',' read:symbol ',' next:state ',' write:symbol ',' direction ';' newline?

state = 's' digit+

digit = [0-9]

symbol = [a-zA-Z0-9_]

direction = 'L' / 'R'

newline = '\n'
```
