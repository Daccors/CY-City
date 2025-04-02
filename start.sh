#!/bin/bash
# Start the server by typing `bash start.sh` in a bash terminal (git-bash works)

start_laravel(){
    echo -e "\033[1;36m-------------- Starting Laravel --------------\033[0m"
    echo -e "\033[1;36m>\033[0m creating '\033[0;32mCLI\033[0m' process, you can find it in the Task Manager" 
    echo
    erreur=-1
    cd ./backend

    php artisan serve
    erreur=$?

    if (( $erreur != 0 && $erreur != 130)) ; then
        echo
        echo -e "$0: 'php artisan serve' didn't work as espected and terminated with : \033[0;31m$erreur\033[0m"
        exit 1
    fi

    cd ..
    echo -e "\033[1;32m============== Laravel stopped ==============\033[0m"
}

start_angular(){
    echo -e "\033[1;36m-------------- Starting Angular --------------\033[0m"
    echo -e "\033[1;36m>\033[0m creating '\e[0;32mNode.js JavaScript Runtime\e[0m' process, you can find it in the Task Manager" 
    echo; echo
    erreur=-1

    ng serve 
    erreur=$?

    if (( $erreur != 0 && $erreur != 130)) ; then
        echo
        echo "$0: 'ng serve' didn't work as espected and terminated with : \033[0;31m$erreur\033[0m"
        exit 2
    fi

    echo -e "\033[1;32m============== Angular stopped ==============\033[0m"
}


start_laravel & 
sleep 3
start_angular &
sleep 10