var ctk = {};


//=====================================================================
//=====================================================================
//
//		Area
//
//=====================================================================
//=====================================================================


ctk.Area = function()
{
	this.CoordinateSystem = 'screen'; // 'cartesian' or 'screen'
	this.x0 = 0;
	this.y0 = 0;
	this.x1 = 0;
	this.y1 = 0;
	this.width = function()
	{
		return ((this.x1 - this.x0) + 1);
	};
	this.height = function()
	{
		return ((this.y1 - this.y0) + 1);
	};
	return;
};


//=====================================================================
//=====================================================================
//
//		AreaMap
//
//=====================================================================
//=====================================================================


ctk.AreaMap = function()
{
	this.SourceArea = new ctk.Area();
	this.TargetArea = new ctk.Area();

	//---------------------------------------------------------------------
	this.MapX = function(X)
	{
		X = (X - this.SourceArea.x0) / (this.SourceArea.x1 - this.SourceArea.x0);
		X = (this.TargetArea.x0 + (X * (this.TargetArea.x1 - this.TargetArea.x0)));
		return X;
	};

	//---------------------------------------------------------------------
	this.MapY = function(Y)
	{
		Y = (Y - this.SourceArea.y0) / (this.SourceArea.y1 - this.SourceArea.y0);
		if (this.SourceArea.CoordinateSystem !== this.TargetArea.CoordinateSystem)
		{
			Y = 1 - Y;
		}
		Y = (this.TargetArea.y0 + (Y * (this.TargetArea.y1 - this.TargetArea.y0)));
		return Y;
	};

	//---------------------------------------------------------------------
	this.UnmapX = function(X)
	{
		X = (X - this.TargetArea.x0) / (this.TargetArea.x1 - this.TargetArea.x0);
		X = (this.SourceArea.x0 + (X * (this.SourceArea.x1 - this.SourceArea.x0)));
		return X;
	};

	//---------------------------------------------------------------------
	this.UnmapY = function(Y)
	{
		Y = (Y - this.TargetArea.y0) / (this.TargetArea.y1 - this.TargetArea.y0);
		if (this.SourceArea.CoordinateSystem !== this.TargetArea.CoordinateSystem)
		{
			Y = 1 - Y;
		}
		Y = (this.SourceArea.y0 + (Y * (this.SourceArea.y1 - this.SourceArea.y0)));
		return Y;
	};

};



//=====================================================================
//=====================================================================
//    ______     ___      .__   __. ____    ____  ___           _______.
//   /      |   /   \     |  \ |  | \   \  /   / /   \         /       |
//  |  ,----'  /  ^  \    |   \|  |  \   \/   / /  ^  \       |   (----`
//  |  |      /  /_\  \   |  . `  |   \      / /  /_\  \       \   \    
//  |  `----./  _____  \  |  |\   |    \    / /  _____  \  .----)   |   
//   \______/__/     \__\ |__| \__|     \__/ /__/     \__\ |_______/    
//                                                                      
//=====================================================================
//=====================================================================


ctk.Canvas = function Canvas()
{
	this.Canvas = null;
	this.Context = null;

	this.ClearRect = function ClearRect(x, y, width, height)
	{
		return this.Context.clearRect(x, y, width, height);
	};
	this.FillRect = function FillRect(x, y, width, height)
	{
		return this.Context.fillRect(x, y, width, height);
	};
	this.StrokeRect = function StrokeRect(x, y, width, height)
	{
		return this.Context.strokeRect(x, y, width, height);
	};

	this.FillText = function FillText(text, x, y, maxwidth)
	{
		return this.Context.fillText(text, x, y, maxwidth);
	};
	this.StrokeText = function StrokeText(text, x, y, maxwidth)
	{
		return this.Context.strokeText(text, x, y, maxwidth);
	};
	this.MeasureText = function MeasureText(text)
	{
		return this.Context.measureText(text);
	};

	this.BeginPath = function BeginPath()
	{
		return this.Context.beginPath();
	};
	this.ClosePath = function ClosePath()
	{
		return this.Context.closePath();
	};

	this.MoveTo = function MoveTo(x, y)
	{
		return this.Context.moveTo(x, y);
	};
	this.LineTo = function LineTo(x, y)
	{
		return this.Context.lineTo(x, y);
	};
	this.BezierCurveTo = function BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
	{
		return this.Context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
	};
	this.QuadraticCurveTo = function QuadraticCurveTo(cpx, cpy, x, y)
	{
		return this.Context.quadraticCurveTo(cpx, cpy, x, y);
	};
	this.Arc = function Arc(x, y, radius, startAngle, endAngle, anticlockwise)
	{
		return this.Context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	};
	this.ArcTo = function ArcTo(x1, y1, x2, y2, radius)
	{
		return this.Context.arcTo(x1, y1, x2, y2, radius);
	};
	this.Rect = function Rect(x, y, width, height)
	{
		return this.Context.rect(x, y, width, height);
	};

	this.Fill = function Fill()
	{
		return this.Context.fill();
	};
	this.Stroke = function Stroke()
	{
		return this.Context.stroke();
	};
	this.Clip = function Clip()
	{
		return this.Context.clip();
	};

	this.IsPointInPath = function IsPointInPath(x, y)
	{
		return this.Context.isPointInPath(x, y);
	};
	this.IsPointInStroke = function IsPointInStroke(x, y)
	{
		return this.Context.isPointInStroke(x, y);
	};

	this.DrawImage = function DrawImage(image, dx, dy)
	{
		return this.Context.drawImage(image, dx, dy);
	};
	this.DrawImage = function DrawImage(image, dx, dy, dWidth, dHeight)
	{
		return this.Context.drawImage(image, dx, dy, dWidth, dHeight);
	};
	this.DrawImage = function DrawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	{
		return this.Context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	};

	return this;
};


