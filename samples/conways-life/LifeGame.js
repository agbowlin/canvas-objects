/*
global ctk
global ctk.ProcessLoop
*/


//---------------------------------------------------------------------
var Game = null;


//---------------------------------------------------------------------
function GameUpdate()
{
	Game.Update();
	return;
}


//---------------------------------------------------------------------
function LifeGame(CanvasElement, UpdateUI)
{
	this.Loop = new ctk.ProcessLoop(GameUpdate, 100);
	this.GameSpeed = 1.0;
	this.GameStarted = false;
	this.GamePaused = true;

	this.LastGameTime = null;
	this.GameTime = null;
	this.LastRealTime = null;
	this.RealTime = null;
	this.FPS = 0.0;

	this.Display = new ctk.MappedCanvas(CanvasElement, new ctk.AreaMap());
	this.UpdateUI = UpdateUI;

	this.Grid = null;
	this.GridRows = 50;
	this.GridColumns = 50;

	this.GridLineWidth = 1;
	// this.GridLineColor = "#333333";
	this.GridLineColor = "#00334D";

	this.PopulationColor = "#008000";
	this.OutlineColor = "#777700";


	//---------------------------------------------------------------------
	this.ResetGame = function ResetGame()
	{
		this.GameTime = null;
		this.GameStarted = false;
		this.GamePaused = true;
		this.ResetGrid();
		this.Loop.Reset();
		this.Loop.StartProcess();
		// this.Update();
		return;
	};


	//---------------------------------------------------------------------
	this.StartGame = function StartGame()
	{
		this.GameTime = new Date(0);
		this.GameStarted = true;
		this.GamePaused = false;
		return;
	};


	//---------------------------------------------------------------------
	this.PauseGame = function PauseGame()
	{
		this.GamePaused = true;
		return;
	};


	//---------------------------------------------------------------------
	this.ResumeGame = function ResumeGame()
	{
		this.GamePaused = false;
		return;
	};


	//---------------------------------------------------------------------
	this.StopGame = function StopGame()
	{
		this.GamePaused = true;
		this.Loop.StopProcess();
		return;
	};


	//---------------------------------------------------------------------
	this.GameDone = function GameDone()
	{
		return false;
	};


	//---------------------------------------------------------------------
	this.ResetGrid = function ResetGrid()
	{
		this.Grid = this.CreateArray2D(this.GridRows, this.GridColumns, null);

		// // Blinker
		// var row_index = Math.floor(this.GridRows / 2);
		// var col_index = Math.floor(this.GridColumns / 2);
		// for (var index = -1; index <= 1; index++)
		// {
		// 	this.Grid[row_index][col_index + index] = true;
		// }

		// 10 Row
		var row_index = Math.floor(this.GridRows / 2);
		var col_index = Math.floor(this.GridColumns / 2);
		for (var index = -5; index <= 5; index++)
		{
			this.Grid[row_index][col_index + index] = true;
		}

		return;
	};


	//---------------------------------------------------------------------
	this.CreateArray2D = function CreateArray2D(Rows, Columns, Value)
	{
		var grid = [];
		for (var row_index = 0; row_index < Rows; row_index++)
		{
			grid[row_index] = [];
			for (var col_index = 0; col_index < Columns; col_index++)
			{
				grid[row_index][col_index] = Value;
			}
		}
		return grid;
	};


	//---------------------------------------------------------------------
	this.IsPopulated = function IsPopulated(RowIndex, ColumnIndex)
	{
		if (RowIndex < 0) return false;
		if (RowIndex >= this.GridRows) return false;
		if (ColumnIndex < 0) return false;
		if (ColumnIndex >= this.GridColumns) return false;
		if (this.Grid === null) return false;
		if (this.Grid[RowIndex][ColumnIndex] === null) return false;
		return true;
	};


	//---------------------------------------------------------------------
	this.CountNeighbors = function CountNeighbors(RowIndex, ColumnIndex)
	{
		var count = 0;

		if (this.IsPopulated(RowIndex - 1, ColumnIndex - 1)) count++;
		if (this.IsPopulated(RowIndex - 1, ColumnIndex + 0)) count++;
		if (this.IsPopulated(RowIndex - 1, ColumnIndex + 1)) count++;

		if (this.IsPopulated(RowIndex + 0, ColumnIndex - 1)) count++;
		if (this.IsPopulated(RowIndex + 0, ColumnIndex + 1)) count++;

		if (this.IsPopulated(RowIndex + 1, ColumnIndex - 1)) count++;
		if (this.IsPopulated(RowIndex + 1, ColumnIndex + 0)) count++;
		if (this.IsPopulated(RowIndex + 1, ColumnIndex + 1)) count++;

		return count;
	};


	//---------------------------------------------------------------------
	this.GetNextGeneration = function GetNextGeneration()
	{
		var next = this.CreateArray2D(this.GridRows, this.GridColumns, null);
		for (var row_index = 0; row_index < this.GridRows; row_index++)
		{
			for (var col_index = 0; col_index < this.GridColumns; col_index++)
			{
				var count = this.CountNeighbors(row_index, col_index);
				switch (count)
				{
					case 0:
					case 1:
						// Underpopulation, nobody survives.
						break;

					case 2:
						// Always survives.
						if (this.IsPopulated(row_index, col_index))
						{
							next[row_index][col_index] = true;
						}
						break;

					case 3:
						// Always populated.
						next[row_index][col_index] = true;
						break;

					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
						// Overpopulation, nobody survives.
						break;
				}
			}
		}
		return next;
	};


	//---------------------------------------------------------------------
	this.DrawMember = function DrawMember(Row, Col, WithStyle)
	{
		if (this.IsPopulated(Row, Col))
		{
			// Draw the member.
			var x0 = this.Display.Map.MapX(Col);
			var y0 = this.Display.Map.MapY(Row);
			// ctk.FillRectStyle(this.Display.Context, x0 - 9, y0 - 9, 15, 15, WithStyle);
			// ctk.DrawRoundedRectStyle(this.Display.Context, x0 - 9, y0 - 9, 15, 15, 5, WithStyle);
			ctk.DrawCircleStyle(this.Display.Context, x0, y0, 5, WithStyle);
		}
		return;
	};


	//---------------------------------------------------------------------
	this.DrawConnector = function DrawConnector(FromRow, FromCol, ToRow, ToCol, WithStyle)
	{
		if (this.IsPopulated(FromRow, FromCol) && this.IsPopulated(ToRow, ToCol))
		{
			var x0 = Game.Display.Map.MapX(FromCol);
			var y0 = Game.Display.Map.MapY(FromRow);
			var x1 = Game.Display.Map.MapX(ToCol);
			var y1 = Game.Display.Map.MapY(ToRow);
			// ctk.DrawLineStyle(Game.Display.Context, x0, y0, x1, y1, WithStyle);
			ctk.DrawDashedLineStyle(Game.Display.Context, x0, y0, x1, y1, 3, WithStyle);
		}
		return;
	};


	//---------------------------------------------------------------------
	this.Update = function Update()
	{
		// Get the real elapsed time.
		this.RealTime = new Date();
		if (this.LastRealTime === null)
		{
			this.LastRealTime = new Date(this.RealTime.getTime());
		}
		var real_ms = this.RealTime - this.LastRealTime;
		this.FPS = (1000 / real_ms);
		this.LastRealTime = new Date(this.RealTime.getTime());

		if (this.GameStarted === true)
		{
			if (this.GamePaused === false)
			{
				// Get the game elapsed time.
				var game_ms = (real_ms * this.GameSpeed);
				var new_time_ms = (this.GameTime.getTime() + game_ms);
				this.GameTime.setTime(new_time_ms);
				//console.log( this.GameSpeed + ' | ' + real_ms + ' | ' + game_ms + ' | ' + new_time_ms + ' | ' + this.GameTime.toLocaleTimeString() );
				if (this.LastGameTime === null)
				{
					this.LastGameTime = new Date(this.GameTime.getTime());
				}
				if (this.LastGameTime.getSeconds() !== this.GameTime.getSeconds())
				{
					this.Grid = this.GetNextGeneration();
					this.LastGameTime = new Date(this.GameTime.getTime());
				}
			}
		}

		// Update the canvas map.
		this.Display.Map.SourceArea.CoordinateSystem = 'cartesian';
		this.Display.Map.SourceArea.x0 = 0;
		this.Display.Map.SourceArea.x1 = this.GridRows;
		this.Display.Map.SourceArea.y0 = 0;
		this.Display.Map.SourceArea.y1 = this.GridColumns;

		this.Display.Map.TargetArea.CoordinateSystem = 'screen';
		this.Display.Map.TargetArea.x0 = 0;
		this.Display.Map.TargetArea.x1 = this.Display.Canvas.width;
		this.Display.Map.TargetArea.y0 = 0;
		this.Display.Map.TargetArea.y1 = this.Display.Canvas.height;

		// Clear the background.
		var chart_rect = new ctk.Rect(0, 0, this.Display.Canvas.width, this.Display.Canvas.height);
		ctk.ClearRect(this.Display.Context, chart_rect.x, chart_rect.y, chart_rect.w, chart_rect.h);

		// Draw the grid.
		var grid_line_style = new ctk.Style();
		grid_line_style.LineWidth = this.GridLineWidth;
		// grid_line_style.FillStyle = this.GridLineColor;
		grid_line_style.StrokeStyle = this.GridLineColor;
		for (var row_index = 0; row_index < this.GridRows; row_index++)
		{
			var x0 = this.Display.Map.TargetArea.x0;
			var x1 = this.Display.Map.TargetArea.x1;
			var y0 = this.Display.Map.MapY(row_index);
			var y1 = y0;
			ctk.DrawLineStyle(this.Display.Context, x0, y0, x1, y1, grid_line_style);
		}
		for (var col_index = 0; col_index < this.GridColumns; col_index++)
		{
			var x0 = this.Display.Map.MapX(col_index);
			var x1 = x0;
			var y0 = this.Display.Map.TargetArea.y0;
			var y1 = this.Display.Map.TargetArea.y1;
			ctk.DrawLineStyle(this.Display.Context, x0, y0, x1, y1, grid_line_style);
		}

		// Draw the grid border.
		ctk.DrawRectStyle(this.Display.Context, this.Display.Map.TargetArea.x0, this.Display.Map.TargetArea.y0, this.Display.Map.TargetArea.width() - 1, this.Display.Map.TargetArea.height(), grid_line_style);

		// Draw the population.
		var population_count = 0;
		var population_style = new ctk.Style();
		population_style.LineWidth = 1;
		population_style.FillStyle = this.PopulationColor;
		// population_style.StrokeStyle = this.PopulationColor;
		population_style.StrokeStyle = this.OutlineColor;

		// for (var row_index = 0; row_index < this.GridRows; row_index++)
		// {
		// 	for (var col_index = 0; col_index < this.GridColumns; col_index++)
		// 	{
		// 		if (this.IsPopulated(row_index, col_index))
		// 		{
		// 			// Draw the connecting lines.
		// 			this.DrawConnector(row_index, col_index, row_index - 1, col_index - 1, population_style);
		// 			this.DrawConnector(row_index, col_index, row_index - 1, col_index + 0, population_style);
		// 			this.DrawConnector(row_index, col_index, row_index - 1, col_index + 1, population_style);
		// 			this.DrawConnector(row_index, col_index, row_index + 0, col_index - 1, population_style);
		// 			this.DrawConnector(row_index, col_index, row_index + 0, col_index + 1, population_style);
		// 			this.DrawConnector(row_index, col_index, row_index + 1, col_index - 1, population_style);
		// 			this.DrawConnector(row_index, col_index, row_index + 1, col_index + 0, population_style);
		// 			this.DrawConnector(row_index, col_index, row_index + 1, col_index + 1, population_style);
		// 		}
		// 	}
		// }

		for (var row_index = 0; row_index < this.GridRows; row_index++)
		{
			for (var col_index = 0; col_index < this.GridColumns; col_index++)
			{
				if (this.IsPopulated(row_index, col_index))
				{
					// Draw the member.
					this.DrawMember(row_index, col_index, population_style);
					population_count++;
				}
			}
		}

		// Update the page.
		if (population_count === 0)
		{
			this.PauseGame();
		}
		if (this.UpdateUI)
		{
			this.UpdateUI();
		}

		return;
	};


	return;
}
