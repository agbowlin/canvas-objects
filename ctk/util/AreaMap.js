/* global ctk */


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

