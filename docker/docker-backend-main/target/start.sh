json=`cat ./ports.json`
java -Dserver.port=8080 -Dspring.application.json=''"$json"'' -jar ./backend-main-0.0.1-SNAPSHOT.jar