//=====================================================================
ctk.OffScreenCanvas = function OffScreenCanvas(W, H)
{
	this.Canvas = document.createElement('canvas');
	this.Canvas.width = W || 100;
	this.Canvas.height = H || 100;
	this.Context = this.Canvas.getContext('2d');
	return this;
};

ctk.OffScreenCanvas.prototype = new ctk.Canvas;


//=====================================================================
//=====================================================================
//
//		MappedCanvas
//
//=====================================================================
//=====================================================================


ctk.MappedCanvas = function MappedCanvas(ThisCanvas, ThisMap)
{
	this.Canvas = ThisCanvas;
	this.Context = this.Canvas.getContext('2d');
	this.Map = ThisMap;
	return this;
};

ctk.MappedCanvas.prototype = new ctk.Canvas;


//=====================================================================
//=====================================================================
//
//		ProcessLoop
//
//=====================================================================
//=====================================================================


ctk.ProcessLoop = function(Process, IntervalMS)
{
	this.Process = Process;
	this.IntervalMS = IntervalMS;
	this.IntervalID = null;


	//---------------------------------------------------------------------
	this.Reset = function()
	{
		this.StopProcess();
		return;
	};


	//---------------------------------------------------------------------
	this.StartProcess = function()
	{
		if (this.IntervalID === null)
		{
			this.IntervalID = setInterval(this.Process, this.IntervalMS);
		}
		return;
	};


	//---------------------------------------------------------------------
	this.StopProcess = function()
	{
		if (this.IntervalID !== null)
		{
			clearInterval(this.IntervalID);
			this.IntervalID = null;
		}
		return;
	};

}


//=====================================================================
//=====================================================================
//  .______     ______    __  .__   __. .___________.
//  |   _  \   /  __  \  |  | |  \ |  | |           |
//  |  |_)  | |  |  |  | |  | |   \|  | `---|  |----`
//  |   ___/  |  |  |  | |  | |  . `  |     |  |     
//  |  |      |  `--'  | |  | |  |\   |     |  |     
//  | _|       \______/  |__| |__| \__|     |__|     
//                                                   
//=====================================================================
//=====================================================================


ctk.Point = function Point(X, Y)
{
	this.x = X || null;
	this.y = Y || null;
	return;
};


//=====================================================================
//=====================================================================
//   __       __  .__   __.  _______     _______.
//  |  |     |  | |  \ |  | |   ____|   /       |
//  |  |     |  | |   \|  | |  |__     |   (----`
//  |  |     |  | |  . `  | |   __|     \   \    
//  |  `----.|  | |  |\   | |  |____.----)   |   
//  |_______||__| |__| \__| |_______|_______/    
//                                               
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
ctk.DrawLine = function DrawLine(Context, X1, Y1, X2, Y2)
{
	Context.beginPath();
	Context.moveTo(X1, Y1);
	Context.lineTo(X2, Y2);
	Context.closePath();
	Context.stroke();
	return;
};


//---------------------------------------------------------------------
ctk.DrawLineStyle = function DrawLineStyle(Context, X1, Y1, X2, Y2, Style)
{
	Context.save();
	Style.MergeToContext(Context);
	ctk.DrawLine(Context, X1, Y1, X2, Y2);
	Context.restore();
	return;
};


