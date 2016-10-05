/*
 * intro.js
 *
 * Scene 1
 * 
 * Provides UI to teach users how to use the microscope, step by step.
 * Currently also includes functionality to change the ocular component via drag. (This will probably be modularized into another source file).
 * The intro.js source is a wrapper or layer above the state machine logic. The state machine should be able to operate seperately from any
 * layer that tries to utilize it. Decoupling layer from state machine allows for reusablity of the state machine.
 **/


var game;
var introLightSwitch;
var introEyepiece;
var introDiaphragm;
var introFine;
var introCoarse;
var introLenses;
var introCaliper;
var setupStart;
var setupLightSwitch;
var setupEyepiece;
var setupDiaphragmLight;
var setupDiaphragmHeight;
var setupFine;
var setupCoarse;
var setupLenses;
var setupCaliper;


// Used to skip steps when testing
var debug=false;
intro=true;
setup=false;
var introCount=0;
edgeArr = []


function hideAll(){
    for (var i = 0; i < components.length; i++) {
        $(components[i]).addClass("opacityLow");
        $(components[i]).removeClass("elementOn");
        $(components[i]).removeClass("elementOff");
    }

    console.log("intro count: " + introCount);
    //All steps complete.
    if (introCount == 7 && intro){
        showAllParts();
        loadIntroComplete(); 
        intro = false;
    }

}


// Hide-Show component functions
function secludePart(keepOn) {
    for (var i = 0; i < keepOn.length; i++) {
        $(keepOn[i]).removeClass("opacityLow");
        $(keepOn[i]).removeClass("elementOff");
        $(keepOn[i]).addClass("elementOn");
    }
    //  console.log($('body').html());

}

function detachBindings(){
}

function showAllParts() {
    for (var i = 0; i < components.length; i++) {
        $(components[i]).removeClass("opacityLow");
        $(components[i]).removeClass("elementOn");
        $(components[i]).removeClass("elementOff");
        $(components[i]).off("mouseleave");
        $(components[i]).off("mouseenter");
        console.log(components[i]);
    }

    for (var j=0; i< overlapnents.length;j++){ 
        $(overlapnents[j]).off("mouseleave");
        $(overlapnents[j]).off("mouseenter");
    }

    for (var i = 0; i < components.length; i++) {
        $(components[i]).addClass("elementOn");
    }

}
// End Hide Show component functions


// Misc. Functions
function popupOn(text, props) {
    $("#popup").css("display", "inline-block");
    $("#popup").addClass("elementOn");
    $("#popup").css(props);
    $("#popupText").text(text);
}

function popupOff() {
    $("#popup").css("display", "none");
}


// End  misc. functions



// ====== Start Trigger ======= //
function triggerLightSwitch() {
    var arr = ["#switch"];
    popupOn("Light Switch: Turns the light on and off.", {
            "left": "10%",
            "top": "73%",
            });
    secludePart(arr);
}


function triggerEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft", "#ocularLensBase"];
    popupOn("Eyepiece: View the sample through the ocular lenses. They magnify the image ten times.", {
            "left": "5%",
            "top": "25%",
            });
    secludePart(arr);
}

function triggerDiaphragm() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Diaphragm: Adjusts the amount of light on the slide", {
            "left": "15%",
            "top": "60%",
            });
    secludePart(arr);
}

function triggerFine() {
    arr = ["#knobsFine"];
    popupOn("Fine Knobs: Moves the stage slightly to sharpen the focus", {
            "left": "10%",
            "top": "64%",
            });
    secludePart(arr);
}

function triggerCoarse() {
    arr = ["#knobsCoarse"];
    popupOn("Coarse Knobs: Moves the stage up and down for focusing", {
            "left": "10%",
            "top": "64%",
            });
    secludePart(arr);
}

function triggerCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob"];
    popupOn("Caliper: Adjusts the vertical and horizontal positions of the slide.", {
            "left": "55%",
            "top": "55%",
            });
    secludePart(arr);
}

function triggerLenses() {
    arr = ["#lenses", "#lensesRed", "#lensesBlue", "#lensesYellow", "#lensesWhite"];
    edgeArr = arr;
    popupOn("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", {
            "left": "10%",
            "top": "36%",
            });
    secludePart(arr);
}

$(function () {


        // ====== End Trigger ======= //

        // Create dragability on horizontal component on a div. Precisely to be used for the ocular component. DRY principle applied so we don't reuse the same code for both ocular ends.
        $('#microscope').load('img/microscope.svg', function() {
            resizeWindow();
            loadStartMenu();
            loadSubMenu();

            $("#endOption1").click(function () {
                // Start Beginner Mode
                newGame(true, false);
                });


            if (debug){
            introLightSwitch.complete();
            introEyepiece.complete();
            introCoarse.complete();
            introFine.complete();
            introDiaphragm.complete();
            introCaliper.complete();
            introLenses.complete();
            $("#popup").removeClass("elementOn");
            $("#popup").addClass("elementOff");
            showAllParts();
            }

            //===============intro===============
            if (intro){
                console.log("debugger");
                hideAll();
                $("#switch")
                    .mouseenter(function () {
                            triggerLightSwitch();
                            })
                .mouseleave(function(){ 
                        if (introLightSwitch.isActive()) {
                        introLightSwitch.complete();
                        introCount++;
                        }
                        popupOff();hideAll();

                        });

                $("#ocularLensBase, #ocularRight, #ocularLeft")
                    .mouseenter(function(){
                            triggerEyepiece(); 
                            })
                .mouseleave(function () {
                        if (introEyepiece.isActive()) {
                        introCount++;
                        introEyepiece.complete();}
                        popupOff();hideAll();

                        });

                $("#knobsCoarse")
                    .mouseenter(function(){
                            triggerCoarse();
                            })
                .mouseleave(function () {
                        if (introCoarse.isActive()) {
                        introCount++;
                        introCoarse.complete();}
                        popupOff();hideAll();

                        });

                $("#knobsFine")
                    .mouseenter(function(){
                            triggerFine();
                            })
                .mouseleave(function () {
                        if (introFine.isActive()) {
                        introCount++;
                        introFine.complete();}
                        popupOff();hideAll();

                        });

                $("#diaphragm")
                    .mouseenter(function(){
                            triggerDiaphragm()
                            })
                .mouseleave(function () {
                        if (introDiaphragm.isActive()) {
                        introCount++;
                        introDiaphragm.complete();}
                        popupOff();hideAll();

                        });

                $("#caliperKnob, #caliper, #xcaliper, #ycaliper")
                    .mouseenter(function(){
                            triggerCaliper();
                            })
                .mouseleave(function () {
                        if (introCaliper.isActive()) {
                        introCount++;
                        introCaliper.complete();}
                        popupOff();hideAll();

                        });

                $("#lenses")
                    .mouseenter(function(){
                            triggerLenses();  
                            })
                .mouseleave(function () {
                        if (introLenses.isActive()) {
                        introCount++;
                        introLenses.complete();} 
                        popupOff();hideAll();
                        });
            }







            //==========light toggle==================
            //toggleLightSwitch();
            //==========ocular movement===============
            //enableEyepiece();                


            /*
               $("#endOption2").click(function () {
            // Start Intermediate Mode
            if (false)
            newGame(false, false);
            });

            $("#endOption3").click(function () {
            // Start Expert Mode
            if (false)
            newGame(false, true);
            });
            for (var i = 1; i <= 3; i++) {
            initEndOptionHover(i);
            }
             */



        })
});


