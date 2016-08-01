/* global ctk */

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
		if (this.Image)
		{}
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
