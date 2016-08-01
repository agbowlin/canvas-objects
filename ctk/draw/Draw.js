/* global ctk */


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