//---------------------------------------------------------------------
ctk.DrawDashedLine = function DrawDashedLine(Context, X1, Y1, X2, Y2, DashLength)
{
	//From: http://stackoverflow.com/questions/15397036/drawing-dashed-lines-on-html5-canvas

	if (DashLength == undefined)
	{
		DashLength = 2;
	}

	Context.beginPath();
	Context.moveTo(X1, Y1);

	var dX = X2 - X1;
	var dY = Y2 - Y1;
	var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / DashLength);
	var dashX = dX / dashes;
	var dashY = dY / dashes;

	var q = 0;
	while (q++ < dashes)
	{
		X1 += dashX;
		Y1 += dashY;
		Context[q % 2 == 0 ? 'moveTo' : 'lineTo'](X1, Y1);
	}
	Context[q % 2 == 0 ? 'moveTo' : 'lineTo'](X2, Y2);

	Context.closePath();
	Context.stroke();
	return;
};


//---------------------------------------------------------------------
ctk.DrawDashedLineStyle = function DrawDashedLineStyle(Context, X1, Y1, X2, Y2, DashLength, Style)
{
	Context.save();
	Style.MergeToContext(Context);
	ctk.DrawDashedLine(Context, X1, Y1, X2, Y2, DashLength);
	Context.restore();
	return;
};


//=====================================================================
//=====================================================================
//  .______       _______   ______ .___________.    _______.
//  |   _  \     |   ____| /      ||           |   /       |
//  |  |_)  |    |  |__   |  ,----'`---|  |----`  |   (----`
//  |      /     |   __|  |  |         |  |        \   \    
//  |  |\  \----.|  |____ |  `----.    |  |    .----)   |   
//  | _| `._____||_______| \______|    |__|    |_______/    
//                                                          
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
ctk.ClearRect = function ClearRect(Context, X, Y, W, H)
{
	Context.clearRect(X, Y, W, H);
	return;
};


//---------------------------------------------------------------------
ctk.DrawRect = function DrawRect(Context, X, Y, W, H)
{
	Context.strokeRect(X, Y, W, H);
	return;
};


//---------------------------------------------------------------------
ctk.DrawRectStyle = function DrawRectStyle(Context, X, Y, W, H, Style)
{
	Context.save();
	Style.MergeToContext(Context);
	ctk.DrawRect(Context, X, Y, W, H);
	Context.restore();
	return;
};


//---------------------------------------------------------------------
ctk.FillRect = function FillRect(Context, X, Y, W, H)
{
	Context.fillRect(X, Y, W, H);
	return;
};


//---------------------------------------------------------------------
ctk.FillRectStyle = function FillRectStyle(Context, X, Y, W, H, Style)
{
	Context.save();
	Style.MergeToContext(Context);
	ctk.FillRect(Context, X, Y, W, H);
	Context.restore();
	return;
};


//---------------------------------------------------------------------
ctk.DrawRoundedRect = function DrawRoundedRect(Context, X, Y, W, H, R)
{
	// Adapted from: http://www.html5canvastutorials.com/tutorials/html5-canvas-rounded-corners/

	var x0 = X;
	var y0 = Y;
	var x1 = (X + W);
	var y1 = (Y + H);

	if (H < 0)
	{
		y0 = y1;
		y1 = Y;
	}
	if (H === 0)
	{
		y1 += R;
	}

	Context.beginPath();
	// T-L
	Context.moveTo(x0 + R, y0);
	// T-R
	Context.lineTo(x1 - R, y0);
	Context.arcTo(x1, y0, x1, y0 + R, R);
	// B-R
	Context.lineTo(x1, y1 - R);
	Context.arcTo(x1, y1, x1 - R, y1, R);
	// B-L
	Context.lineTo(x0 + R, y1);
	Context.arcTo(x0, y1, x0, y1 - R, R);
	// T-L
	Context.lineTo(x0, y0 + R);
	Context.arcTo(x0, y0, x0 + R, y0, R);

	Context.closePath();
	if (Context.fillStyle)
	{
		Context.fill();
	}
	if (Context.strokeStyle)
	{
		Context.stroke();
	}
	return;
};


//---------------------------------------------------------------------
ctk.DrawRoundedRectStyle = function DrawRoundedRectStyle(Context, X, Y, W, H, R, Style)
{
	Context.save();
	Style.MergeToContext(Context);
	ctk.DrawRoundedRect(Context, X, Y, W, H, R);
	Context.restore();
	return;
};


