/* global ctk */


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
