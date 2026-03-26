slideShowURL = 'SlideShow_assets/SlideShow.html';       // parameter from openSlideShowWindow.js
slideShowNS4URL = 'SlideShow_assets/SlideShowNS4.html'; // parameter from openSlideShowWindow.js

slides = new Array();
slides[0] = new Slide('../Photos_files/CIMG2834.jpg', '600', '800', 'På vej til Lalandia');
slides[1] = new Slide('../Photos_files/CIMG2796.jpg', '600', '800', 'Lolland - here we come...');
slides[2] = new Slide('../Photos_files/CIMG2801.jpg', '600', '800', 'Ankommet');
slides[3] = new Slide('../Photos_files/CIMG2802.jpg', '600', '800', 'Koldskål på terassen');
slides[4] = new Slide('../Photos_files/CIMG2808.jpg', '800', '600', 'Næste morgen');
slides[5] = new Slide('../Photos_files/CIMG2811.jpg', '600', '800', 'Ah! morgenmad');
slides[6] = new Slide('../Photos_files/CIMG2814.jpg', '600', '800', 'Klar til stranden');
slides[7] = new Slide('../Photos_files/CIMG2815.jpg', '800', '600', 'Seje Lukas');
slides[8] = new Slide('../Photos_files/CIMG2812.jpg', '600', '800', 'Anna går! ;)');
slides[9] = new Slide('../Photos_files/CIMG2818.jpg', '800', '600', 'Drengene scouter');
slides[10] = new Slide('../Photos_files/CIMG2820.jpg', '800', '600', 'Drengene sikrer stranden');
slides[11] = new Slide('../Photos_files/CIMG2825.jpg', '600', '800', 'efter Monkey-Tonkey');
slides[12] = new Slide('../Photos_files/CIMG2827.jpg', '600', '800', 'Anna på legepladsen');
slides[13] = new Slide('../Photos_files/CIMG2832.jpg', '800', '600', 'Lukas');
slides[14] = new Slide('../Photos_files/CIMG2833.jpg', '800', '600', 'Mor');
slides[15] = new Slide('../Photos_files/CIMG2830.jpg', '800', '600', 'Christina');
slides[16] = new Slide('../Photos_files/CIMG2826.jpg', '800', '600', 'Jesper spiser igen ;)');
slides[17] = new Slide('../Photos_files/CIMG2839.jpg', '600', '800', 'Kirkegaards på vej hjem');
slides[18] = new Slide('../Photos_files/CIMG2837.jpg', '800', '600', 'Anna før hun falder i søvn');
isPureISOLatin1 = true;
contentEncodingConstant = 4;
feedbackURL = "TODO";
showFeedbackButton = false;
feedbackEnabled = true;

function NBmouseover(index)
{
    var normal = document.getElementById("navbar_"+index+"_normal");
    var rollover = document.getElementById("navbar_"+index+"_rollover");
    if (normal && rollover)
    {
        normal.style.visibility = "hidden";
        rollover.style.visibility = "visible";
    }
    return true;
}

function NBmouseout(index)
{
    var normal = document.getElementById("navbar_"+index+"_normal");
    var rollover = document.getElementById("navbar_"+index+"_rollover");
    if (normal && rollover)
    {
        normal.style.visibility = "visible";
        rollover.style.visibility = "hidden";
    }
    return true;
}

var smallTransparentGif = "";
function fixupIEPNG(strImageID, transparentGif) 
{
    smallTransparentGif = transparentGif;
    if (windowsInternetExplorer && (browserVersion < 7))
    {
        var img = document.getElementById(strImageID);
        if (img)
        {
            var src = img.src;
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
            img.src = transparentGif;
            img.attachEvent("onpropertychange", imgPropertyChanged);
        }
    }
}

var windowsInternetExplorer = false;
var browserVersion = 0;
function detectBrowser()
{
    windowsInternetExplorer = false;
    var appVersion = navigator.appVersion;
    if ((appVersion.indexOf("MSIE") != -1) &&
        (appVersion.indexOf("Macintosh") == -1))
    {
        var temp = appVersion.split("MSIE");
        browserVersion = parseFloat(temp[1]);
        windowsInternetExplorer = true;
    }
}

var inImgPropertyChanged = false;
function imgPropertyChanged()
{
    if ((window.event.propertyName == "src") && (! inImgPropertyChanged))
    {
        inImgPropertyChanged = true;
        var el = window.event.srcElement;
        if (el.src != smallTransparentGif)
        {
            el.filters.item(0).src = el.src;
            el.src = smallTransparentGif;
        }
        inImgPropertyChanged = false;
    }
}