//=====================================================================
//=====================================================================
//    ______  __  .______        ______  __       _______     _______.
//   /      ||  | |   _  \      /      ||  |     |   ____|   /       |
//  |  ,----'|  | |  |_)  |    |  ,----'|  |     |  |__     |   (----`
//  |  |     |  | |      /     |  |     |  |     |   __|     \   \    
//  |  `----.|  | |  |\  \----.|  `----.|  `----.|  |____.----)   |   
//   \______||__| | _| `._____| \______||_______||_______|_______/    
//                                                                    
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
ctk.DrawCircle = function DrawCircle(Context, X, Y, R)
{
	Context.beginPath();
	Context.arc(X, Y, R, 0, 2 * Math.PI);
	Context.closePath();
	if (Context.fillStyle)
	{
		Context.fill();
	}
	if (Context.strokeStyle)
	{
		Context.stroke();
	}
	return;
};


//---------------------------------------------------------------------
ctk.DrawCircleStyle = function DrawCircleStyle(Context, X, Y, R, Style)
{
	Context.save();
	Style.MergeToContext(Context);
	ctk.DrawCircle(Context, X, Y, R);
	Context.restore();
	return;
};


//=====================================================================
//=====================================================================
//  .___________. __________   ___ .___________.
//  |           ||   ____\  \ /  / |           |
//  `---|  |----`|  |__   \  V  /  `---|  |----`
//      |  |     |   __|   >   <       |  |     
//      |  |     |  |____ /  .  \      |  |     
//      |__|     |_______/__/ \__\     |__|     
//                                              
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
ctk.DrawText = function DrawText(Context, Text, X, Y)
{
	if (Context.fillStyle)
	{
		Context.fillText(Text, X, Y);
	}
	if (Context.strokeStyle)
	{
		Context.strokeText(Text, X, Y);
	}
	return;
};


//---------------------------------------------------------------------
ctk.DrawTextStyle = function DrawTextStyle(Context, Text, X, Y, Style)
{
	Context.save();
	Style.MergeToContext(Context);
	ctk.DrawText(Context, Text, X, Y);
	Context.restore();
	return;
};


//=====================================================================
//=====================================================================
//  .______       _______   ______ .___________.
//  |   _  \     |   ____| /      ||           |
//  |  |_)  |    |  |__   |  ,----'`---|  |----`
//  |      /     |   __|  |  |         |  |     
//  |  |\  \----.|  |____ |  `----.    |  |     
//  | _| `._____||_______| \______|    |__|     
//                                              
//=====================================================================
//=====================================================================

ctk.Rect = function(X, Y, W, H)
{
	this.x = X || 0;
	this.y = Y || 0;
	this.w = W || 0;
	this.h = H || 0;


	//=====================================================================
	this.x2 = function()
	{
		return (this.x + (this.w - 1));
	};


	//=====================================================================
	this.y2 = function()
	{
		return (this.y + (this.h - 1));
	};


	//=====================================================================
	this.xy = function()
	{
		return new ctk.Point(this.x, this.y);
	};


	//=====================================================================
	this.wh = function()
	{
		return new ctk.Point(this.w, this.h);
	};


	//=====================================================================
	this.Clone = function()
	{
		return new ctk.Rect(this.x, this.y, this.w, this.h);
	};


	//=====================================================================
	this.Inflate = function(Amount)
	{
		this.x -= Amount;
		this.y -= Amount;
		this.w += (2 * Amount);
		this.h += (2 * Amount);
		return this;
	};


	//=====================================================================
	this.Deflate = function(Amount)
	{
		this.Inflate(-Amount);
		return this;
	};


	//=====================================================================
	this.MoveXY = function(X, Y)
	{
		this.x = X;
		this.y = Y;
		return this;
	};


	//---------------------------------------------------------------------
	this.MoveTo = function(X, Y)
	{
		this.MoveXY(X, Y);
		return this;
	};


	//=====================================================================
	this.OffsetXY = function(X, Y)
	{
		this.x += X;
		this.y += Y;
		return this;
	};


	//---------------------------------------------------------------------
	this.OffsetBy = function(X, Y)
	{
		this.OffsetXY(X, Y);
		return this;
	};


	//=====================================================================
	this.SetSize = function(W, H)
	{
		this.w = W;
		this.h = H;
		return this;
	};


	return this;
};


