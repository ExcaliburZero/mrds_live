# MRDS Live
An unofficial stream overlay for Monster Rancher DS which shows your monsters stats, conditions, and change in stats over time. Currently this overlay only works with the DeSmuME emulator.

For a demo, see the [following video](https://www.youtube.com/watch?v=StDosnOBaT4):

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/StDosnOBaT4/0.jpg)](https://www.youtube.com/watch?v=StDosnOBaT4)

## Usage
### First time setup
#### DeSmuME Lua setup
1. Download and install DeSmuME if you do not already have it installed
2. Check whether your installation of DeSmuME is 32-bit (x86) or 64-bit (x86-64)
3. Download the Lua 5.1 DLL that matches the architecture of your copy of DeSmuME (32-bit or 64-bit)
    * Download from: https://sourceforge.net/projects/luabinaries/files/5.1.5/Windows%20Libraries/Dynamic/
    * 32-bit / x86: `lua-5.1.5_Win32_dll14_lib.zip`
    * 64-bit / x86-64: `lua-5.1.5_Win64_dll14_lib.zip`
4. Extract the `lua5.1.dll` file from the zip file you downloaded
5. Move `lua5.1.dll` to the same folder where your DeSmuME executable is
6. Rename `lua5.1.dll` to `lua51.dll`

#### Download the program
7. Download the zip file for your operating system of the latest release at the following link:
    * https://github.com/ExcaliburZero/mrds_live/releases
    * Under the `Assets` header, click on the `.zip` link for your OS to download file
8. Unzip the `.zip` file you downloaded

#### Running Lua script in DeSmuME
9. Run DeSmuME and start the ROM for the game
10. In the menu bar, click on `Tools > Lua Scripting > New Lua Script Window...`
11. Click the `Browse...` button and select the `record_data.lua` file your downloaded

#### Run server and configure overlay in OBS
12. In the folder you extracted the `.zip` file to, double click on `mrds_live.exe` (or `mrds_live` on Linux) to run the server we will have OBS connect to
13. In OBS, create a new Browser source and give it the following settings:
    * URL: `http://localhost:3000/front`
    * Width: `1920`
    * Height: `1080`
    * Custom CSS: `body { margin: 0px auto; overflow: hidden; }`

#### Configuring DeSmuME screens in OBS
The following instructions describe the setup I use for DeSmuME with a horizontal LCDs layout and 4x Window Size. Feel free to use whatever setting values work for how you have DeSmuME setup.

14. In OBS, create a Window Capture source for DeSmuME
15. Copy paste that DeSmuME Window Capture source
16. For both DeSmuME Window capture sources, click on `Right Click > Transform > Edit Transform` and put in the following settings:
    * Top screen:
        * Position: 40, 39
        * Size: 2040, 794
        * Crop: left=1, right=1024, top=30, bottom=1
    * Bottom screen:
        * Position: 1140, 39
        * Size: 1451, 565
        * Crop: left=1024, right=1, top=30, bottom=1

### Each subsequent usage
1. Run DeSmuME and start the ROM for the game
2. In the menu bar, click on `Tools > Lua Scripting > record_data.lua`
3. In the folder you extracted the `.zip` file to, double click on `mrds_live.exe` (or `mrds_live` on Linux) to run the server we will have OBS connect to
4. In OBS, edit the Browser source and click on the `Refresh cache of the current page` button