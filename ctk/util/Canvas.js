/* global ctk */


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