//=====================================================================
//=====================================================================
//  .______     ______   .______       _______   _______ .______      
//  |   _  \   /  __  \  |   _  \     |       \ |   ____||   _  \     
//  |  |_)  | |  |  |  | |  |_)  |    |  .--.  ||  |__   |  |_)  |    
//  |   _  <  |  |  |  | |      /     |  |  |  ||   __|  |      /     
//  |  |_)  | |  `--'  | |  |\  \----.|  '--'  ||  |____ |  |\  \----.
//  |______/   \______/  | _| `._____||_______/ |_______|| _| `._____|
//                                                                    
//=====================================================================
//=====================================================================


ctk.Border = function()
{
	this.BorderRect = new ctk.Rect();
	this.BorderStyle = null;
	this.BorderDepth = 0;
	this.BorderCornerRadius = 0;

	this.ClientRect = new ctk.Rect();
	this.ClientStyle = null;
	this.ClientCornerRadius = 0;

	this.ContentPadding = 0;
	this.ContentRect = new ctk.Rect();


	//---------------------------------------------------------------------
	this.MoveXY = function(X, Y)
	{
		this.BorderRect.MoveXY(X, Y);
		return this;
	};


	//---------------------------------------------------------------------
	this.MoveTo = function(X, Y)
	{
		this.MoveXY(X, Y);
		return this;
	};


	//---------------------------------------------------------------------
	this.OffsetXY = function(X, Y)
	{
		this.BorderRect.OffsetXY(X, Y);
		return this;
	};


	//---------------------------------------------------------------------
	this.OffsetBy = function(X, Y)
	{
		this.OffsetXY(X, Y);
		return this;
	};


	//=====================================================================
	this.SetSize = function(W, H)
	{
		this.SetBorderSize(W, H);
		return this;
	};


	//---------------------------------------------------------------------
	this.SetBorderSize = function(BorderWidth, BorderHeight)
	{
		this.ClientRect = new ctk.Rect(
			this.BorderDepth, this.BorderDepth, BorderWidth - (2 * this.BorderDepth), BorderHeight - (2 * this.BorderDepth)
		);
		this.ContentRect = this.ClientRect.Clone();
		if (this.ContentPadding)
		{
			this.ContentRect.Deflate(this.ContentPadding);
		}
		this.BorderRect = new ctk.Rect(
			this.BorderRect.x, this.BorderRect.y, BorderWidth, BorderHeight
		);
		return this;
	};


	//---------------------------------------------------------------------
	this.SetClientSize = function(ClientWidth, ClientHeight)
	{
		this.ClientRect = new ctk.Rect(
			this.BorderDepth, this.BorderDepth, ClientWidth, ClientHeight
		);
		this.ContentRect = this.ClientRect.Clone();
		if (this.ContentPadding)
		{
			this.ContentRect.Deflate(this.ContentPadding);
		}
		this.BorderRect = new ctk.Rect(
			this.BorderRect.x, this.BorderRect.y, ClientWidth + (2 * this.BorderDepth), ClientHeight + (2 * this.BorderDepth)
		);
		return this;
	};


	//---------------------------------------------------------------------
	this.SetContentSize = function(ContentWidth, ContentHeight)
	{
		this.ContentRect = new ctk.Rect(
			this.ContentPadding, this.ContentPadding, ContentWidth, ContentHeight
		);
		this.ClientRect = new ctk.Rect(
			this.BorderDepth, this.BorderDepth, this.ContentRect.w + (2 * this.ContentPadding), this.ContentRect.h + (2 * this.ContentPadding)
		);
		this.BorderRect = new ctk.Rect(
			this.BorderRect.x, this.BorderRect.y, this.ClientRect.w + (2 * this.BorderDepth), this.ClientRect.h + (2 * this.BorderDepth)
		);
		return this;
	};


	// //---------------------------------------------------------------------
	// this.DrawRect = function DrawRect(Context, X, Y, W, H, R)
	// {
	// 	var x0 = X;
	// 	var y0 = Y;
	// 	var x1 = (X + W);
	// 	var y1 = (Y + H);
	// 	Context.beginPath();
	// 	// T-L
	// 	Context.moveTo(x0 + R, y0);
	// 	// T-R
	// 	Context.lineTo(x1 - R, y0);
	// 	Context.arcTo(x1, y0, x1, y0 + R, R);
	// 	// B-R
	// 	Context.lineTo(x1, y1 - R);
	// 	Context.arcTo(x1, y1, x1 - R, y1, R);
	// 	// B-L
	// 	Context.lineTo(x0 + R, y1);
	// 	Context.arcTo(x0, y1, x0, y1 - R, R);
	// 	// T-L
	// 	Context.lineTo(x0, y0 + R);
	// 	Context.arcTo(x0, y0, x0 + R, y0, R);

	// 	if (Context.fillStyle)
	// 	{
	// 		Context.fill();
	// 	}
	// 	if (Context.strokeStyle)
	// 	{
	// 		Context.stroke();
	// 	}
	// 	return;
	// };


	//---------------------------------------------------------------------
	this.Render = function(Context, X, Y)
	{
		var x = X || 0;
		var y = Y || 0;

		if (this.BorderStyle)
		{
			x += this.BorderRect.x;
			y += this.BorderRect.y;
			Context.save();
			this.BorderStyle.MergeToContext(Context);
			/*
			if (this.BorderStyle.FillStyle)
			{
				Context.fillRect(x, y, this.BorderRect.w, this.BorderRect.h);
			}
			if (this.BorderStyle.StrokeStyle)
			{
				Context.strokeRect(x, y, this.BorderRect.w, this.BorderRect.h);
			}
			*/
			ctk.DrawRoundedRect(Context, x, y, this.BorderRect.w, this.BorderRect.h, 5)
			Context.restore();
		}

		if (this.ClientStyle)
		{
			x += this.ClientRect.x;
			y += this.ClientRect.y;
			Context.save();
			this.ClientStyle.MergeToContext(Context);
			if (this.ClientStyle.FillStyle)
			{
				Context.fillRect(x, y, this.ClientRect.w, this.ClientRect.h);
			}
			if (this.ClientStyle.StrokeStyle)
			{
				Context.strokeRect(x, y, this.ClientRect.w, this.ClientRect.h);
			}
			Context.restore();
		}


		return this;
	};


	return this;
};



