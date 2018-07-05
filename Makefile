.DEFAULT_GOAL := help

help:
	@echo "   install: intall dependencies"
	@echo "   build: build app"
	@echo "   run-dev: run app in localhost"
	@echo "   run-android-studio-android: run build & lauch android-studio"


install:
	@echo "Installing dependencies"
	npm install cordova
	npm install gradle
	npm install

run-dev:
	npm run dev

build:
	npm run build
	cordova platforms remove android
	cordova platforms add android
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

run-android-studio-android:
	npm run build
	cordova platforms remove android
	cordova platforms add android


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
