/*
global ctk
global PageView
global LifeGame
global Game
*/

//--------------------------------------------------------------------------
//  DreamFactory 2.0 instance specific constants
//--------------------------------------------------------------------------

var INSTANCE_URL = 'https://df-agbowlin-01.enterprise.dreamfactory.com';
var APP_API_KEY = '48a384ea0243a54d236bbf76e412f647547da74c904287f29ab194155aab9c39';


//---------------------------------------------------------------------
function InitializeUI()
{
	var page_view = new PageView(document);
	page_view.Initialize();

	page_view.ClockDisplay.text('Initializing ...');

	var canvas_element = document.getElementById("game_canvas");
	Game = new LifeGame(canvas_element, UpdateUI);
	Game.PageView = page_view;
	Game.ResetGame();

	//------------------------------------------
	//	Canvas
	//------------------------------------------

	Game.Display.Canvas.onclick = function(Event)
	{
		if (Game.GamePaused)
		{
			var point = GetCanvasEventPoint(Game.Display.Canvas, Event)
			point.x = Math.round(Game.Display.Map.UnmapX(point.x));
			point.y = Math.round(Game.Display.Map.UnmapY(point.y));
			if (Game.Grid[point.y][point.x])
			{
				Game.Grid[point.y][point.x] = null;
			}
			else
			{
				Game.Grid[point.y][point.x] = true;
			}
			UpdateUI();
			console.log("x: " + point.x + " y: " + point.y);
		}
		return;
	}


	//------------------------------------------
	//	Main Menu
	//------------------------------------------

	Game.PageView.MainMenuButton.click(function()
	{
		$('#main-menu-modal').modal('show');
	});

	Game.PageView.MainMenu_NewSession.click(function()
	{
		// Game.ResetGame();
		location.reload();
	});

	Game.PageView.MainMenu_Login.click(function()
	{
		$('#login-modal').modal('show');
	});

	$('#login-button').on('click', function()
	{
		var email = $('#login-email').val();
		var password = $('#login-password').val();

		$.api.login(email, password, loginHandle);
	});

	$('#login-cancel-button').on('click', function()
	{
		$('#login-modal').modal('hide');
	});

	//------------------------------------------
	//	Game Clock
	//------------------------------------------

	Game.PageView.ClockDisplay.click(function()
	{
		if (Game.GameStarted === false)
		{
			Game.StartGame();
		}
		else if (Game.GamePaused === true)
		{
			Game.ResumeGame();
		}
		else
		{
			Game.PauseGame();
		}
		// $('#clock_modal').modal('show');
	});

	Game.PageView.GameSpeedSlowerButton.click(function()
	{
		if (Game.GameSpeed > 0.25)
		{
			Game.GameSpeed /= 2;
			UpdateUI();
		}
	});
	Game.PageView.GameSpeedFasterButton.click(function()
	{
		if (Game.GameSpeed < 512)
		{
			Game.GameSpeed *= 2;
			UpdateUI();
		}
	});

	//------------------------------------------
	//	Resizing
	//------------------------------------------

	// Bind to window resize event.
	$(window).resize(ResizeUI);

	// Resize the UI to initialize the display.
	ResizeUI();
	// window.setTimeout(ResizeUI, 1);

	// Return, OK
	return;
}


//---------------------------------------------------------------------
function ResizeUI()
{
	var canvas_width = (Game.Display.Canvas.parentNode.clientWidth - Game.Display.Canvas.offsetLeft);
	var canvas_height = (Game.Display.Canvas.parentNode.clientHeight - Game.Display.Canvas.offsetTop);
	canvas_width -= 10;
	canvas_height -= 10;

	Game.Display.Canvas.width = canvas_width;
	Game.Display.Canvas.height = canvas_height;

	// Update the display.
	Game.Update();

	// Return, OK
	return;
}


//---------------------------------------------------------------------
function UpdateUI()
{
	Game.PageView.Update(Game);

	// Timer Controls
	if (Game.GameStarted)
	{
		var text = '';
		if (Game.GamePaused)
		{
			text += '* ';
		}
		text += Game.GameTime.toLocaleTimeString();
		Game.PageView.ClockDisplay.text(text);
	}
	else
	{
		Game.PageView.ClockDisplay.text('Ready!');
	}
	Game.PageView.GameSpeedDisplay.text(Game.GameSpeed.toFixed(2) + 'X');

	// Return, OK
	return;
}


//--------------------------------------------------------------------------
//  Login Modal
//--------------------------------------------------------------------------

var loginHandle = function(response)
{

	if (response.hasOwnProperty('session_token'))
	{
		setToken('token', response.session_token);
		MessageBox('SimTrader', 'Welcome, ' + response.name + '!');
		// $.route('groups');
		$('#login-modal').modal('hide');
	}
	else
	{
		var msgObj = {};
		msgObj = parseResponse(response);
		if (msgObj)
		{
			MessageBox(msgObj.code, msgObj.message, msgObj.error);
		}
	}
};


//--------------------------------------------------------------------------
//  Register
//--------------------------------------------------------------------------

$('#signup-button').on('click', function()
{
	var firstname = $('#register_firstname').val();
	var lastname = $('#register_lastname').val();
	var email = $('#register_email').val();
	var password = $('#register_password').val();

	$.api.register(firstname, lastname, email, password, function(response)
	{
		if (response.hasOwnProperty('session_token'))
		{
			setToken('token', response.session_token);
			// $.route('groups');
		}
		else
		{
			var msgObj = {};
			msgObj = parseResponse(response);
			if (msgObj)
			{
				MessageBox(msgObj.code, msgObj.message, msgObj.error);
			}
		}
	});
});
