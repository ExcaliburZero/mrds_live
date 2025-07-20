# MRDS Live
An unofficial stream overlay for Monster Rancher DS which shows your monsters stats, conditions, and change in stats over time.

For a demo, see the [following video](https://www.youtube.com/watch?v=StDosnOBaT4):

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/StDosnOBaT4/0.jpg)](https://www.youtube.com/watch?v=StDosnOBaT4)

## Usage
### First time setup
1. Download and install DeSmuME if you do not already have it installed
2. Check whether your installation of DeSmuME is 32-bit (x86) or 64-bit (x86-64)
3. Download the Lua 5.1 DLL that matches the architecture of your copy of DeSmuME (32-bit or 64-bit)
    * Download from: https://sourceforge.net/projects/luabinaries/files/5.1.5/Windows%20Libraries/Dynamic/
    * 32-bit / x86: `lua-5.1.5_Win32_dll14_lib.zip`
    * 64-bit / x86-64: `lua-5.1.5_Win64_dll14_lib.zip`
4. Extract the `lua5.1.dll` file from the zip file you downloaded
5. Move `lua5.1.dll` to the same folder where your DeSmuME executable is
6. Rename `lua5.1.dll` to `lua51.dll`
7. Download the zip file for your operating system of the latest release at the following link:
    * https://github.com/ExcaliburZero/mrds_live/releases
    * Under the `Assets` header, click on the `.zip` link for your OS to download file
8. Unzip the `.zip` file you downloaded
9. Run DeSmuME and start the ROM for the game
10. In the menu bar, click on `Tools > Lua Scripting > New Lua Script Window...`
11. Click the `Browse...` button and select the `record_data.lua` file your downloaded
12. In the folder you extracted the `.zip` file to, double click on `mrds_live.exe` (or `mrds_live` on Linux) to run the server we will have OBS connect to
13. In OBS, create a new Browser source and give it the following settings:
    * URL: `http://localhost:3000/front`
    * Width: `1920`
    * Height: `1080`
    * Custom CSS: `body {  margin: 0px auto; overflow: hidden; }`

### Each subsequent usage
1. Run DeSmuME and start the ROM for the game
2. In the menu bar, click on `Tools > Lua Scripting > record_data.lua`
3. In the folder you extracted the `.zip` file to, double click on `mrds_live.exe` (or `mrds_live` on Linux) to run the server we will have OBS connect to
4. In OBS, edit the Browser source and click on the "Refresh cache of the current page" button