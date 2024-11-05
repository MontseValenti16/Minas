import { Component, OnInit } from '@angular/core';
import { Celda } from '../../models/celda.module';

@Component({
  selector: 'app-minas',
  templateUrl: './minas.component.html',
  styleUrls: ['./minas.component.css']
})
export class MinasComponent implements OnInit {
  grid: Celda[][] = [];
  gridSize = 10;
  mineCount = 10;
  gameOver = false;

  ngOnInit(): void {
    this.initializeGrid();
    this.placeMines();
    this.calculateAdjacentMines();
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({
        isMina: false,
        isEncontrado: false,
        MinasAdyacentes: 0,
        isMarcado: false
      }))
    );
  }

  placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.mineCount) {
      const row = Math.floor(Math.random() * this.gridSize);
      const col = Math.floor(Math.random() * this.gridSize);
      if (!this.grid[row][col].isMina) {
        this.grid[row][col].isMina = true;
        minesPlaced++;
      }
    }
  }

  calculateAdjacentMines(): void {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (!this.grid[row][col].isMina) {
          this.grid[row][col].MinasAdyacentes = this.countMinesAround(row, col);
        }
      }
    }
  }

  countMinesAround(row: number, col: number): number {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return directions.reduce((count, [dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 && newRow < this.gridSize &&
        newCol >= 0 && newCol < this.gridSize &&
        this.grid[newRow][newCol].isMina
      ) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  revealCell(row: number, col: number): void {
    if (this.grid[row][col].isEncontrado || this.gameOver || this.grid[row][col].isMarcado) return;

    this.grid[row][col].isEncontrado = true;

    if (this.grid[row][col].isMina) {
      this.gameOver = true;
      return;
    }

    if (this.grid[row][col].MinasAdyacentes === 0) {
      this.revealAdjacentCells(row, col);
    }
  }

  revealAdjacentCells(row: number, col: number): void {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 && newRow < this.gridSize &&
        newCol >= 0 && newCol < this.gridSize &&
        !this.grid[newRow][newCol].isEncontrado
      ) {
        this.revealCell(newRow, newCol);
      }
    }
  }

  toggleFlag(row: number, col: number): void {
    if (!this.grid[row][col].isEncontrado) {
      this.grid[row][col].isMarcado = !this.grid[row][col].isMarcado;
    }
  }
}
