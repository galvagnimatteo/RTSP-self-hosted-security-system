# A self-hosted security system based on the RTSP protocol

This security system is a side project created to be a self-hosted, open source and 
(kinda) cheap alternative to a proprietary security system that works only with cameras of the same brand.
As a matter of fact, every IP camera with RTSP support will work.

## Installation

### Quick installation

1. Download source
1. CD to /installation
1. Run
   ```
   ./install.sh -m MAIN_BACKEND_PORT -p PYTHON_BACKEND_PORT -r RTSPTOWEB_PORT -f FRONTEND_PORT
   ```
   Every port should be free.
   The only port worth an explanation here is FRONTEND_PORT: you will be able to access 
   the dashboard webpage searching in your browser for HOST_IP:FRONTEND_PORT.
   If it's free, using 80 as the FRONTEND_PORT will let you access the webpage only by searching HOST_IP.
   Example:
    ```
   ./install.sh -m 8080 -p 8000 -r 8083 -f 80
   ```
   This script is built for and tested only on a Raspberry Pi 4B.
1. After installation, open browser at
    ```
    HOST_IP:FRONTEND_PORT
    ```

### Installation from source

1. Compile the main backend
    ```
    ./mvnw package
    ```
    This will generate a .jar file inside the /target folder.
    Launch it with java -Dserver.port=MAIN_BACKEND_PORT -Dspring.application.json='{"rtsptoweb": RTSPTOWEB_PORT,"backendMain": MAIN_BACKEND_PORT,      "backendPython": PYTHON_BACKEND_PORT,"frontend": FRONTEND_PORT}' -jar ./backend-main-0.0.1-SNAPSHOT.jar
1. Launch the Python backend (with ports.json modified accordingly to your desire)
    ```
    uvicorn main:app --port PYTHON_BACKEND_PORT --host 0.0.0.0 --reload
    ```
1. Compile RTSPtoWeb (with config.json modified from "http_port": ":8083" to "http_port": ":RTSPTOWEB_PORT")
    ```
    go run *go
    ```
    And launch with
    ```
    ./RTSPtoWeb
    ```
1. Compile the Angular frontend (with assets/ports.json modified accordingly)
    ```
    ng build
    ```
    Serve the files under /dist with any webserver on FRONTEND_PORT

## License

See the [LICENSE.md](LICENSE.md) file for details

## Software used 

- RTSPtoWeb (https://github.com/deepch/RTSPtoWeb)
- Material Dashboard Angular by Creative Tim (https://www.creative-tim.com/product/material-dashboard-angular2)

