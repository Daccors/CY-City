#!/bin/bash

erreur=-1

echo "============== starting backend =============="
cd ./backend

php artisan serve
erreur=$?

if (( $erreur != 0 )) ; then
    echo
    echo "$0: 'php artisan serve' didn't work as espected and terminated with : $erreur"
    exit 1
fi

cd ..
echo "============== backend online =============="

echo ; echo ; echo ;
echo "============== starting angular =============="

ng serve
erreur=$?

echo $erreur

echo "============== angular online =============="