function fixupIEPNGBG(oBlock) 
{
    if (oBlock)
    {
        var currentBGImage = oBlock.currentStyle.backgroundImage;
        var currentBGRepeat = oBlock.currentStyle.backgroundRepeat;
        var urlStart = currentBGImage.indexOf('url(');
        var urlEnd = currentBGImage.indexOf(')', urlStart);
        var imageURL = currentBGImage.substring(urlStart + 4, urlEnd);

        if (imageURL.charAt(0) == '"')
        {
            imageURL = imageURL.substring(1);
        }
        
        if (imageURL.charAt(imageURL.length - 1) == '"')
        {
            imageURL = imageURL.substring(0, imageURL.length - 1);
        }

        var overrideRepeat = false;

        var filterStyle =
            "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
            imageURL +
            "', sizingMethod='crop');";

        if (RegExp("/C[0-9A-F]{8}.png$").exec(imageURL) != null)
        {
            filterStyle =
                "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                imageURL +
                "', sizingMethod='scale');";

            overrideRepeat = true;
        }

        var backgroundImage = new Image();
        backgroundImage.src = imageURL;
        var tileWidth = backgroundImage.width;
        var tileHeight = backgroundImage.height; 
        
        var blockWidth = 0;
        var blockHeight = 0;
        if (oBlock.style.width)
        {
            blockWidth = parseInt(oBlock.style.width);
        }
        else
        {
            blockWidth = oBlock.offsetWidth;
        }
        if (oBlock.style.height)
        {
            blockHeight = parseInt(oBlock.style.height);
        }
        else
        {
            blockHeight = oBlock.offsetHeight;
        }

        if ((blockWidth == 0) || (blockHeight == 0))
        {
            return;
        }
        
        var wholeRows = 1;
        var wholeCols = 1;
        var extraHeight = 0;
        var extraWidth = 0;
        
        if ((currentBGRepeat.indexOf("no-repeat") != -1) ||
              ((tileWidth == 0) && (tileHeight == 0)) ||
              overrideRepeat)
        {
            tileWidth = blockWidth;
            tileHeight = blockHeight;

        }
        else if ((currentBGRepeat.indexOf("repeat-x") != -1) ||
              (tileHeight == 0))
        {
            wholeCols = Math.floor(blockWidth / tileWidth);
            extraWidth = blockWidth - (tileWidth * wholeCols);
            tileHeight = blockHeight;

        }
        else if (currentBGRepeat.indexOf("repeat-y") != -1)
        {
            wholeRows = Math.floor(blockHeight / tileHeight);
            extraHeight = blockHeight - (tileHeight * wholeRows);
            tileWidth = blockWidth;

        }
        else
        {
            wholeCols = Math.floor(blockWidth / tileWidth);
            wholeRows = Math.floor(blockHeight / tileHeight);
            extraWidth = blockWidth - (tileWidth * wholeCols);
            extraHeight = blockHeight - (tileHeight * wholeRows);
        }
        
        var wrappedContent = document.createElement("div");
        wrappedContent.style.position = "relative";
        wrappedContent.style.zIndex = "1";
        wrappedContent.style.left = "0px";
        wrappedContent.style.top = "0px";
        if (!isNaN(parseInt(oBlock.style.width)))
        {
            wrappedContent.style.width = "" + blockWidth + "px";
        }
        if (!isNaN(parseInt(oBlock.style.height)))
        {
            wrappedContent.style.height = "" + blockHeight + "px";
        }
        var pngBGFixIsWrappedContentEmpty = true;
        while (oBlock.hasChildNodes())
        {
            if (oBlock.firstChild.nodeType == 3)
            {
                if (RegExp("^ *$").exec(oBlock.firstChild.data) == null)
                {
                    pngBGFixIsWrappedContentEmpty = false;
                }
            }
            else
            {
                pngBGFixIsWrappedContentEmpty = false;
            }
            wrappedContent.appendChild(oBlock.firstChild);
        }
        if (pngBGFixIsWrappedContentEmpty)
        {
            wrappedContent.style.lineHeight = "0px";
        }
        
        var newMarkup = "";
        for (var currentRow = 0; 
             currentRow < wholeRows; 
             currentRow++)
        {
            for (currentCol = 0; 
                 currentCol < wholeCols; 
                 currentCol++)
            {
                newMarkup += "<div style=" +
                        "\"position: absolute; line-height: 0px; " +
                        "width: " + tileWidth + "px; " +
                        "height: " + tileHeight + "px; " +
                        "left:" + currentCol *  tileWidth + "px; " +
                        "top:" + currentRow *  tileHeight + "px; " +
                        "filter:" + filterStyle + 
                        "\" > </div>";
            }
            
            if (extraWidth != 0)
            {
                newMarkup += "<div style=" +
                        "\"position: absolute; line-height: 0px; " +
                        "width: " + extraWidth + "px; " +
                        "height: " + tileHeight + "px; " +
                        "left:" + currentCol *  tileWidth + "px; " +
                        "top:" + currentRow *  tileHeight + "px; " +
                        "filter:" + filterStyle + 
                        "\" > </div>";
            }
        }
        
        if (extraHeight != 0)
        {
            for (currentCol = 0; 
                 currentCol < wholeCols; 
                 currentCol++)
            {
                newMarkup += "<div style=" +
                        "\"position: absolute; line-height: 0px; " +
                        "width: " + tileWidth + "px; " +
                        "height: " + extraHeight + "px; " +
                        "left:" + currentCol *  tileWidth + "px; " +
                        "top:" + currentRow *  tileHeight + "px; " +
                        "filter:" + filterStyle + 
                        "\" > </div>";
            }
            
            if (extraWidth != 0)
            {
                newMarkup += "<div style=" +
                        "\"position: absolute; line-height: 0px; " +
                        "width: " + extraWidth + "px; " +
                        "height: " + extraHeight + "px; " +
                        "left:" + currentCol *  tileWidth + "px; " +
                        "top:" + currentRow *  tileHeight + "px; " +
                        "filter:" + filterStyle + 
                        "\" > </div>";
            }
        }
        oBlock.innerHTML = newMarkup;

        oBlock.appendChild(wrappedContent);
        oBlock.style.background= "";
    }
}

