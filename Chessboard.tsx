//importing all assets needed
import React, { useRef } from 'react';
import './Chessboard.css';
import Tile from './Tile/Tile'

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8" ]
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h", ]



interface Piece
{
    image:string
    x:number
    y:number
}

const pieces: Piece[] = [];

//adding the pieces to the board
for(let p = 0; p < 2; p++){
    const type = (p === 0) ? "b" : "w";
    const y = (p === 0) ?7 : 0;

    pieces.push({image: `assets/images/rook_${type}.png`, x:0, y})
    pieces.push({image: `assets/images/rook_${type}.png`, x:7, y})
    pieces.push({image: `assets/images/knight_${type}.png`, x:1, y})
    pieces.push({image: `assets/images/knight_${type}.png`, x:6, y})
    pieces.push({image: `assets/images/bishop_${type}.png`, x:2, y})
    pieces.push({image: `assets/images/bishop_${type}.png`, x:5, y})
    pieces.push({image: `assets/images/queen_${type}.png`, x:3, y})
    pieces.push({image: `assets/images/king_${type}.png`, x:4, y})
}
//adding the pawns to the board with "for loop"
for(let i = 0; i < 8; i++){
pieces.push({image: "assets/images/pawn_b.png", x:i, y:6})
}

for(let i = 0; i < 8; i++){
    pieces.push({image: "assets/images/pawn_w.png", x:i, y:1})
    }


//default function chessboard
export default function Chessboard()
{
    const chessboardRef = useRef<HTMLDivElement>(null);

    //implimenting active piece for the movement
    let activePiece: HTMLElement | null = null;

    //"grabbing" the piece
    function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement
    if(element.classList.contains("chess-piece"))
    {
    const x = e.clientX -50
    const y = e.clientY -50

    element.style.position = "absolute";
    element.style.left = `${x}px` ;
    element.style.top = `${y}px`;

    activePiece = element;
    }
}

    //allowing the piece to move
    function movePiece(e: React.MouseEvent)
    {   
        const chessboard = chessboardRef.current;
    if (activePiece && chessboard)
    {
        const minX = chessboard.style.left
        const minY = chessboard.style.top
        const x = e.clientX -50
        const y = e.clientY -50

        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px` ;
        activePiece.style.top = `${y}px`;
    }

    }

    //dropping the piece when the mouse is released
    function dropPiece(e: React.MouseEvent){
    if(activePiece)
    {
        activePiece = null
    }
    }

    //Board and Chess pieces
    let board = [];
    for(let j = verticalAxis.length-1; j >= 0; j--){
        for(let i = 0; i < horizontalAxis.length; i++){
            const number = j + i + 2

            let image = undefined;

            pieces.forEach(p =>{

                if(p.x === i && p.y === j)
                {
                    image = p.image;
                }

            });

            board.push(<Tile key ={`${j},${i}`} image={image} number={j + i + 2}/>)

        }
    }

    //adding the functions for the movement of pieces
    return <div 
    onMouseMove={(e) => movePiece(e)}
    onMouseDown={e => grabPiece (e)}
    onMouseUp={(e) => dropPiece (e)}
    id="chessboard"
    ref={chessboardRef}
    >{board}</div>

}
