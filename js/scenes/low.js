/*
 * low.js
 *
 * Scene 3
 * Third scene that teaches student how to use the microscope.
 */

function lowAdjustEyepiece() {
    textSetup("Adjust the eyepiece to change the magnification.", "60%", "30%");
    var id="#ocularRight";
    if (lowEyepiece.isActive()) { 
        var clonedComp = highlightComponent(id);
        //var clonedComp2 = highlightComponent("#ocularLeft");
        bringToFront($("#ocularRight"));
        //bringToFront($("#ocularLeft"));
        var handler = function(){
            subHandler(ms.eyepiecePosition, 10, 25, lowEyepiece, document, handler, id, [clonedComp, clonedComp2]);
        }
        $(document).bind("mousemove", handler);
    }
}

// Trigger for coarse knob.
function lowAdjustCoarse() {
    textSetup("Move the stage up by moving the course knob.", "10%", "64%");
    var id="#knobsCoarse"
        if (lowCoarse.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.knobPosition, -20, -5, lowCoarse, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}


//  !!! (´・ω・`)
//  fine knob shouldn't move stage.

// Trigger for fine knob 
function lowAdjustFine() {
    textSetup("Move the stage up slightly by moving the fine knob.", "10%", "64%");
    var id="#knobsFine"
        if (lowFine.isActive()) {  
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.slideBlur, -1, 1, lowFine, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}


// Adjust diaphragm light
function lowDLight() {
    textSetup("Adjust the diaphragm to change the lighting on the slide.", "10%", "60%");
    var id="#diaphragm"
        if (lowDiaphragmLight.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            bringToFront($("#aperture"));
            bringToFront($("#apertureKnob"));

            var handler = function(){
                subHandler(ms.diaphragmLightPosition, 5, 30, lowDiaphragmLight, document, handler, id);
            }
            $(document).bind("mousemove", handler);
        }
}


function lowDHeight() {
    textSetup("Adjust the height of the diaphragm by rotating the diaphragm knob", "18%", "70%");
    var id="#draggableDiaphragm"
        if (lowDiaphragmHeight.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.diaphragmHeightPosition, 5, 15, lowDiaphragmHeight, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}

//  !!! (´・ω・`)
//  separated components. ycaliper shouldn't move with x-Knob
//  xcaliperKnob - "#slide", #xcaliper",  "#caliperMetal"
//  ycaliperKnob - "#slide", #xcaliper", "#ycaliper", "#caliperMetal"

function lowAdjustCaliper() {
    textSetup("Move the caliper to adjust the position of the slide.", "62%", "60%");
    var id="#caliperKnob"
        if (lowCaliper.isActive()) {
            var clonedComp2 = highlightComponent("#yCaliperKnob");
            var clonedComp2 = highlightComponent("#xCaliperKnob");

            //bringToFront($(id));
            bringToFront($("#xCaliperKnob"));
            bringToFront($("#yCaliperKnob"));

            var handler = function(){
                subHandler(ms.xcaliper, 5, 20, lowCaliper, document, handler, id);
                subHandler(ms.ycaliper, 5, 20, lowCaliper, document, handler, id);
            }
            $(document).bind("mousemove", handler);

        }

}

//  !!! (´・ω・`)
//  eyepiece position should displace cell view.
//  See: /__image-reference/gifs/ocular.gif
function lowAdjustLenses() {
    textSetup("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", "15%", "35%"); 
    var id="#lensesBasePath"
        if (lowLenses.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.diaphragmHeightPosition, 5, 15, lowLenses, document, handler, id, clonedComp);
            }
            $(document).bind("mousemove", handler);
        }
}
