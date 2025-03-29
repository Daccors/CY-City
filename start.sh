#!/bin/bash

start_backend(){
    echo "-------------- starting backend --------------"
    erreur=-1
    cd ./backend

    php artisan serve
    erreur=$?

    if (( $erreur != 0 )) ; then
        echo
        echo "$0: 'php artisan serve' didn't work as espected and terminated with : $erreur"
        exit 1
    fi

    cd ..
    echo "============== backend succesfully started =============="
}



start_backend &

echo "-------------- starting angular --------------"

ng serve
erreur=$?

if (( $erreur != 0 )) ; then
    echo
    echo "$0: 'ng serve' didn't work as espected and terminated with : $erreur"
    exit 2
fi

echo "============== angular stoped =============="