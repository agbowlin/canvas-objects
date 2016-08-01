# canvas-toolkit
A Javascript Library for Manipulating the HTML Canvas API.


Overview
------------------------------------------

CTK is a Javascript library which abstracts the HTML Canvas API and encapsulates functionality to manipulate high level drawing objects on the canvas.
The Canvas API allows direct drawing to a region of the browser window, via the HTML `<canvas>` placeholder element.
The HTML Canvas is well suited for implementing dynamic interfaces within a web page.

More Information:

- [w3schools - HTML5 Canvas](http://www.w3schools.com/html/html5_canvas.asp)


Objects
------------------------------------------

- **ctk**: The parent object for the library. All ctk objects are created through ctk functions (e.g. `new ctk.Border()`). Also exposes a few helper drawing methods.

- **ctk.Canvas**: Encapsulates a HTML Canvas and a HTML Context object. Exposes passthrough functions for all of the Context functions.

- **ctk.Point**: A simple data object exposing x and y data members.

- **ctk.Rect**: A simple data object encapsulating a rectangle object.

- **ctk.Border**: A drawing object which draws a border on the canvas. Exposes `ctk.Style` properties for controlling the visual display of the border. The dimensions of a `ctk.Border` object is controlled by three rectangle members: `BorderRect`, `ClientRect`, and `ContentRect`.

- **ctk.Style**: Encapsulates the data properties exposed by the HTML Context object. Useful for storing visual style configurations and also merging them.

- **ctk.Item**: A composite drawing object which combines a `ctk.Border` object with text display in the border's content area.

- **ctk.ProcessLoop**: This object encapsulates a timer. Invokes a callback function repeatedly.

- **ctk.Area**: A simple rectangle object with a specific coordinate system.

- **ctk.AreaMap**: Maps coordinates between two `Area` objects. 


Reference
------------------------------------------

History
------------------------------------------
