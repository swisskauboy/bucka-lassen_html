// Created by iWeb 2.0.2 local-build-20080319

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_0:new IWShadow({blurRadius:1,offset:new IWPoint(-0.0000,1.0000),color:'#000000',opacity:0.700000}),stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,290),url:'Invitationen_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'Invitationen_files/stroke_1.png'},{rect:new IWRect(2,-2,583,4),url:'Invitationen_files/stroke_2.png'},{rect:new IWRect(585,-2,4,4),url:'Invitationen_files/stroke_3.png'},{rect:new IWRect(585,2,4,290),url:'Invitationen_files/stroke_4.png'},{rect:new IWRect(585,292,4,4),url:'Invitationen_files/stroke_5.png'},{rect:new IWRect(2,292,583,4),url:'Invitationen_files/stroke_6.png'},{rect:new IWRect(-2,292,4,4),url:'Invitationen_files/stroke_7.png'}],new IWSize(587,294))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Invitationen_files/InvitationenMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');Widget.onload();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
