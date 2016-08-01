/* global ctk */


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
