
# Flukey the Turtle
This is a little game where a turtle has to slowly parse a JSON file and navigate a maze. The JSON file is structured as follows:

### Map
A JSON object describing the maze size, the player's starting position and orientation, the position of mines, and the exit position. For example:

```
{
  "size": {
    "x": 10,
    "y": 7
  },
  "startPos": {
    "x": 0,
    "y": 0,
    "orientation": "e"
  },
  "exitPos": {
    "x": 9,
    "y": 6
  },
  "mines": [
    {
      "x": 2,
      "y": 2
    },
    ...
  ]
}
```

### Moves

A simple array of moves, with "r" denoting a 90deg rotation, and "m" denoting one move forward. E.g:
```
["m", "r"]
```

This was implemented in React and has been done in a minimal sense, so there are certain ways I did things that I would not usually do. For example, this structure of this project does not lend itself well to using compostion, and all CSS is global. In a production environment, the project would generally be more suited for composition, and I would use encapsulated CSS. But, for a project of this size, this approach is fine B-)

This React app reads in some JSON files describing moves and a map, and loads them into a state. This state is then manipulated and built upon via an interval, and when certain conditions are matched, it displays loss/failure. 

## Future work
If I were to continue this app... I would add bounds checking for the turtle and validate the input files. I thought this might be overkill for this small app though.

## Building
Feel free to clone this code and run with the following commands:

```
npm i
npm start
```

Once running, you can edit the JSON files to get cooler and more interesting maps :)

## Interactive demo
But, if you don't feel like going through all that trouble, you can just check out this demo:

https://darajava.github.io/turtle-challenge/