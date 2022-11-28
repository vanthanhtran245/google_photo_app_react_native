# Google Photos App built with React native

**This app is built for FourTech test** 

## Features
- [X] Google OAuth for accessing Google Photos
- [X] Listing medias from library.
- [X] Listing albums.
- [X] Listing shared albums.
- [X] Photos can be viewed, downloaded. 
- [X] Videos can be viewed, downloaded.
- [X] Caching for videos & images.
- [X] Multiple Language Support 
    - [x] English
    - [x] Viet Nam
- [ ] Add media to album
- [ ] Delete media
<br/>

## Google OAuth & Google Photos
This project directly use Google Photos API from Google Cloud. API key is enabled on [Google Photos API](https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com). Moreover, Photos API requests are sent with [REST](https://developers.google.com/photos/library/guides/get-started). 


While authenticating with Google, the app requests three different permissions.
- photoslibrary.readonly
- photoslibrary.appendonly
- photoslibrary.sharing


<br/>


## Setup 
Create OAuth 2.0 Client IDs on [Google Cloud API Credentials](https://console.cloud.google.com/apis/credentials) for both iOS & Android. Add these files to proper paths of the project. 

* For iOS
```
npm install
npm run start
npm run ios
```

* For Android
```
npm install
npm run start
npm run android
```


<br/>
## Authors

👤 **Thanh Tran Van**

- GitHub: [@vanthanhtran245](https://github.com/vanthanhtran245)

<br/>
<br/>


## Videos

* ## Video View Details 
Android | iOS
:-: | :-:
<iframe width="480" height="390" src="[Android](https://youtu.be/ykLSI8x0luQ)" frameborder="0" allowfullscreen></iframe> | <iframe width="480" height="390" src="[iOS](https://youtu.be/eaK7n_w1kpQ)" frameborder="0" allowfullscreen>