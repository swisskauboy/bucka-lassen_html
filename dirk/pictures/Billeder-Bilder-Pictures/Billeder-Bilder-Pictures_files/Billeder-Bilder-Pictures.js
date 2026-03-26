// Created by iWeb 2.0.4 local-build-20090207

function createMediaStream_id3()
{return IWCreateMediaCollection("http://www.bucka-lassen.dk/dirk/pictures/Billeder-Bilder-Pictures/Billeder-Bilder-Pictures_files/rss.xml",false,1,["No photos yet","%d photo","%d photos"],["","%d clip","%d clips"]);}
function initializeMediaStream_id3()
{createMediaStream_id3().load('http://www.bucka-lassen.dk/dirk/pictures/Billeder-Bilder-Pictures',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget8'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id3',{pageIndex:0}));});}
function layoutMediaGrid_id3(range)
{createMediaStream_id3().load('http://www.bucka-lassen.dk/dirk/pictures/Billeder-Bilder-Pictures',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id3',new IWPhotoGridLayout(3,new IWSize(215,162),new IWSize(215,32),new IWSize(229,209),27,27,0,new IWSize(48,43)),new IWPhotoFrame([IWCreateImage('Billeder-Bilder-Pictures_files/spiralbook-creme_ul.png'),IWCreateImage('Billeder-Bilder-Pictures_files/spiralbook-creme_top.png'),IWCreateImage('Billeder-Bilder-Pictures_files/spiralbook-creme_ur.png'),IWCreateImage('Billeder-Bilder-Pictures_files/spiralbook-creme_right.png'),IWCreateImage('Billeder-Bilder-Pictures_files/spiralbook-creme_lr.png'),IWCreateImage('Billeder-Bilder-Pictures_files/spiralbook-creme_bottom.png'),IWCreateImage('Billeder-Bilder-Pictures_files/spiralbook-creme_ll.png'),IWCreateImage('Billeder-Bilder-Pictures_files/spiralbook-creme_left.png')],null,1,0.441521,15.000000,0.000000,0.000000,0.000000,83.000000,40.000000,40.000000,55.000000,106.000000,40.000000,40.000000,32.000000,null,null,null,0.300000),imageStream,range,(null),null,1.000000,null,'../Media/slideshow.html','widget8',null,'widget9',{showTitle:true,showMetric:true})});}
function relayoutMediaGrid_id3(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id3(range);}
function onStubPage()
{var args=getArgs();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id3(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('../Media/transparent.gif');function hostedOnDM()
{return false;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','../Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','../Media/Photo-Overlay-Movie.png')
IWRegisterNamedImage('contribution overlay','../Media/Photo-Overlay-Contribution.png')
loadMozillaCSS('Billeder-Bilder-Pictures_files/Billeder-Bilder-PicturesMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');NotificationCenter.addObserver(null,relayoutMediaGrid_id3,'RangeChanged','id3')
Widget.onload();fixAllIEPNGs('../Media/transparent.gif');fixupAllIEPNGBGs();initializeMediaStream_id3()
performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
