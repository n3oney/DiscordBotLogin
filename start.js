
const {app, BrowserWindow} = require('electron')
const electron = require('electron')
  let win
//***//
const globalShortcut = electron.globalShortcut
//***//
function createWindow () {
	//***//
	globalShortcut.register('F5', function() {
		console.log('f5 is pressed')
		win.reload()
	})
	globalShortcut.register('CommandOrControl+R', function() {
		console.log('CommandOrControl+R is pressed')
		win.reload()
	})
}
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  async function createWindow () {
    win = new BrowserWindow({width: 800, height: 600})
    // and load the index.html of the app.
    win.loadURL('file://' + __dirname + '/index.ejs')

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
  })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