//=====================================================================
//=====================================================================
//       _______.___________.____    ____  __       _______ 
//      /       |           |\   \  /   / |  |     |   ____|
//     |   (----`---|  |----` \   \/   /  |  |     |  |__   
//      \   \       |  |       \_    _/   |  |     |   __|  
//  .----)   |      |  |         |  |     |  `----.|  |____ 
//  |_______/       |__|         |__|     |_______||_______|
//                                                          
//=====================================================================
//=====================================================================


ctk.Style = function Style()
{


	// Styles
	this.StrokeStyle = null; // Sets or returns the color, gradient, or pattern used for strokes
	this.FillStyle = null; // Sets or returns the color, gradient, or pattern used to fill the drawing


	// Shadows
	this.ShadowColor = null; // Sets or returns the color to use for shadows
	this.ShadowBlur = null; // Sets or returns the blur level for shadows
	this.ShadowOffsetX = null; // Sets or returns the horizontal distance of the shadow from the shape
	this.ShadowOffsetY = null; // Sets or returns the vertical distance of the shadow from the shape


	// Lines
	this.LineCap = null; // Sets or returns the style of the end caps for a line
	this.LineJoin = null; // Sets or returns the type of corner created, when two lines meet
	this.LineWidth = null; // Sets or returns the current line width
	this.MiterLimit = null; // Sets or returns the maximum miter length


	// Text
	this.Font = null; // Sets or returns the current font properties for text content
	this.TextAlign = null; // Sets or returns the current alignment for text content
	this.TextBaseline = null; // Sets or returns the current text baseline used when drawing text

	// Compositing
	this.GlobalAlpha = null; // Sets or returns the current alpha or transparency value of the drawing
	this.GlobalCompositeOperation = null; // Sets or returns how a new image are drawn onto an existing image


	//---------------------------------------------------------------------
	this.FromContext = function(Context)
	{
		this.StrokeStyle = Context.strokeStyle;
		this.FillStyle = Context.fillStyle;
		this.ShadowColor = Context.shadowColor;
		this.ShadowBlur = Context.shadowBlur;
		this.ShadowOffsetX = Context.shadowOffsetX;
		this.ShadowOffsetY = Context.shadowOffsetY;
		this.LineCap = Context.lineCap;
		this.LineJoin = Context.lineJoin;
		this.LineWidth = Context.lineWidth;
		this.MiterLimit = Context.miterLimit;
		this.Font = Context.font;
		this.TextAlign = Context.textAlign;
		this.TextBaseline = Context.textBaseline;
		this.GlobalAlpha = Context.globalAlpha;
		this.GlobalCompositeOperation = Context.globalCompositeOperation;
		return;
	};


	//---------------------------------------------------------------------
	this.CopyToContext = function(Context)
	{
		Context.strokeStyle = this.StrokeStyle;
		Context.fillStyle = this.FillStyle;
		Context.shadowColor = this.ShadowColor;
		Context.shadowBlur = this.ShadowBlur;
		Context.shadowOffsetX = this.ShadowOffsetX;
		Context.shadowOffsetY = this.ShadowOffsetY;
		Context.lineCap = this.LineCap;
		Context.lineJoin = this.LineJoin;
		Context.lineWidth = this.LineWidth;
		Context.miterLimit = this.MiterLimit;
		Context.font = this.Font;
		Context.textAlign = this.TextAlign;
		Context.textBaseline = this.TextBaseline;
		Context.globalAlpha = this.GlobalAlpha;
		Context.globalCompositeOperation = this.GlobalCompositeOperation;
		return;
	};


	//---------------------------------------------------------------------
	this.MergeToContext = function(Context)
	{
		Context.strokeStyle = this.StrokeStyle || Context.strokeStyle;
		Context.fillStyle = this.FillStyle || Context.fillStyle;
		Context.shadowColor = this.ShadowColor || Context.shadowColor;
		Context.shadowBlur = this.ShadowBlur || Context.shadowBlur;
		Context.shadowOffsetX = this.ShadowOffsetX || Context.shadowOffsetX;
		Context.shadowOffsetY = this.ShadowOffsetY || Context.shadowOffsetY;
		Context.lineCap = this.LineCap || Context.lineCap;
		Context.lineJoin = this.LineJoin || Context.lineJoin;
		Context.lineWidth = this.LineWidth || Context.lineWidth;
		Context.miterLimit = this.MiterLimit || Context.miterLimit;
		Context.font = this.Font || Context.font;
		Context.textAlign = this.TextAlign || Context.textAlign;
		Context.textBaseline = this.TextBaseline || Context.textBaseline;
		Context.globalAlpha = this.GlobalAlpha || Context.globalAlpha;
		Context.globalCompositeOperation = this.GlobalCompositeOperation || Context.globalCompositeOperation;
		return;
	};


	//---------------------------------------------------------------------
	this.MergeToStyle = function(OtherStyle)
	{
		OtherStyle.StrokeStyle = this.StrokeStyle || OtherStyle.StrokeStyle;
		OtherStyle.FillStyle = this.FillStyle || OtherStyle.FillStyle;
		OtherStyle.ShadowColor = this.ShadowColor || OtherStyle.ShadowColor;
		OtherStyle.ShadowBlur = this.ShadowBlur || OtherStyle.ShadowBlur;
		OtherStyle.ShadowOffsetX = this.ShadowOffsetX || OtherStyle.ShadowOffsetX;
		OtherStyle.ShadowOffsetY = this.ShadowOffsetY || OtherStyle.ShadowOffsetY;
		OtherStyle.LineCap = this.LineCap || OtherStyle.LineCap;
		OtherStyle.LineJoin = this.LineJoin || OtherStyle.LineJoin;
		OtherStyle.LineWidth = this.LineWidth || OtherStyle.LineWidth;
		OtherStyle.MiterLimit = this.MiterLimit || OtherStyle.MiterLimit;
		OtherStyle.Font = this.Font || OtherStyle.Font;
		OtherStyle.TextAlign = this.TextAlign || OtherStyle.TextAlign;
		OtherStyle.TextBaseline = this.TextBaseline || OtherStyle.TextBaseline;
		OtherStyle.GlobalAlpha = this.GlobalAlpha || OtherStyle.GlobalAlpha;
		OtherStyle.GlobalCompositeOperation = this.GlobalCompositeOperation || OtherStyle.GlobalCompositeOperation;
		return;
	};


	//---------------------------------------------------------------------
	this.MergeFromStyle = function(OtherStyle)
	{
		OtherStyle.ApplyToStyle(this);
		return;
	};


	return;
};


