npm run build
cordova prepare

cp ./icon/72_icon.png ./platforms/android/app/src/main/res/mipmap-hdpi
rm -f ./platforms/android/app/src/main/res/mipmap-hdpi/icon.png
mv ./platforms/android/app/src/main/res/mipmap-hdpi/72_icon.png ./platforms/android/app/src/main/res/mipmap-hdpi/icon.png

cp ./icon/36_icon.png ./platforms/android/app/src/main/res/mipmap-ldpi
rm -f ./platforms/android/app/src/main/res/mipmap-ldpi/icon.png
mv ./platforms/android/app/src/main/res/mipmap-ldpi/36_icon.png ./platforms/android/app/src/main/res/mipmap-ldpi/icon.png

cp ./icon/48_icon.png ./platforms/android/app/src/main/res/mipmap-mdpi
rm -f ./platforms/android/app/src/main/res/mipmap-mdpi/icon.png
mv ./platforms/android/app/src/main/res/mipmap-mdpi/48_icon.png ./platforms/android/app/src/main/res/mipmap-mdpi/icon.png

cp ./icon/96_icon.png ./platforms/android/app/src/main/res/mipmap-xhdpi
rm -f ./platforms/android/app/src/main/res/mipmap-xhdpi/icon.png
mv ./platforms/android/app/src/main/res/mipmap-xhdpi/96_icon.png ./platforms/android/app/src/main/res/mipmap-xhdpi/icon.png

cp ./icon/144_icon.png ./platforms/android/app/src/main/res/mipmap-xxhdpi
rm -f ./platforms/android/app/src/main/res/mipmap-xxhdpi/icon.png
mv ./platforms/android/app/src/main/res/mipmap-xxhdpi/144_icon.png ./platforms/android/app/src/main/res/mipmap-xxhdpi/icon.png

cp ./icon/192_icon.png ./platforms/android/app/src/main/res/mipmap-xxxhdpi
rm -f ./platforms/android/app/src/main/res/mipmap-xxxhdpi/icon.png
mv ./platforms/android/app/src/main/res/mipmap-xxxhdpi/192_icon.png ./platforms/android/app/src/main/res/mipmap-xxxhdpi/icon.png


/opt/android-studio/bin/studio.sh
