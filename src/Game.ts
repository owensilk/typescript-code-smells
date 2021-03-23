export class Game {
    private _lastSymbol: string = ' ';
    private _board: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.isValidPlay(symbol, x, y)

        // update game state
        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    private isValidPlay(symbol: string, x: number, y: number) {
        //if first move
        if (this._lastSymbol == ' ') {
            //if player is X
            if (symbol == 'O') {
                throw new Error("Invalid first player");
            }
        }
        //if not first move but player repeated
        else if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }
        //if not first move but play on an already played tile
        else if (this._board.TileAt(x, y).Symbol != ' ') {
            throw new Error("Invalid position");
        }
    }

    private spaceTaken(x: number, y: number): boolean {
        return this._board.TileAt(x, y)!.Symbol != ' '
    }

    public Winner(): string {
        //if the positions in first row are taken
        if (this.spaceTaken(0, 0) &&
            this.spaceTaken(0, 1) &&
            this.spaceTaken(0, 2)) {
            //if first row is full with same symbol
            if (this._board.TileAt(0, 0)!.Symbol ==
                this._board.TileAt(0, 1)!.Symbol &&
                this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol) {
                return this._board.TileAt(0, 0)!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this.spaceTaken(1, 0) &&
            this.spaceTaken(1, 1) &&
            this.spaceTaken(1, 2)) {
            //if middle row is full with same symbol
            if (this._board.TileAt(1, 0)!.Symbol ==
                this._board.TileAt(1, 1)!.Symbol &&
                this._board.TileAt(1, 2)!.Symbol ==
                this._board.TileAt(1, 1)!.Symbol) {
                return this._board.TileAt(1, 0)!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this.spaceTaken(2, 0) &&
            this.spaceTaken(2, 1) &&
            this.spaceTaken(2, 2)) {
            //if middle row is full with same symbol
            if (this._board.TileAt(2, 0)!.Symbol ==
                this._board.TileAt(2, 1)!.Symbol &&
                this._board.TileAt(2, 2)!.Symbol ==
                this._board.TileAt(2, 1)!.Symbol) {
                return this._board.TileAt(2, 0)!.Symbol;
            }
        }

        return ' ';
    }
}

interface Tile {
    X: number;
    Y: number;
    Symbol: string;
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = { X: i, Y: j, Symbol: " " };
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}