//=====================================================================
//=====================================================================
//
//		LineStyle
//
//=====================================================================
//=====================================================================


ctk.LineStyle = function LineStyle(LineWidth, StrokeStyle, FillStyle)
{
	ctk.Style.call(this);
	this.LineWidth = LineWidth;
	this.StrokeStyle = StrokeStyle;
	this.FillStyle = FillStyle;
	return;
};

ctk.LineStyle.prototype = Object.create(ctk.Style.prototype);

//=====================================================================
//=====================================================================
//   __  .___________. _______ .___  ___. 
//  |  | |           ||   ____||   \/   | 
//  |  | `---|  |----`|  |__   |  \  /  | 
//  |  |     |  |     |   __|  |  |\/|  | 
//  |  |     |  |     |  |____ |  |  |  | 
//  |__|     |__|     |_______||__|  |__| 
//                                        
//=====================================================================
//=====================================================================

ctk._TextMeasureCanvas = new ctk.OffScreenCanvas();

ctk.Item = function()
{
	this.Border = null;
	this.Text = null;
	this.TextStyle = null;
	this.Image = null;


	//---------------------------------------------------------------------
	this.MoveXY = function(X, Y)
	{
		if (this.Border)
		{
			this.Border.BorderRect.MoveXY(X, Y);
		}
		return this;
	};


	//---------------------------------------------------------------------
	this.MoveTo = function(X, Y)
	{
		this.MoveXY(X, Y);
		return this;
	};


	//---------------------------------------------------------------------
	this.OffsetXY = function(X, Y)
	{
		if (this.Border)
		{
			this.Border.BorderRect.OffsetXY(X, Y);
		}
		return this;
	};


	//---------------------------------------------------------------------
	this.OffsetBy = function(X, Y)
	{
		this.OffsetXY(X, Y);
		return this;
	};


	//---------------------------------------------------------------------
	this.SetSize = function(MaxWidth, MaxHeight)
	{
		if (this.Border)
		{
			this.Border.SetSize(MaxWidth, MaxHeight);
		}
		return this;
	};


	//---------------------------------------------------------------------
	this.FitText = function(Context, MaxWidth, MaxHeight)
	{
		var max_width = MaxWidth || Context.canvas.clientWidth;
		var max_height = MaxHeight || Context.canvas.clientHeight;
		var rect = new ctk.Rect(0, 0, max_width, max_height);
		if (this.Text)
		{
			ctk._TextMeasureCanvas.Context.save();
			if (this.TextStyle)
			{
				this.TextStyle.MergeToContext(ctk._TextMeasureCanvas.Context);
			}
			ctk._TextMeasureCanvas.Context.textAlign = 'start';
			ctk._TextMeasureCanvas.Context.textBaseline = 'hanging';
			ctk._TextMeasureCanvas.Context.fillStyle = 'white';
			ctk._TextMeasureCanvas.Context.clearRect(0, 0, ctk._TextMeasureCanvas.Canvas.width, ctk._TextMeasureCanvas.Canvas.height);
			ctk._TextMeasureCanvas.Context.fillText(this.Text, 0, 0);
			var metrics = ctk._TextMeasureCanvas.Context.measureText(this.Text);
			if (metrics.width < max_width)
			{
				rect.w = metrics.width;
			}
			rect.h = 0;
			var image_data = ctk._TextMeasureCanvas.Context.getImageData(0, 0, 100, ctk._TextMeasureCanvas.Canvas.height);
			for (var y = image_data.height - 1; y >= 0; y--)
			{
				for (var x = 0; x < image_data.width; x++)
				{
					var i = (y * (image_data.width * 4)) + (x * 4);
					if (image_data.data[i] === 255)
					{
						rect.h = y + 1;
						break;
					}
				}
				if (rect.h > 0)
				{
					break;
				}
			}
			ctk._TextMeasureCanvas.Context.restore();
		}
		// if (this.Image)
		// {}
		if (this.Border)
		{
			this.Border.SetContentSize(rect.w, rect.h);
		}
		return this;
	};


	//---------------------------------------------------------------------
	this.Render = function(Context, X, Y)
	{
		var x = X || 0;
		var y = Y || 0;
		var text_rect = new ctk.Rect(x, y, (Context.canvas.clientWidth - x), (Context.canvas.clientHeight - y));

		if (this.Border)
		{
			this.Border.Render(Context, x, y);
			text_rect = this.Border.ContentRect.Clone();
			text_rect.OffsetBy(this.Border.ClientRect.x, this.Border.ClientRect.y);
			text_rect.OffsetBy(this.Border.BorderRect.x, this.Border.BorderRect.y);
			text_rect.OffsetBy(x, y);
		}

		if (this.Text)
		{
			if (this.TextStyle)
			{
				Context.save();
				this.TextStyle.MergeToContext(Context);
				Context.textAlign = 'start';
				Context.textBaseline = 'hanging';
				if (this.TextStyle.FillStyle)
				{
					Context.fillText(this.Text, text_rect.x, text_rect.y, text_rect.w);
				}
				if (this.TextStyle.StrokeStyle)
				{
					Context.strokeText(this.Text, text_rect.x, text_rect.y, text_rect.w);
				}
				Context.restore();
			}
		}

		return this;
	};


	return this;
};
