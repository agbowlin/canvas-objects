function PageView(PageDocument, PagePrefix)
{
	this.Document = PageDocument;
	this.Prefix = PagePrefix;


	//---------------------------------------------------------------------
	this.GetElement = function PageUI_GetElement(PageSelector)
	{
		var selector = PageSelector;
		if (this.Prefix)
		{
			selector = this.Prefix + selector;
		}
		var element = $(selector);
		return element;
	};


	//---------------------------------------------------------------------
	this.GetElementByID = function PageUI_GetElementByID(ElementID)
	{
		var id = ElementID;
		if (this.Prefix)
		{
			id = this.Prefix + id;
		}
		var element = this.Document.getElementById(id);
		return element;
	};


	//---------------------------------------------------------------------
	this.Initialize = function PageUI_Initialize()
	{
		
		// Main Menu
		this.MainMenuButton = this.GetElement("#main-menu-button");
		this.MainMenu_NewSession = this.GetElement("#game_new_session");
		this.MainMenu_Login = this.GetElement("#menu-login");
		
		// Game Clock
		this.ClockDisplay = this.GetElement("#clock_display");
		this.GameSpeedDisplay = this.GetElement("#game_speed");
		this.GameSpeedFasterButton = this.GetElement("#game_speed_faster");
		this.GameSpeedSlowerButton = this.GetElement("#game_speed_slower");
		
		// Debug Display
		this.FPS = this.GetElement("#FPS");
		
		return;
	};


	//---------------------------------------------------------------------
	this.Update = function PageUI_Update(PageState)
	{
		// Debug Display
		this.FPS.text( PageState.FPS.toFixed( 2 ) );
		
		return;
	};



}