function fixupAllIEPNGBGs()
{
    if (windowsInternetExplorer && (browserVersion < 7))
    {
        try
        {
            var oDivNodes = document.getElementsByTagName('DIV');
            for (var iIndex=0; iIndex<oDivNodes.length; iIndex++)
            {
                var oNode = oDivNodes.item(iIndex);
                if (oNode.currentStyle &&
                    oNode.currentStyle.backgroundImage &&
                    (oNode.currentStyle.backgroundImage.indexOf('url(') != -1) &&
                    (oNode.currentStyle.backgroundImage.indexOf('.png")') != -1))
                {
                    fixupIEPNGBG(oNode);
                }
            }
        }
        catch (e)
        {
        }
    }
}

function onPageLoad()
{
    detectBrowser();
    fixupIEPNG("id1", "Photos_files/transparent.gif");
    fixupIEPNG("id2", "Photos_files/transparent.gif");
    fixupAllIEPNGBGs();
    fixupIEPNG("id3", "Photos_files/transparent.gif");
    fixupIEPNG("id4", "Photos_files/transparent.gif");
    fixupIEPNG("id5", "Photos_files/transparent.gif");
    fixupIEPNG("id6", "Photos_files/transparent.gif");
    fixupIEPNG("id7", "Photos_files/transparent.gif");
    fixupIEPNG("id8", "Photos_files/transparent.gif");
    fixupIEPNG("id9", "Photos_files/transparent.gif");
    fixupIEPNG("id10", "Photos_files/transparent.gif");
    fixupIEPNG("id11", "Photos_files/transparent.gif");
    fixupIEPNG("id12", "Photos_files/transparent.gif");
    fixupIEPNG("id13", "Photos_files/transparent.gif");
    fixupIEPNG("id14", "Photos_files/transparent.gif");
    fixupIEPNG("id15", "Photos_files/transparent.gif");
    fixupIEPNG("id16", "Photos_files/transparent.gif");
    fixupIEPNG("id17", "Photos_files/transparent.gif");
    fixupIEPNG("id18", "Photos_files/transparent.gif");
    fixupIEPNG("id19", "Photos_files/transparent.gif");
    fixupIEPNG("id20", "Photos_files/transparent.gif");
    fixupIEPNG("id21", "Photos_files/transparent.gif");
    fixupIEPNG("id22", "Photos_files/transparent.gif");
    fixupIEPNG("id23", "Photos_files/transparent.gif");
    fixupIEPNG("id24", "Photos_files/transparent.gif");
    fixupIEPNG("id25", "Photos_files/transparent.gif");
    fixupIEPNG("id26", "Photos_files/transparent.gif");
    fixupIEPNG("id27", "Photos_files/transparent.gif");
    fixupIEPNG("id28", "Photos_files/transparent.gif");
    return true;
}

