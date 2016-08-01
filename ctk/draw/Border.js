/* global ctk */


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

